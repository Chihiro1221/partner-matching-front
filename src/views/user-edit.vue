<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {computed, ref} from 'vue';
import {changeUserInfo} from '../apis/user';
import {showFailToast} from 'vant';
import {useUserStore} from '../store/userStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const {key, val, label}: { [key: string]: any } = route.query;
const inputText = ref(val);

/**
 * 性别选择
 */
const genderValue = ref(val);
const showPicker = ref(false);
const columns = [
  {text: '男', value: 0},
  {text: '女', value: 1},
];
const onClick = () => {
  if (key === 'gender') showPicker.value = true;
};
const genderText = computed(() => columns[genderValue.value]?.text);
const onConfirm = ({selectedOptions}: any) => {
  showPicker.value = false;
  genderValue.value = selectedOptions[0].value;
};

/**
 * 确认修改
 */
const confirmChange = async () => {
  const user = {
    [key as string]: key === 'gender' ? genderValue.value : inputText.value,
    id: userStore?.userInfo?.id,
  };
  const response = await changeUserInfo(user);
  if (response.code !== 0) {
    return showFailToast('修改信息失败，请稍后重试');
  }
  router.back();
};
</script>

<template>
  <div id="user-edit">
    <van-field v-if="key !== 'gender'" class="input" clearable :label="label" v-model="inputText"
               :placeholder="`请输入${label}`"/>
    <van-field v-else class="input" :label="label" v-model="genderText" placeholder="请选择性别" @click="onClick"
               readonly/>
    <van-button class="confirm-button" block type="primary" @click="confirmChange">确认修改</van-button>
    <!--  性别选择  -->
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm"/>
    </van-popup>
  </div>
</template>

<style scoped lang="scss">
#user-edit {
  background-color: #f7f8fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 10px;

  .input {
    border-radius: 8px;
  }

  .confirm-button {
    margin-top: 20px;
  }
}
</style>
