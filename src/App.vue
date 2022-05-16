<script setup lang="ts">
import { ref } from "vue";
import MineBlock from "@/components/MineBlock.vue";
import Header from "@/components/Header.vue";
import Player, { IPlayer } from "@/utils/Player";

const WIDTH = 9;
const HEIGHT = 9;
const MINE_COUNT = 9;

const mineOpt = ref<IPlayer>({
  width: WIDTH,
  height: HEIGHT,
  mineCount: MINE_COUNT,
});

const player = new Player({ width: WIDTH, height: HEIGHT, mineCount: 9 });
const minesMap = player.init();

const getKey = (row: number, col: number) => row * mineOpt.value.width + col;

const getBlock = (row: number, col: number) => {
  const key = getKey(row, col);
  console.log("cccccccccccc", key);
  return minesMap.get(key)!;
};
</script>

<template>
  <div class="wrapper">
    <Header />
    <button>重置</button>
    <div class="row" v-for="(row, i) in mineOpt.height" :key="i">
      <MineBlock
        v-for="(col, j) in mineOpt.width"
        :key="j"
        :block="getBlock(row - 1, col - 1)"
      />
    </div>
  </div>
</template>
<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  width: 100vw;
  height: 100vh;
}
.row {
  display: flex;
}
</style>
