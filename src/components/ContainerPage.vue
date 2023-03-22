<template>
  <div class="board">
    <div :class="{ display: posts.step != 0 }">
      <PostPage v-for="(item, i) in posts.post" :key="i" :i="i" />
    </div>
    <div :class="{ display: posts.step != 1 }">
      <div
        class="upload-image"
        :class="posts.filtername"
        :style="{ backgroundImage: `url(${posts.imageurl})` }"
      ></div>
      <div class="filters">
        <FilterBox
          v-for="(filter, i) in posts.filter"
          :key="filter"
          :class="filter"
          @click="pushfilter(filter)"
        >
          {{ posts.filter[i] }}
        </FilterBox>
      </div>
    </div>

    <div :class="{ display: posts.step != 2 }">
      <div
        :class="posts.filtername"
        class="upload-image"
        :style="{ backgroundImage: `url(${posts.imageurl})` }"
      ></div>
      <div class="write">
        <textarea v-model="area" class="write-box"></textarea>
      </div>
    </div>
    <div :class="{ display: posts.step != 3 }">
      <FollowerPage />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostPage from "./PostPage.vue";
import FilterBox from "@/components/FilterBox.vue";
import FollowerPage from "@/components/FollowerPage.vue";
import { usePostStore } from "../store/post";
import { storeToRefs } from "pinia";

export default defineComponent({
  components: {
    PostPage,
    FilterBox,
    FollowerPage,
  },
  setup() {
    const posts = usePostStore();
    const { area } = storeToRefs(posts);
    const pushfilter = (value: string) => {
      posts.filtername = value;
    };

    return { posts, area, pushfilter };
  },
});
</script>

<style scoped></style>
