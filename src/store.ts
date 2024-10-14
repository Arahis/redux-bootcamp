import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { users, usersReducer } from "./modules/users/users.slice";
import { counterReducer } from "./modules/counters/counters.slice";

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
// export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// export const useAppSelector = useSelector.withTypes<AppState>();
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppStore = useStore.withTypes<typeof store>();
// export const createAppSelector = createSelector.withTypes<AppState>();
