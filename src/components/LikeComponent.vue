<template>
  <div class="post-content">
    <font-awesome-icon
      v-if="!post[i].liked"
      class="iconsize color"
      :icon="['far', 'heart']"
      @click="likechange"
    />
    <font-awesome-icon
      v-if="post[i].liked"
      class="iconsize full no-color"
      :icon="['fas', 'heart']"
      @click="likechange"
    />
    <font-awesome-icon
      class="iconsize color reverse"
      :icon="['far', 'comment']"
      @click="loadfullpage(i)"
    />
    <p>
      <strong>좋아요 {{ post[i].likes }}개</strong>
    </p>
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
  setup(props) {
    const posts = usePostStore();
    const post = posts.post;
    const num = props.i;

    const likechange = () => {
      posts.likeup(num);
    };

    const loadfullpage = (data: number) => {
      posts.openfullpage();
      posts.postnum = data;
    };
    return { posts, post, likechange, loadfullpage };
  },
});
</script>

<style></style>
