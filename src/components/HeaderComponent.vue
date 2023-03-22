<template>
  <div>
    <div class="post-header underbar" :class="{ margin_header: posts.full }">
      <div
        class="profile no-color"
        :style="{ backgroundImage: `url(${post[i].userImage})` }"
      ></div>
      <div class="profile-name font_size">
        <strong>{{ post[i].name }}</strong>
      </div>
      <div class="iconbox" @click="loadmodal(i)">
        <font-awesome-icon
          class="more color"
          :icon="['fas', 'ellipsis-vertical']"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { usePostStore } from "@/store/post";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    i: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const posts = usePostStore();
    const post = posts.post;

    const loadmodal = (data: number) => {
      posts.modalcontroll();
      posts.postnum = data;
    };
    return { posts, post, loadmodal };
  },
});
</script>

<style scoped></style>
