<template>
  <div class="full-black">
    <div class="full-white">
      <div
        class="full-body"
        :style="{ backgroundImage: `url(${post[i].postImage})` }"
        :class="`${post[i].filter}`"
      ></div>
    </div>
    <div class="comment_box">
      <HeaderComponent :i="i" />
      <div class="comment_area">
        <div class="comment">
          <div
            class="profile no-color"
            :style="{ backgroundImage: `url(${post[i].userImage})` }"
          ></div>
          <div>
            <strong>{{ post[i].name }}</strong>
          </div>
          <div>{{ post[i].content }}</div>
        </div>
        <div>
          <CommentPage
            v-for="(comments, num) in posts.commentarray"
            :key="num"
            :i="num"
          />
        </div>
        <div :class="{ display: posts.arraynum < posts.b - 1 }" class="plus">
          <font-awesome-icon
            class="iconsize color"
            :icon="['fas', 'circle-plus']"
            @click="pluscomment"
          />
        </div>
      </div>
      <div class="like">
        <LikeComponent :i="i" class="underbar" />
      </div>
      <div class="comment commentform">
        <CommentForm />
      </div>
    </div>
    <div>
      <font-awesome-icon
        class="iconsize close"
        :icon="['fas', 'x']"
        @click="closefullpage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { usePostStore } from "@/store/post";
import { defineComponent, onUnmounted } from "vue";
import CommentPage from "./CommentPage.vue";
import LikeComponent from "./LikeComponent.vue";
import HeaderComponent from "./HeaderComponent.vue";
import CommentForm from "./CommentForm.vue";

export default defineComponent({
  components: { CommentPage, LikeComponent, HeaderComponent, CommentForm },
  setup() {
    const posts = usePostStore();
    const post = posts.post;
    let comment = posts.commentarray;
    const i = posts.postnum;

    const loadmodal = (data: number) => {
      posts.modalcontroll();
      posts.postnum = data;
    };

    const closefullpage = () => {
      posts.closefullpage();
    };

    const pluscomment = () => {
      posts.morecomment();
    };

    onUnmounted(() => {
      posts.commentarray = posts.resetcomment();
      posts.resetb();
    });

    return { posts, post, i, closefullpage, loadmodal, pluscomment, comment };
  },
});
</script>

<style scoped></style>
