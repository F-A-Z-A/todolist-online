export type ActionTestType<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">;
