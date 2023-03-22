import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import posts from "../assets/posts";
import filters from "../assets/filters";
import comment from "@/assets/comment";

export interface post {
  name: string;
  userImage: string;
  postImage: string;
  likes: number;
  date: string;
  liked: boolean;
  content: string;
  filter: string;
}

export interface comment {
  name: string;
  userImage: string;
  comment: string;
}

export const usePostStore = defineStore("post", () => {
  const modal = ref(false);
  const full = ref(false);
  let b = 10;
  const post = reactive(posts);
  const filter = reactive(filters);
  const comments = reactive(comment);
  const commentarray = reactive(comments.slice(0, 10));
  const step = ref(0);
  const imageurl = ref("");
  const filtername = ref("");
  const area = ref("write");
  const commentarea = ref("");
  const arraynum = ref(0);
  const postnum = ref(0);

  function load(data: post) {
    post.push(data);
  }

  function upload(data: post) {
    post.unshift(data);
  }

  function uploadcomment(data: comment) {
    comments.push(data);
    if (commentarray.length < 10) {
      commentarray.push(data);
    }
  }

  function morecomment() {
    let i = b;
    b += 10;
    for (i; i < b; i++) {
      if (comments.length > i) {
        commentarray.push(comments[i]);
      } else {
        b = i;
        return;
      }
    }
  }

  function resetcomment() {
    commentarray.splice(10, b);
    return commentarray;
  }
  function resetb() {
    b = 10;
  }

  function likeup(i: number) {
    if (!post[i].liked) {
      post[i].likes++;
      post[i].liked = true;
    } else {
      post[i].likes--;
      post[i].liked = false;
    }
  }

  function modalcontroll() {
    if (modal.value) {
      modal.value = false;
      document.body.style.overflow = "visible";
    } else {
      modal.value = true;
      document.body.style.overflow = "hidden";
    }
  }
  function openfullpage() {
    if (!full.value) {
      full.value = true;
      document.body.style.overflow = "hidden";
    }
  }
  function closefullpage() {
    if (full.value) {
      full.value = false;
      document.body.style.overflow = "visible";
    }
  }

  function deletepost(i: number) {
    post.splice(i, 1);
  }

  return {
    modal,
    full,
    step,
    imageurl,
    area,
    filter,
    post,
    load,
    upload,
    filtername,
    arraynum,
    likeup,
    postnum,
    deletepost,
    modalcontroll,
    openfullpage,
    closefullpage,
    comments,
    commentarea,
    uploadcomment,
    commentarray,
    b,
    morecomment,
    resetcomment,
    resetb,
  };
});
