<template>
  <div id="basic-layout">
    <van-nav-bar :title="title" left-arrow @click-left="$router.back()"
                 @click-right="$router.push({ name: 'search' })">
      <template #right>
        <van-icon name="search" size="18"/>
      </template>
    </van-nav-bar>
    <suspense>
      <template #fallback>loading...</template>
      <template #default>
        <router-view></router-view>
      </template>
    </suspense>
    <van-tabbar route>
      <van-tabbar-item replace :to="{ name: 'home' }" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace :to="{ name: 'team-list' }" icon="search">组队</van-tabbar-item>
      <van-tabbar-item replace :to="{ name: 'user' }" icon="user-o">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
const title = computed<string>(() => {
  return (route.meta.title as string) ?? '伙伴匹配'
})
</script>

<style scoped></style>
