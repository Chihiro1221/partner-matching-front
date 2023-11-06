<template>
  <div id="basic-layout">
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="$router.back()" @click-right="$router.push({name:'search'})">
      <template #right>
        <van-icon name="search" size="18"/>
      </template>
    </van-nav-bar>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace :to="{ name: 'home' }" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace :to="{ name: 'team' }" icon="search">组队</van-tabbar-item>
      <van-tabbar-item replace :to="{ name: 'user' }" icon="user-o">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
