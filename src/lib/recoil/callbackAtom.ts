/* eslint-disable react-hooks/rules-of-hooks */
import {
  CallbackInterface,
  RecoilValueReadOnly,
  selector,
  UnwrapRecoilValue,
  useRecoilValue
} from "recoil";
import { nanoid } from ".././nanoid";

type Callback = (...args: ReadonlyArray<any>) => void;

export type CallbackAtomInput<Func = Callback> = Record<
  string,
  (cb: CallbackInterface) => Func
>;

type ResultSelector<Obj extends CallbackAtomInput> = RecoilValueReadOnly<
  {
    [P in keyof Obj]: ReturnType<Obj[P]>;
  }
>;

export type CallbackAtomReturn<Obj extends CallbackAtomInput> = [
  ResultSelector<Obj>,
  () => UnwrapRecoilValue<ResultSelector<Obj>>
];

export const callbackAtom = <Obj extends CallbackAtomInput>(
  input: Obj
): CallbackAtomReturn<Obj> => {
  const keys = Object.keys(input);

  const result = selector({
    key: nanoid(),
    get({ getCallback }) {
      const callbacks: any = {};

      keys.forEach((key) => {
        const callback = getCallback((cb) => (...args: ReadonlyArray<any>) => {
          const updaterFunc = input[key];

          if (updaterFunc === undefined) {
            throw new Error(`callbackAtom: ${key} is not defined`);
          }

          // call updater
          updaterFunc?.(cb)(args);
        });

        callbacks[key] = callback;
      });

      return callbacks;
    }
  });

  const hooks = () => useRecoilValue(result);

  return [result, hooks];
};
