import { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store.utils";
import { selectSelectedUser, selectSortedUsers, UserID } from "./users.slice";

const UserList = () => {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const selectedUserID = useAppSelector(selectSelectedUser);

  const sortedUsers = useAppSelector((state) =>
    selectSortedUsers(state, sortType)
  );

  return (
    <div>
      {!selectedUserID ? (
        <div>
          <button onClick={() => setSortType("asc")}>Asc</button>
          <button onClick={() => setSortType("desc")}>Desc</button>
          <ul>
            {sortedUsers.map((user) => (
              <UserListItem key={user.id} userId={user.id} />
            ))}
          </ul>
        </div>
      ) : (
        <SelectedUser userId={selectedUserID} />
      )}
    </div>
  );
};

const UserListItem = memo(({ userId }: { userId: UserID }) => {
  const user = useAppSelector((state) => state.users.entities[userId]);
  const dispatch = useAppDispatch();

  const handleUserClick = () => {
    dispatch({ type: "userSelected", payload: { userId: user.id } });
  };

  return (
    <li onClick={handleUserClick}>
      <span>{user.name}</span>
    </li>
  );
});

const SelectedUser = ({ userId }: { userId: UserID }) => {
  const user = useAppSelector((state) => state.users.entities[userId]);
  const dispatch = useAppDispatch();

  const handleBackButtonClick = () => {
    dispatch({ type: "userRemoveSelected" });
  };
  return (
    <div>
      <h5>{user.name}</h5>
      <p>{user.description}</p>
      <button onClick={handleBackButtonClick}>Back</button>
    </div>
  );
};

export default UserList;
