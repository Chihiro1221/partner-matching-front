<script setup lang="ts">
import TeamList from '../components/TeamList.vue';
import {onMounted, ref} from 'vue';
import type {TeamType} from '../types/models';
import {getTeamList} from '../apis/team';
import {showFailToast} from 'vant';

const teamList = ref<TeamType[]>([]);
const searchText = ref('');

onMounted(async () => {
  await searchTeam();
});

const searchTeam = async () => {
  const params = {
    name: searchText.value,
  };
  const res = await getTeamList(params);
  if (res.code != 0 || !res.data) {
    return showFailToast(res.message);
  }
  teamList.value = res.data.records;
};

const onSearch = async () => {
  await searchTeam();
};
</script>

<template>
  <div id="team-list">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" @search="onSearch"/>
    <div class="create-team-button" @click="$router.push({ name: 'team-edit' })">
      <van-icon name="plus"/>
    </div>
    <TeamList :team-list="teamList"/>
  </div>
</template>

<style scoped lang="scss">
.create-team-button {
  position: fixed;
  right: 10px;
  bottom: 80px;
  background: skyblue;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 4px 4px 8px rgb(0, 0, 0, 0.2);
  font-size: 18px;
}
</style>
