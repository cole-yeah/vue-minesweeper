type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

type a = OmitByType<
  {
    id: number;
    name: string;
    isLogin: boolean;
  },
  boolean
>;

type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type b = PickByType<
  {
    id: number;
    name: string;
    isLogin: boolean;
  },
  boolean
>;

const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type MyReturnType<T> = T extends (...args: any[]) => infer P ? P : never;
type p = typeof fn;
type c = MyReturnType<typeof fn>; // should be "1 | 2"

type Mixin<T, P> = {
  [K in keyof (T & P)]: (T & P)[K];
};
type Diff<O, O1> = Omit<Mixin<O, O1>, keyof (O | O1)>;
type d = Diff<0, 0o1>;
