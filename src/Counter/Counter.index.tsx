import { useEffect } from "react";
import { CounterPresenter } from "./Counter.presenter";
import { useCounter, useCounterAction } from "./Counter.state";

export const Counter: React.FC = () => {
  const { counter, multiplied } = useCounter();
  const { increment, incrementAsync, update } = useCounterAction();

  // update count on mount
  // useEffect(() => {
  //   update(5);
  // }, []);

  return (
    <CounterPresenter
      counter={counter}
      multiplied={multiplied}
      onClickPlus={increment}
      onClickPlusAsync={incrementAsync}
    />
  );
};
