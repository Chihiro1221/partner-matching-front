<script setup lang="ts">
import { showToast } from 'vant';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getUserByTags } from '../apis/user';
import { UserType } from '../types/models';
import UserList from '../components/UserList.vue';

const route = useRoute();
const userList = ref<UserType[]>([]);
const isEmpty = ref(false);
const { tagNameList } = route.query;

onMounted(async () => {
  const response = await getUserByTags(tagNameList as string);
  if (response.code !== 0) {
    return showToast(response.message);
  }
  if (!response.data || response.data.length === 0) return (isEmpty.value = true);

  userList.value = response.data.map(user => {
    user.tags = JSON.parse(user.tags as string);
    return user;
  });
});
</script>

<template>
  <div id="user-list">
    <UserList :user-list="userList" />
    <van-empty v-if="isEmpty" description="暂时匹配用户">
      <van-button round type="primary" class="bottom-button" @click="$router.back()">返回搜索</van-button>
    </van-empty>
  </div>
</template>

<style scoped lang="scss">
#user-list {
  height: 100vh;
  background-color: #f7f8fa;
  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>
