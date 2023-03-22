<template>
  <div class="filter-item" :style="`background-image:url(${posts.imageurl})`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePostStore } from "../store/post";

export default defineComponent({
  setup() {
    const posts = usePostStore();
    return { posts };
  },
});
</script>

<style scoped></style>
