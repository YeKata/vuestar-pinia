<template>
  <div ref="trigger"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    const trigger = ref();
    const options = {
      root: null,
      threshold: 1,
    };
    let observer: IntersectionObserver;
    const handleIntersect = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) emit("triggerIntersected", trigger.value);
    };

    onMounted(() => {
      try {
        observer = new IntersectionObserver((entries) => {
          handleIntersect(entries[0]);
        }, options);
        observer.observe(trigger.value);
      } catch (err) {
        console.error(err);
      }
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    return {
      trigger,
    };
  },
});
</script>

<style scoped></style>
