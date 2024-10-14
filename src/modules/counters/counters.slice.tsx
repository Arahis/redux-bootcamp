import { AppState } from "../../store.utils";

export type CounterID = string;

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterID, CounterState | undefined>;

type ActionIncrement = {
  type: "increment";
  payload: {
    counterId: CounterID;
  };
};

type ActionDecrement = {
  type: "decrement";
  payload: { counterId: CounterID };
};

const initialCounterState: CounterState = {
  counter: 0,
};

const initialCountersState: CountersState = {};

type Action = ActionIncrement | ActionDecrement;

export const counterReducer = (
  state = initialCountersState,
  action: Action
): CountersState => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: { counter: currentCounter.counter + 1 },
      };
    }
    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: { counter: currentCounter.counter - 1 },
      };
    }
    default:
      return state;
  }
};

export const selectCounter = (state: AppState, counterId: CounterID) =>
  state.counters[counterId];
