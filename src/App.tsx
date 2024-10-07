import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { store } from "./store";
import { useEffect, useReducer } from "react";

function App() {
  const [, updateState] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      updateState();
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>count {store.getState().counter}</p>
        <button onClick={() => store.dispatch({ type: "increment" })}>
          Increment
        </button>
        <button onClick={() => store.dispatch({ type: "decrement" })}>
          Decrement
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
