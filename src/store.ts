import { configureStore } from "@reduxjs/toolkit";

type State = {
  counter: number;
};

type ActionIncrement = {
  type: "increment";
};

type ActionDecrement = {
  type: "decrement";
};

type Action = ActionIncrement | ActionDecrement;

const initialState: State = {
  counter: 0,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "decrement":
      return {
        ...state,
        counter: state.counter - 1,
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
