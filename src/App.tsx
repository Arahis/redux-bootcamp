import "./App.css";
import { CounterId, RootState, store } from "./store";
import { useEffect, useReducer, useRef } from "react";

function App() {
  return (
    <>
      <Counter id={"1"} />
      <Counter id={"2"} />
      <Counter id={"3"} />
    </>
  );
}

const selector = (state: RootState, id: CounterId) => state.counters[id];

const Counter = ({ id }: { id: CounterId }) => {
  const [, updateState] = useReducer((x) => x + 1, 0);

  const prevStateRef = useRef<ReturnType<typeof selector>>();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentState = selector(store.getState(), id);
      const prevState = prevStateRef.current;
      if (currentState !== prevState) {
        updateState();
      }

      prevStateRef.current = currentState;
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="card">
      <p>count {selector(store.getState(), id)?.counter}</p>
      <button
        onClick={() => store.dispatch({ type: "increment", payload: id })}
      >
        Increment
      </button>
      <button
        onClick={() => store.dispatch({ type: "decrement", payload: id })}
      >
        Decrement
      </button>
    </div>
  );
};

export default App;
