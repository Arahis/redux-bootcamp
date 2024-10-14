import { useAppDispatch, useAppSelector } from "../../store.utils";
import { CounterID, selectCounter } from "./counters.slice";

const Counter = ({ id }: { id: CounterID }) => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => selectCounter(state, id));

  return (
    <div className="card">
      <p>count {counter?.counter}</p>
      <button onClick={() => dispatch({ type: "increment", payload: id })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: id })}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;
