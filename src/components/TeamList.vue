<template>
  <div id="team-list-component">
    <template v-if="teamList && teamList.length > 0">
      <van-row v-for="team of teamList" :key="team.id">
        <van-card class="van-card" :desc="team.description" :thumb="TeamAvatar">
          <template #title>
            <div class="card-title">
              <div class="nickname">{{ team.name }}</div>
            </div>
          </template>
          <template #tags>
            <van-tag class="van-tag" :key="team.id" plain type="primary">{{
                TeamStatusEnumText[team.status!]
              }}
            </van-tag>
          </template>
          <template #footer>
            <div class="footer-left">
              <div class="max_num">
                <span>队伍人数：{{ team.users?.length }} / {{ team.maxNum }}</span>
              </div>
              <div v-if="!isExpiredTeam(team)">截止日期：{{ dayjs(team.expireTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </div>
            <div class="operation-button">
              <van-button v-if="!created && !jointed && !hasJointed(team)" type="primary" size="mini"
                          @click="onJoinButtonClick(team)">
                加入队伍
              </van-button>
              <van-button v-if="created && !isExpiredTeam(team)" type="warning" size="mini"
                          @click="doDissolveTeam(team.id!)">解散队伍
              </van-button>
              <van-button
                  v-if="created && !isExpiredTeam(team)"
                  type="success"
                  size="mini"
                  @click="$router.push({ name: 'team-edit', params: { id: team.id } })"
              >修改队伍
              </van-button
              >
              <van-button v-if="isExpiredTeam(team)" type="danger" size="mini" readonly>队伍已过期</van-button>
              <van-button v-if="hasJointed(team)" type="warning" size="mini" @click="doQuitTeam(team.id!)">退出队伍
              </van-button>
            </div>
          </template>
        </van-card>
      </van-row>
    </template>
    <van-empty v-else description="暂无数据"></van-empty>
    <van-dialog v-model:show="passwordDialog" title="房间密码" @confirm="doJoinTeam" @close="password = ''"
                show-cancel-button>
      <van-field v-model="password" type="password" placeholder="请输入房间密码"/>
    </van-dialog>
  </div>
</template>

<script lang="ts" setup>
import {TeamType} from '../types/models';
import TeamAvatar from '../assets/images/team_avatar.png';
import {TeamStatusEnum, TeamStatusEnumText} from '../constant/TeamStatusEnumText';
import * as dayjs from 'dayjs';
import {dissolveTeam, joinTeam, quitTeam} from '../apis/team';
import {showFailToast, showSuccessToast} from 'vant';
import {useUserStore} from "../store/userStore";
import {ref} from "vue";

interface Props {
  teamList?: TeamType[];
  created?: boolean;
  jointed?: boolean;
}

defineProps<Props>();
const emit = defineEmits(['dissolveTeam', 'quitTeam']);
const userStore = useUserStore();
const passwordDialog = ref(false)
const password = ref('')
const currentTeam = ref();

/**
 * 是否是已过期的队伍
 */
const isExpiredTeam = (team: TeamType) => {
  const expireTime = dayjs(team.expireTime);
  const nowTime = dayjs();
  return expireTime.diff(nowTime) < 0;
};

/**
 * 是否已加入该队伍
 */
const hasJointed = (team: TeamType) => {
  if (!team.users || !userStore.userInfo?.id) return false;
  return team.users.includes(userStore.userInfo.id);
}

const onJoinButtonClick = (team: TeamType) => {
  if (team.status === TeamStatusEnum.SECRET) {
    passwordDialog.value = true;
    currentTeam.value = team;
    return;
  }
  doJoinTeam(team);
}

/**
 * 加入队伍
 * @param team
 */
const doJoinTeam = async (team: TeamType) => {
  if (!team) team = currentTeam.value;
  console.log(team, currentTeam.value)
  const res = await joinTeam({teamId: team.id!, password: password.value});
  if (res.code != 0) {
    return showFailToast(res.message);
  }
  showSuccessToast('加入队伍成功！');
};

/**
 * 解散队伍
 * @param teamId
 */
const doDissolveTeam = async (teamId: number) => {
  const res = await dissolveTeam(teamId);
  if (res.code != 0) {
    return showFailToast(res.message);
  }
  showSuccessToast('解散队伍成功！');
  // 通知外层组件刷新列表
  emit('dissolveTeam');
};

/**
 * 退出队伍
 * @param teamId
 */
const doQuitTeam = async (teamId: number) => {
  const res = await quitTeam(teamId);
  if (res.code != 0) {
    return showFailToast(res.message);
  }
  showSuccessToast('退出队伍成功！');
  // 通知外层组件刷新列表
  emit('quitTeam');
};
</script>

<style lang="scss" scoped>
#team-list-component {
  min-height: 100vh;
  background-color: #f7f8fa;

  .van-card {
    flex: 1;
    border-bottom: 1px solid #eee;
    background-color: #fff;

    .card-title {
      display: flex;
      justify-content: space-between;
    }

    .van-tag {
      margin: 8px 8px 0px 0;
    }
  }

  .bottom-button {
    width: 160px;
    height: 40px;
  }

  :deep(.van-card__footer) {
    display: flex;
    justify-content: space-between;
    align-items: end;

    .footer-left {
      text-align: left;
      margin-top: 10px;

      .max_num {
        display: flex;
        gap: 25px;
      }
    }
  }

  .expire-text {
    color: red;
  }
}
</style>
