<script setup lang="ts">
import {ref} from 'vue';
import {getUserInfo, login, UserLogin} from "../apis/user";
import {showFailToast} from "vant";
import {useRouter} from "vue-router";
import {useUserStore} from "../store/userStore";

const router = useRouter();
const username = ref('');
const userStore = useUserStore();
const password = ref('');
const onSubmit = async (values: UserLogin) => {
  let response = await login(values);
  if (response.code !== 0) {
    return showFailToast(response.message);
  }
  await userStore.getUserInfo()
  router.replace("/")
};
</script>

<template>
  <div id="login">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                   :rules="[{ required: true, message: '请填写用户名' }]"/>
        <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="scss"></style>
