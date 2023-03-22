<template>
  <div ref="scrollComponent">
    <div v-if="posts.modal">
      <ModalPage />
    </div>
    <div v-if="posts.full">
      <FullPage />
    </div>
    <div class="header">
      <ul class="header-button-left">
        <li v-if="posts.step >= 1" @click="posts.step--">Cancel</li>
      </ul>
      <ul class="header-button-right">
        <li v-if="posts.step == 1" @click="posts.step++">Next</li>
        <li v-if="posts.step == 2" @click="push">발행</li>
      </ul>
      <img src="./assets/logo.png" class="logo" />
    </div>
    <ContainerPage />
    <ObserverPage @triggerIntersected="morepost" />
    <div class="footer">
      <ul class="footer-button-plus">
        <input
          id="file"
          multiple
          type="file"
          class="inputfile"
          @change="upload"
        />
        <label for="file" class="input-plus">+</label>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { usePostStore } from "./store/post";
import ModalPage from "./components/ModalPage.vue";
import ContainerPage from "./components/ContainerPage.vue";

import axios from "axios";
import FullPage from "./components/FullPage.vue";
import ObserverPage from "./components/ObserverPage.vue";

export default defineComponent({
  name: "App",
  components: {
    ContainerPage,
    ModalPage,
    FullPage,
    ObserverPage,
  },
  setup() {
    const postnum = ref(0);
    const posts = usePostStore();
    const scrollComponent = ref();

    const morepost = async () => {
      if (postnum.value < 2) {
        const url = `https://codingapple1.github.io/vue/more${postnum.value}.json`;
        await axios.get(url).then((result) => {
          posts.load(result.data);
        });
        postnum.value++;
      } else {
        postnum.value--;
      }
    };

    const push = () => {
      var posting = {
        name: "ys",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: posts.imageurl,
        likes: 0,
        date: new Date().toDateString(),
        liked: false,
        content: posts.area,
        filter: posts.filtername,
      };
      posts.upload(posting);
      posts.step = 0;
      console.log(posting);
      posts.area = "write!";
    };

    const upload = (e: Event) => {
      const target = e.target as HTMLInputElement;
      let file = target.files;
      if (!file) return;
      let url = URL.createObjectURL(file[0]);
      posts.imageurl = url;
      posts.step++;
    };
    return { posts, push, upload, scrollComponent, morepost };
  },
  methods: {},
});
</script>

<style></style>
