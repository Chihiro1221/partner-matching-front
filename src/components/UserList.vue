<template>
  <van-skeleton class="skeleton-container" v-for="i of 10" :key="i" avatar :row="3" avatar-shape="square" avatar-size="80px" :loading="loading">
    <div id="user-list-component">
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
    </div>
  </van-skeleton>
</template>

<script lang="ts" setup>
import { UserType } from '../types/models';

interface Props {
  userList?: UserType[];
  loading?: boolean;
}
defineProps<Props>();
</script>

<style lang="scss" scoped>
#user-list-component {
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
}
.skeleton-container {
  margin-top: 10px;
}
</style>
