<template>
  <div>
    <div class="post">
      <HeaderComponent :i="i" />
      <div
        class="post-body"
        :style="{ backgroundImage: `url(${post[i].postImage})` }"
        :class="`${post[i].filter}`"
      ></div>
      <LikeComponent :i="num" />
      <p>
        <strong>{{ post[i].name }}</strong> {{ post[i].content }}
      </p>
      <p class="date">{{ post[i].date }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { usePostStore } from "@/store/post";
import { defineComponent, onMounted } from "vue";
import LikeComponent from "./LikeComponent.vue";
import HeaderComponent from "./HeaderComponent.vue";

export default defineComponent({
  components: {
    LikeComponent,
    HeaderComponent,
  },
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

    const loadmodal = (data: number) => {
      posts.modalcontroll();
      posts.postnum = data;
    };

    const loadfullpage = (data: number) => {
      posts.openfullpage();
      posts.postnum = data;
    };

    onMounted(() => {
      posts.postnum = num;
    });

    return { posts, post, likechange, loadmodal, loadfullpage, num };
  },
});
</script>

<style></style>
