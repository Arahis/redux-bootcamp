import {
  combineReducers,
  configureStore,
  createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

export type CounterId = string;

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

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

const initialCounterState: CounterState = {
  counter: 0,
};

const initialCountersState: CountersState = {};

// USER STATE

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

const initialUserState: UserState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

type Action =
  | ActionIncrement
  | ActionDecrement
  | UserSelectedaction
  | UserRemoveSelectedAction
  | UserStoredAction;

const usersReducer = (state = initialUserState, action: Action) => {
  switch (action.type) {
    case "userSelected": {
      return {
        ...state,
        selectedUserId: action.payload.userId,
      };
    }
    case "userRemoveSelected": {
      return {
        ...state,
        selectedUserId: undefined,
      };
    }
    case "userStored": {
      const { users } = action.payload;
      return {
        ...state,
        entities: users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as Record<UserID, User>),
        ids: users.map((user) => user.id),
      };
    }
    default:
      return state;
  }
};
const counterReducer = (
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

const reducer = combineReducers({
  users: usersReducer,
  counters: counterReducer,
});

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
