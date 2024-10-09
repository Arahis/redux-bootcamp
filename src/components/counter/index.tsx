import { CounterId, useAppDispatch, useAppSelector } from "../../store";

const Counter = ({ id }: { id: CounterId }) => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counters[id]);

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
