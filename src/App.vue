<script setup lang="ts">
import { ref, provide } from "vue";
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

const player = new Player({
  width: WIDTH,
  height: HEIGHT,
  mineCount: MINE_COUNT,
});
player.init();
</script>

<template>
  <div class="wrapper">
    <Header />
    <button>{{ player.gameState }}</button>
    <div class="row" v-for="(row, i) in mineOpt.height" :key="i">
      <MineBlock
        v-for="(col, j) in mineOpt.width"
        :key="j"
        :block="player.getBlock(row - 1, col - 1)"
        @leftClick="player.handleClick"
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
