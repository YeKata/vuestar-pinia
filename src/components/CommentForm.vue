<template>
  <div class="text_container">
    <div class="flex_left">
      <font-awesome-icon class="imoticon_box" :icon="['far', 'smile']" />
    </div>
    <div class="flex_text">
      <input
        spellcheck="false"
        placeholder="댓글 달기..."
        class="text_box font_size"
        type="text"
        :value="commentarea"
        @keypress.enter="push"
        @input="inputcomment"
      />
    </div>
    <div class="flex_right">
      <span v-if="commentarea == ''"
        ><strong class="font_size not_send">게시</strong>
      </span>
      <span v-else @click="push"
        ><strong class="font_size send">게시</strong></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { usePostStore } from "@/store/post";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const posts = usePostStore();
    const { commentarea } = storeToRefs(posts);
    const comment = posts.comments;

    const push = () => {
      var commenting = {
        name: "YS",
        userImage: "https://placeimg.com/100/100/arch",
        comment: posts.commentarea,
      };
      posts.uploadcomment(commenting);
      posts.commentarea = "";
    };

    const inputcomment = (e: Event) => {
      commentarea.value = (e.target as HTMLInputElement).value;
    };
    return { posts, commentarea, comment, push, inputcomment };
  },
});
</script>

<style>
@import "../assets/style.css";
</style>
