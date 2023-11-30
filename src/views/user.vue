<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStore = useUserStore();
const { userInfo: user } = storeToRefs(userStore);
/**
 * 跳转编辑页
 * @param query
 */
const gotoUserEdit = (query: any) => {
  router.push({
    path: '/user/edit',
    query,
  });
};
</script>

<template>
  <div id="user">
    <van-uploader class="avatar">
      <van-image round fit="cover" width="6rem" height="6rem" :src="user?.avatarUrl" />
    </van-uploader>
    <div class="nickname">浩楠</div>
    <van-cell-group inset>
      <van-cell title="用户名" :value="user?.username" is-link @click="gotoUserEdit({ key: 'username', val: user?.username, label: '用户名' })" />
      <van-cell title="昵称" :value="user?.nickname" is-link @click="gotoUserEdit({ key: 'nickname', val: user?.nickname, label: '昵称' })" />
      <van-cell title="邮箱" :value="user?.email" is-link @click="gotoUserEdit({ key: 'email', val: user?.email, label: '邮箱' })" />
      <van-cell title="手机号" :value="user?.phone" is-link @click="gotoUserEdit({ key: 'phone', val: user?.phone, label: '手机号' })" />
      <van-cell
        title="性别"
        :value="user?.gender === 0 ? '男' : '女'"
        is-link
        @click="gotoUserEdit({ key: 'gender', val: user?.gender, label: '性别' })"
      />
      <van-cell
        title="星球编号"
        :value="user?.planetCode"
        is-link
        @click="gotoUserEdit({ key: 'planetCode', val: user?.planetCode, label: '星球编号' })"
      />
    </van-cell-group>

    <van-cell-group class="cell-group-2" inset>
      <van-cell title="创建的队伍" is-link @click="$router.push({ name: 'team-created' })" />
      <van-cell title="加入的队伍" is-link @click="$router.push({ name: 'team-joined' })" />
    </van-cell-group>
  </div>
</template>

<style scoped lang="scss">
#user {
  background-color: #f7f8fa;
  :deep(.avatar) {
    display: flex;
    justify-content: center;
  }
  .nickname {
    text-align: center;
  }
  min-height: 100vh;

  .avatar {
    padding: 6px 0;
  }

  .nickname {
    padding-bottom: 10px;
  }
  .cell-group-2 {
    margin-top: 20px;
  }
}
</style>
