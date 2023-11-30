<script setup lang="ts">
import { ref } from 'vue';
import { createTeam, getTeamById, updateTeam } from '../apis/team';
import { showFailToast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import * as dayjs from 'dayjs';
import { computed } from '@vue/reactivity';
import { TeamType } from '../types/models';

const showPicker = ref(false);
const router = useRouter();
const route = useRoute();
const addTeamValue = ref<TeamType>({
  name: '',
  description: '',
  maxNum: 2,
  status: 0,
  password: '',
});

const isUpdate = computed(() => {
  return Boolean(route.params?.id);
});

if (isUpdate.value) {
  const res = await getTeamById(Number(route.params.id));
  if (res.code != 0 || !res.data) showFailToast(res.message);
  else addTeamValue.value = res.data;
  addTeamValue.value.expireTime = dayjs(addTeamValue.value.expireTime).format('YYYY-MM-DD HH:mm:ss');
}

const onDatePickerConfirm = ({ selectedValues }: any) => {
  addTeamValue.value.expireTime = dayjs(selectedValues).format('YYYY-MM-DD HH:mm:ss');
  showPicker.value = false;
};

const onSubmit = async () => {
  addTeamValue.value.expireTime = dayjs(addTeamValue.value.expireTime).format();
  const res = isUpdate.value ? await updateTeam(addTeamValue.value) : await createTeam(addTeamValue.value);
  if (res.code != 0) {
    return showFailToast(res.message);
  }
  router.push({
    name: isUpdate.value ? 'team-created' : 'team-list',
    replace: true,
  });
};
</script>

<template>
  <div id="team-edit">
    <van-form @submit="onSubmit">
      <van-field
        v-model="addTeamValue.name"
        name="name"
        label="队伍名"
        placeholder="请输入队伍名"
        :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <van-field v-model="addTeamValue.description" name="description" label="队伍描述" placeholder="请输入队伍描述" />
      <van-field name="maxNum" label="最大人数">
        <template #input>
          <van-stepper v-model="addTeamValue.maxNum" :min="addTeamValue.users?.length" max="10" />
        </template>
      </van-field>
      <van-field name="status" label="房间状态">
        <template #input>
          <van-radio-group v-model="addTeamValue.status" direction="horizontal">
            <van-radio :name="0">公开</van-radio>
            <van-radio :name="1">私密</van-radio>
            <van-radio :name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-show="addTeamValue.status === 2" v-model="addTeamValue.password" type="password" name="password" label="密码" placeholder="密码" />
      <van-field
        v-model="addTeamValue.expireTime"
        is-link
        readonly
        name="expireTime"
        label="过期时间"
        placeholder="点击选择时间"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker @confirm="onDatePickerConfirm" :min-date="new Date()" @cancel="showPicker = false" />
      </van-popup>

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped></style>
