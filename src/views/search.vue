<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

type TagType = {
  id: number;
  name: string
}
const router = useRouter();
const searchValue = ref('');
// 所有已选标签
const selectedTag = ref<TagType[]>([]);
const originTags = ref([
  {id: 1, name: '大一'},
  {id: 2, name: '大二'},
  {id: 3, name: '大三'},
  {id: 4, name: '大四'},
  {id: 5, name: 'JAVA'},
  {id: 6, name: 'C++'},
])
const tags = ref(originTags.value);
/**
 * 激活tag样式
 */
const tagActiveColor = {
  color: "#f5f6f8",
  textColor: "#111"
}
const onSearch = (val: string) => {
  if (val === '') return tags.value = originTags.value
  tags.value = originTags.value.filter(t => t.name.includes(val));
}
const onClear = () => {
  console.log(123)
  tags.value = originTags.value
};

/**
 * 标签是否被选中
 * @param tag
 */
const isExist = (tag: any) => {
  return selectedTag.value.find(t => t.id === tag.id);
}

/**
 * 选择标签
 * @param tag
 */
const selectTag = (tag: TagType) => {
  if (isExist(tag)) {
    return selectedTag.value = selectedTag.value.filter(t => t.id !== tag.id);
  }
  selectedTag.value.push(tag);
}

/**
 * 搜索用户
 */
const onSearchButtonClick = () => {
  router.push({
    name: "user-list",
    query: {
      tagNameList: selectedTag.value.map(tag => tag.name).join(',')
    }
  })
}

</script>

<template>
  <div id="search">
    <van-search
        v-model="searchValue"
        placeholder="请输入搜索标签"
        @search="onSearch"
        @clear="onClear"
        show-action
    >
      <template #action>
        <div @click="onSearchButtonClick">搜索</div>
      </template>
    </van-search>
    <div class="tags">
      <van-row gutter="10">
        <van-col v-for="tag in tags" :key="tag.id">
          <van-tag type="primary" size="large" v-bind="isExist(tag) ? null : tagActiveColor" @click="selectTag(tag)">
            {{ tag.name }}
          </van-tag>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<style scoped>
.tags {
  padding: 4px 12px;
}
</style>
