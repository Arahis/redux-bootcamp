import { AppState, createAppSelector } from "../../store.utils";

export type UserID = string;

export type User = {
  id: UserID;
  name: string;
  description: string;
};

export const users: User[] = [...Array(3000)].map((_, i) => ({
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

type Action = UserSelectedaction | UserRemoveSelectedAction | UserStoredAction;

export const usersReducer = (state = initialUserState, action: Action) => {
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

export const selectSortedUsers = createAppSelector(
  (state: AppState) => state.users.ids,
  (state: AppState) => state.users.entities,
  (_: AppState, sortType: "asc" | "desc") => sortType,
  (ids, userEntities, sortType) =>
    ids
      .map((id) => userEntities[id])
      .sort((a, b) => {
        if (sortType === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      })
);

export const selectSelectedUser = (state: AppState) =>
  state.users.selectedUserId ? state.users.selectedUserId : undefined;
