<script setup lang="ts">
import { showToast } from 'vant';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getUserByTags } from '../apis/user';
import { User } from '../types/models';

const route = useRoute();
const userList = ref<User[]>([]);
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
    <van-row v-for="user of userList" :key="user.id">
      <van-card class="van-card" :desc="user.introduction" :thumb="user.avatarUrl">
        <template #title>
          <div class="card-title">
            <div class="nickname">{{ user.nickname }}</div>
            <div v-if="user.planetCode" class="plant-code">星球编号：{{ user.planetCode }}</div>
          </div>
        </template>
        <template #tags>
          <van-tag class="van-tag" v-for="tag of user.tags" :key="user.id" plain type="primary">{{ tag }}</van-tag>
        </template>
        <template #footer>
          <van-button type="primary" size="mini">联系</van-button>
        </template>
      </van-card>
    </van-row>
    <van-empty v-if="isEmpty" description="暂时匹配用户">
      <van-button round type="primary" class="bottom-button" @click="$router.back()">返回搜索</van-button>
    </van-empty>
  </div>
</template>

<style scoped lang="scss">
#user-list {
  height: 100vh;
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
}
</style>
