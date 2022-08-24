import { atom, selector } from "recoil";
import { callbackAtom } from "../lib/recoil/callbackAtom";
import { atomReader } from "../lib/recoil/atomReader";

const counter = atom({
  key: "counterState",
  default: 0
});

const multiplied = selector({
  key: "multipliedCounterState",
  get({ get }) {
    return get(counter) * 2;
  }
});

export const [counterState, useCounter] = atomReader({
  counter,
  multiplied
});

export const [counterAction, useCounterAction] = callbackAtom({
  increment: ({ set }) => () => {
    set(counter, (prev) => prev + 1);
  },

  incrementAsync: ({ set }) => () => {
    setTimeout(() => {
      set(counter, (prev) => prev + 1);
    }, 1000);
  },

  update: ({ set }) => (newValue: number) => {
    set(counter, newValue);
  }
});
