<template>
  <div class="modal-black">
    <div class="modal-white">
      <div class="underbar_color">팔로우 하기</div>
      <div class="underbar_color" @click="deletecall">게시글 삭제</div>
      <div class="underbar_color">링크 복사</div>
      <div class="underbar_color" @click="modalclose">취소</div>
    </div>
  </div>
</template>

<script lang="ts">
import { usePostStore } from "@/store/post";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const posts = usePostStore();
    const modalclose = () => {
      posts.modalcontroll();
    };
    const deletecall = () => {
      const delconfirm = confirm("정말 삭제하시겠습니까?");
      if (delconfirm) {
        posts.deletepost(posts.postnum);
        alert("삭제되었습니다.");
        posts.modalcontroll();
      } else {
        alert("삭제가 취소되었습니다");
        posts.modalcontroll();
      }
    };
    return {
      modalclose,
      deletecall,
    };
  },
});
</script>

<style scoped></style>
