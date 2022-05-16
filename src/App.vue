<script setup lang="ts">
import { ref } from "vue";
import MineBlock from "@/components/MineBlock.vue";

const block = ref({ x: 1 });
</script>

<template>
  <MineBlock :block="block" />
</template>
