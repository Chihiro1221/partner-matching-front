<script setup lang="ts">
import {onMounted} from 'vue';
import UserList from '../components/UserList.vue';
import {getRecommends, getMatchUsers} from '../apis/user';
import {showFailToast, showToast} from 'vant';
import {ref} from 'vue';
import {UserType} from '../types/models';
import {reactive} from 'vue';
import {useRouter} from "vue-router";

const userList = reactive<UserType[]>([]);
const router = useRouter()
const matchUserList = reactive<UserType[]>([]);
const pageParams = reactive({
  pageNum: 1,
  pageSize: 10,
});
const loading = ref(false);
const matchLoading = ref(false);
const finished = ref(false);
const active = ref(0);

const onLoad = async () => {
  pageParams.pageNum++;
  await fetchRecommends();
};
/**
 * 获取推荐用户
 */
const fetchRecommends = async () => {
  const response = await getRecommends(pageParams);
  if (response.code !== 0) {
    return showToast(response.message);
  }
  if (!response.data?.records || response.data.records.length === 0) finished.value = true;
  const result = response.data?.records.map(user => {
    user.tags = JSON.parse(user.tags as string);
    return user;
  });
  userList.push(...result!);
  loading.value = false;
};

const onClickTab = async () => {
  matchLoading.value = true;
  if (active.value === 1) {
    let res;
    try {
      res = await getMatchUsers(10);
    } catch (e) {
      return router.push({name: 'user-login'})
    }
    if (res.code != 0 || !res.data) return showFailToast(res.message);
    const data = res.data.map(user => {
      user.tags = JSON.parse(user.tags as string);
      return user;
    });
    matchLoading.value = false;
    matchUserList.push(...data);
  }
};

onMounted(async () => {
  await fetchRecommends();
});
</script>

<template>
  <div id="home">
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="默认模式">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <UserList :user-list="userList"/>
        </van-list>
      </van-tab>
      <van-tab title="心动模式">
        <UserList :user-list="matchUserList" :loading="matchLoading"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped></style>
