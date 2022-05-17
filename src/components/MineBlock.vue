<script setup lang="ts">
import { IMineBlock } from "@/utils/Player";
import { Icon } from "@iconify/vue";

defineProps<{ block: IMineBlock }>();
const emit = defineEmits(["leftClick", "rightClick"]);

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

const onContextMenu = (block: IMineBlock) => {
  console.log("xxxxxx", block.flag);
  emit("rightClick", block);
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
    @contextmenu.prevent="onContextMenu(block)"
  >
    <template v-if="block.flag">
      <Icon icon="mdi:flag" color="#b00000" />
    </template>
    <template v-else-if="block.unkown"></template>
    <template v-else-if="block.isMine">
      <Icon icon="mdi:mine" color="#fff" />
    </template>
    <template v-else>
      <div>{{ block.count }}</div>
    </template>
  </button>
</template>
