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

type Join<
  T extends unknown[],
  S extends string | number,
  R extends string = ""
> = T extends [infer F, ...infer P]
  ? F extends string
    ? R extends ""
      ? Join<P, S, F>
      : Join<P, S, `${R}${S}${F}`>
    : Join<P, S, R>
  : R;

type Res = Join<["a", "b", "c"], 4>;

type TupleToUnion<T> = T extends [infer F, ...infer R]
  ? F | TupleToUnion<R>
  : T;

type Without<T, U> = T extends [infer F, ...infer R]
  ? F extends TupleToUnion<U>
    ? Without<R, U>
    : [F, ...Without<R, U>]
  : T;

type res = Without<[1, 2, 3], 2>;
type res1 = Without<[2, 3, 3, 3, 2, 4], [2, 3]>;

type Trunc<T extends number> = `${T}` extends `${infer F}.${infer P}`
  ? F
  : `${T}`;

type e = Trunc<12>;

type Reverse<T> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : T;

type f = Reverse<["a", "b", "c"]>;

type PartialByKeys<T, K extends keyof T> = {
  [Key in K]?: T[Key];
} & Omit<T, K>;

interface IF {
  name: string;
  age: number;
  address: string;
}
type g = PartialByKeys<IF, "name" | "age">;

var obj: g = {
  name: "222",
  // age: 10,
  address: "123",
  // a: 'ddd'
};

type Test = {
  id: 1;
};

type AppendToObject<T, K extends string, V> = {
  [Key in keyof T | K]: Key extends keyof T ? T[Key] : V;
};

type h = AppendToObject<Test, "value", 4>;

interface IProps {
  readonly name: string;
  readonly age: number;
  readonly id: number;
}
type Mutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};

type i = Mutable<IProps>;

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

var tree: TreeNode = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const;

type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [...InorderTraversal<T["left"]>, T["val"], ...InorderTraversal<T["right"]>]
  : [];

// @ts-ignore
type j = InorderTraversal<tree>;

type EndsWith<T, U extends string> = T extends `${infer F}${U}` ? true : false;

type k = EndsWith<"abc", "c">;

type Permutation<T, U = T> = [T] extends [never]
  ? []
  : T extends U
  ? [T, ...Permutation<Exclude<U, T>>]
  : [];

type l = Permutation<"A" | "B" | "C">;

type AppendArgument<Fn, U> = Fn extends (...args: infer P) => infer Q
  ? (...args: [...P, U]) => Q
  : never;

type m = AppendArgument<(a: string, b: number) => number, boolean>;

type Capitalizer<T extends string> = T extends `${infer F}${infer P}`
  ? `${Uppercase<F>}${P}`
  : T;

type n = Capitalizer<"hello world">;

type Chunk<T, N, R extends any[] = []> = T extends [infer F, ...infer Rest]
  ? R["length"] extends N
    ? [R, ...Chunk<Rest, N, [F]>]
    : Chunk<Rest, N, [...R, F]>
  : R extends []
  ? []
  : [R];

type o = Chunk<[1, 2, 3], 4>;

interface IUser {
  name: string;
  id: number;
}
interface IMember {
  level: number;
}

type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof F
    ? F[K]
    : K extends keyof S
    ? S[K]
    : never;
};

type q = Merge<IUser, IMember>;

interface Cat {
  type: "cat";
  voice: "miao";
}
interface Dog {
  type: "dog";
  voice: "wang";
}
type Lookup<T, K> = T extends { type: K } ? T : never;

type s = Lookup<Cat | Dog, "cat">;


interface IName {
  name: string;
  id: number;
}

type aaa<T extends keyof any, P> = {
  [K in T]: P;
}