<template>
  <div>
    <div class="comment">
      <div
        class="profile no-color"
        :style="{ backgroundImage: `url(${comment[i].userImage})` }"
      ></div>
      <div class="font_size">
        <strong>{{ comment[i].name }}</strong>
      </div>
      <div class="font_size">{{ comment[i].comment }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { usePostStore } from "@/store/post";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  props: {
    i: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const posts = usePostStore();
    const comment = posts.comments;

    onMounted(() => {
      posts.arraynum = props.i;
    });

    return { posts, comment };
  },
});
</script>

<style scoped></style>
