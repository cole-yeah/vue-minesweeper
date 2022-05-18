<script setup lang="ts">
import MineBlock from "@/components/MineBlock.vue";
import Header from "@/components/Header.vue";
import Confetti from "@/components/Confetti.vue";
import Player, { IPlayer, EGameState } from "@/utils/Player";

const WIDTH = 9;
const HEIGHT = 9;
const MINE_COUNT = 9;

const player = new Player({
  width: WIDTH,
  height: HEIGHT,
  mineCount: MINE_COUNT,
});
player.init();
const getBlock = (row: number, col: number) => {
  return player.getBlock(row, col)!;
};
const onClick = (type: number) => {
  if (type === 0) {
    player.reset(WIDTH, HEIGHT, MINE_COUNT);
  } else if (type === 1) {
    player.reset(12, 12, 20);
  } else if (type === 2) {
    player.reset(16, 16, 50);
  }
};
</script>

<template>
  <div class="wrapper">
    <Header />
    <div class="btnBox">
      难度：
      <button border class="text-green-500" @click="onClick(0)">简单</button>
      <button border class="text-blue-500" @click="onClick(1)">中等</button>
      <button border class="text-yellow-500" @click="onClick(2)">困难</button>
    </div>
    <!-- <div class="editBox">
      <div>
        <div>计时</div>
        <div>{{}}</div>
      </div>
      <button>重置</button>
    </div> -->
    <div class="row" v-for="(row, i) in player.height" :key="i">
      <MineBlock
        v-for="(col, j) in player.width"
        :key="j"
        :block="getBlock(row - 1, col - 1)"
        @leftClick="player.handleClick"
        @rightClick="player.handleRightClick"
      />
    </div>
  </div>
  <Confetti :passed="player.gameState.value === EGameState.success" />
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
.btnBox {
  display: flex;
  align-items: center;
  color: #ddd;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  button {
    padding: 0px 8px;
    margin-right: 6px;
    border-radius: 2px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    border-color: #ddd;
  }
  button:hover {
    border-color: #fff;
  }
}
.editBox {
  display: flex;
  color: #eee;
  font-size: 16px;
}
</style>
