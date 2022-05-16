<script setup lang="ts">
import { reactive, ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
const arr = ref([1, 2, 3]);
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>
    <button
      v-for="num in arr"
      :key="num"
      min-w-8
      min-h-8
      m="1px"
      cursor-pointer
    >
      {{ num }}
    </button>
  </div>
  <button type="button" @click="count++">count is: {{ count }}</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
