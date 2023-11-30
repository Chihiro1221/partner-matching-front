<script setup lang="ts">
import { onMounted } from 'vue';
import TeamList from '../components/TeamList.vue';
import { getJointedTeamList } from '../apis/team';
import { useUserStore } from '../store/userStore';
import { showFailToast } from 'vant';
import { ref } from 'vue';
import { TeamType } from '../types/models';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const teamList = ref<TeamType[]>([]);
/**
 * 获取自己创建的队伍
 */
const getTeams = async () => {
  if (!userStore.userInfo?.id) {
    showFailToast('请您登录');
    return router.push({ name: 'user-login' });
  }
  const res = await getJointedTeamList();
  if (res.code != 0 || !res.data) {
    return showFailToast(res.message);
  }

  teamList.value = res.data;
};

onMounted(async () => {
  await getTeams();
});
</script>

<template>
  <div class="team-created">
    <TeamList :team-list="teamList" jointed @quit-team="getTeams" />
  </div>
</template>

<style lang="scss" scoped></style>
