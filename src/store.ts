import { configureStore, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

export type UserID = string;

export type User = {
  id: UserID;
  name: string;
  description: string;
};

const users: User[] = [...Array(3000)].map((_, i) => ({
  id: `user${i + 11}`,
  name: `User ${i + 11}`,
  description: `Description of user ${i + 11}`,
}));

type UserState = {
  entities: Record<UserID, User>;
  ids: UserID[];
  selectedUserId: UserID | undefined;
};

export type CounterId = string;

type CounterState = {
  counter: number;
};

type State = {
  counters: Record<CounterId, CounterState | undefined>;
  users: UserState;
};

type UserSelectedaction = {
  type: "userSelected";
  payload: {
    userId: UserID;
  };
};

type UserRemoveSelectedAction = {
  type: "userRemoveSelected";
};

type UserStoredAction = {
  type: "userStored";
  payload: {
    users: User[];
  };
};

type ActionIncrement = {
  type: "increment";
  payload: {
    counterId: CounterId;
  };
};

type ActionDecrement = {
  type: "decrement";
  payload: { counterId: CounterId };
};

type Action =
  | ActionIncrement
  | ActionDecrement
  | UserSelectedaction
  | UserRemoveSelectedAction
  | UserStoredAction;

const initialUserState: UserState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

const initialCounterState: CounterState = {
  counter: 0,
};

const initialState: State = {
  counters: {},
  users: initialUserState,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: { counter: currentCounter.counter + 1 },
        },
      };
    }
    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: { counter: currentCounter.counter - 1 },
        },
      };
    }
    case "userSelected": {
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: action.payload.userId,
        },
      };
    }
    case "userRemoveSelected": {
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: undefined,
        },
      };
    }
    case "userStored": {
      const { users } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          entities: users.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {} as Record<UserID, User>),
          ids: users.map((user) => user.id),
        },
      };
    }
    default:
      return state;
  }
};

export const store = configureStore({
  reducer,
});

store.dispatch({
  type: "userStored",
  payload: {
    users,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
