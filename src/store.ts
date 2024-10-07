import { configureStore } from "@reduxjs/toolkit";

type CounterState = {
  counter: number;
};

export type CounterId = string;

type State = { counters: Record<CounterId, CounterState | undefined> };

type ActionIncrement = {
  type: "increment";
  payload: CounterId;
};

type ActionDecrement = {
  type: "decrement";
  payload: CounterId;
};

type Action = ActionIncrement | ActionDecrement;

const initialCounterState: CounterState = {
  counter: 0,
};

const initialState: State = {
  counters: {},
};

const reducer = (state = initialState, action: Action) => {
  const counterId = action.payload;
  const currentCounter = state.counters[counterId] ?? initialCounterState;

  switch (action.type) {
    case "increment":
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: { counter: currentCounter.counter + 1 },
        },
      };
    case "decrement":
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: { counter: currentCounter.counter - 1 },
        },
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
