import { reactive, readonly, watch, ref, Ref } from "vue";
export interface IPlayer {
  width: number;
  height: number;
  mineCount: number;
}

enum EGameState {
  playing = 0,
  success,
  failure,
}

export interface IMineBlock {
  key: number;
  unkown: boolean; // 未知的
  flag: boolean; // 标志
  isMine: boolean; //地雷
  count: number;
}

type TCoordinate = [x: number, y: number];

const MINE_BLOCK_TEMP = {
  key: 0,
  unkown: true,
  flag: false,
  isMine: false,
  count: 0,
};

const AROUND_COORDINATE: TCoordinate[] = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
const NEAR_COORDINATE: TCoordinate[] = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

class Player {
  width: number;
  height: number;
  mineCount: number;
  mineBlockMap: Map<number, IMineBlock>;
  isInit: boolean;
  gameState: Ref<EGameState>;
  constructor({ width, height, mineCount }: IPlayer) {
    this.isInit = true;
    this.width = width;
    this.height = height;
    this.mineCount = mineCount;
    this.mineBlockMap = reactive(new Map());
    this.gameState = ref(EGameState.playing);
    watch(this.mineBlockMap, (blockMap) => {
      let count = 0;
      for (const block of blockMap.values()) {
        block.unkown && count++;
      }
      if (this.status !== EGameState.failure) {
        const isWin = count === this.mineCount;
        this.gameState.value = isWin ? EGameState.success : EGameState.playing;
        if (isWin) {
          alert("你赢了！！");
        }
      }
    });
  }

  private get status() {
    return this.gameState.value;
  }

  private generateMine(count: number, index: number) {
    const mineSet: Set<number> = new Set();
    const allBlocks = Array.from(
      { length: this.mineBlockMap.size },
      (_, i) => i
    );
    // 第一次点击
    const aroundIndex = this.getAroundIndex(index, AROUND_COORDINATE);
    aroundIndex.push(index);
    aroundIndex.forEach((value) => {
      const index = allBlocks.findIndex((val) => val === value);
      allBlocks.splice(index, 1);
    });
    while (count) {
      const index = Math.floor(Math.random() * allBlocks.length);
      const val = allBlocks.splice(index, 1);
      mineSet.add(val[0]);
      count--;
    }
    for (const key of mineSet) {
      const mine = this.mineBlockMap.get(key)!;
      mine.isMine = true;
      this.countUp(key);
    }
  }

  private generateBlock() {
    this.isInit = true;
    console.log("xxxxxxxxx", this.height);
    Array.from({ length: this.height * this.height }, (_, i) => {
      this.mineBlockMap.set(i, { ...MINE_BLOCK_TEMP, key: i });
      return i;
    });
  }

  private getAroundIndex(index: number, aroundCoordinate: TCoordinate[]) {
    const coordinate = this.transformCoordinate(index);
    const curAround = aroundCoordinate
      .map(([x, y]) => {
        return [x + coordinate[0], y + coordinate[1]];
      })
      .filter(
        ([x, y]) => x >= 0 && x < this.width && y >= 0 && y < this.height
      );
    return curAround.map(([x, y]) => this.transformIndex(x, y));
  }

  // 下标转换为坐标
  private transformCoordinate(index: number) {
    const x = index % this.width;
    let y = 0;
    index += 1;
    while (index > this.width) {
      index -= this.width;
      y++;
    }
    return [x, y];
  }
  // 坐标转换为下标
  private transformIndex(x: number, y: number) {
    return y * this.width + x;
  }

  // 地雷周边加一操作
  private countUp(index: number) {
    const aroundIndex = this.getAroundIndex(index, AROUND_COORDINATE);
    aroundIndex.forEach((index) => {
      const block = this.mineBlockMap.get(index);
      block && !block.isMine && block.count++;
    });
  }

  public init() {
    this.generateBlock();
    this.gameState.value = EGameState.playing;
  }

  private getKey(row: number, col: number) {
    return row * this.width + col;
  }

  public getBlock(row: number, col: number) {
    const key = this.getKey(row, col);
    const block = this.mineBlockMap.get(key);
    return block ? readonly(block) : null;
  }

  private expandNearBlock = (block: IMineBlock) => {
    const { key } = block;
    const nearIndex = this.getAroundIndex(key, NEAR_COORDINATE);
    nearIndex.forEach((index) => {
      const curBlock = this.mineBlockMap.get(index);
      curBlock &&
        curBlock.unkown &&
        !curBlock.isMine &&
        this.handleClick(curBlock);
    });
  };

  private expandAllMine() {
    for (const item of this.mineBlockMap.values()) {
      item.isMine && (item.unkown = false);
    }
  }

  handleFirstClick(block: IMineBlock) {
    this.isInit = false;
    this.generateMine(this.mineCount, block.key);
  }

  public handleClick = (block: IMineBlock) => {
    this.isInit && this.handleFirstClick(block);
    if (!block.unkown) return;
    if (block.isMine) {
      this.gameState.value = EGameState.failure;
      this.expandAllMine();
      alert("失败了~");
      return;
    }
    const item = this.mineBlockMap.get(block.key)!;
    item.unkown = false;
    item.flag && (item.flag = false);
    // 附近没有地雷
    !block.count && this.expandNearBlock(block);
  };

  public handleRightClick = (block: IMineBlock) => {
    if (!block.unkown) return;
    const item = this.mineBlockMap.get(block.key)!;
    item.flag = !item.flag;
  };

  public reset(width: number, height: number, mineCount: number) {
    this.width = width;
    this.height = height;
    this.mineCount = mineCount;
    this.mineBlockMap.clear;
    this.init();
  }
}

export default Player;
