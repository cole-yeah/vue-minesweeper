import { describe, expect, it, test } from "vitest";
import Player, { EGameState } from "../src/utils/Player";

const getRandomKey = (w: number, h: number) =>
  Math.floor(Math.random() * w * h);

describe("player", () => {
  const WIDTH = 10,
    HEIGHT = 10,
    MINE_COUNT = 10;
  const player = new Player({
    width: WIDTH,
    height: HEIGHT,
    mineCount: MINE_COUNT,
  });
  test("init player", () => {
    player.init();
    expect(player.width).equal(WIDTH);
    expect(player.height).equal(HEIGHT);
    expect(player.mineCount).equal(MINE_COUNT);
    let mineCount = 0;
    Array.from(player.mineBlockMap.values()).forEach((item) => {
      item.isMine && mineCount++;
    });
    expect(mineCount).eql(0);
  });

  test("after click", () => {
    const key = getRandomKey(WIDTH, HEIGHT);
    const block = player.mineBlockMap.get(key);
    player.handleClick(block);
    let mineCount = 0;
    Array.from(player.mineBlockMap.values()).forEach((item) => {
      item.isMine && mineCount++;
    });
    expect(mineCount).eql(MINE_COUNT);
  });
});
