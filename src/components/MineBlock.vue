<script setup lang="ts">
import { reactive, ref, inject, defineEmits } from "vue";
import { IMineBlock } from "@/utils/Player";

defineProps<{ block: IMineBlock }>();
const emit = defineEmits(["leftClick"]);

const numberColors = [
  "text-transparent",
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-orange-500",
  "text-red-500",
  "text-purple-500",
  "text-pink-500",
  "text-teal-500",
];

const getBlockClass = (block: IMineBlock) => {
  if (block.flag) return "bg-gray-500/10";
  if (block.unkown) return "bg-gray-500/10 hover:bg-gray-500/20";

  return block.isMine ? "bg-red-500/50" : numberColors[block.count];
};

const onClick = (block: IMineBlock) => {
  emit("leftClick", block);
};
</script>

<template>
  <button
    flex="~"
    items-center
    justify-center
    min-w-8
    min-h-8
    m="1px"
    border="0.5 gray-400/10"
    :class="getBlockClass(block)"
    @click="onClick(block)"
  >
    <template v-if="block.flag">
      <div>F</div>
    </template>
    <template v-else-if="block.unkown">
      <!-- <div>{{ block.count }}</div> -->
    </template>
    <template v-else-if="block.isMine">
      <div>M</div>
    </template>
    <template v-else>
      <div>{{ block.count }}</div>
    </template>
  </button>
</template>
