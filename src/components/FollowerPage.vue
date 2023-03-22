<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="?" @input="filterling($event)" />
    <div v-for="followers in follower" :key="followers.id" class="post-header">
      <div
        :style="{ backgroundImage: `url(${followers.image})` }"
        class="profile"
      ></div>
      <span class="profile-name">{{ followers.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { ref } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    interface following {
      id: number;
      name: string;
      image: string;
    }
    let follower = ref<Array<following>>([]);
    let followerOriginal = ref<Array<following>>([]);

    onMounted(() => {
      axios.get("follower.json").then((a) => {
        follower.value = a.data;
        followerOriginal.value = [...a.data];
      });
    });

    function filterling(search: Event) {
      const target = search.target as HTMLInputElement;
      if (!target) return;
      let newfollower = followerOriginal.value.filter((a) => {
        return a.name.indexOf(target.value) != -1;
      });
      follower.value = [...newfollower];
    }

    return { follower, filterling };
  },
});
</script>

<style scoped></style>
