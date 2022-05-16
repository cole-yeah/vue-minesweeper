export interface IPlayer {
  width: number;
  height: number;
  mineCount: number;
}

export interface IMineBlock {
  unkown: boolean; // 未知的
  flag: boolean; // 标志
  isMine: boolean; //地雷
  count: number;
}

const MINE_BLOCK_TEMP = {
  unkown: true,
  flag: false,
  isMine: false,
  count: 0,
};

class Player {
  width: number;
  height: number;
  mineCount: number;
  mineBlockMap: Map<number, IMineBlock>;
  constructor({ width, height, mineCount }: IPlayer) {
    this.width = width;
    this.height = height;
    this.mineCount = mineCount;
    this.mineBlockMap = new Map();
  }

  private generateMine(count: number) {
    const mineSet: Set<number> = new Set();
    const all = Array.from({ length: this.height * this.height }, (_, i) => {
      this.mineBlockMap.set(i, { ...MINE_BLOCK_TEMP });
      return i;
    });
    while (count) {
      const length = all.length;
      const index = Math.floor(Math.random() * length);
      const val = all.splice(index, 1);
      mineSet.add(val[0]);
      count--;
    }
    return mineSet;
  }

  // private checkBoundary(index: number) {
  //   return index >= 0 && index < this.width * this.height;
  // }

  // 地雷周边加一操作
  private countUp(index: number) {
    let roundIndexArray = [
      index - this.width - 1,
      index - this.width,
      index - this.width + 1,
      index - 1,
      index + 1,
      index + this.width - 1,
      index + this.width,
      index + this.width + 1,
    ];
    roundIndexArray.forEach((index) => {
      const block = this.mineBlockMap.get(index);
      block && !block.isMine && block.count++;
    });
  }

  public init() {
    const mineSet = this.generateMine(this.mineCount);
    for (let key of mineSet) {
      const mine = this.mineBlockMap.get(key)!;
      mine.isMine = true;
      this.countUp(key);
    }
    return this.mineBlockMap;
  }

  public reset(width: number, height: number) {}
}

export default Player;
