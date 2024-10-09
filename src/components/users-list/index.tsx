import { useState } from "react";
import { useAppDispatch, useAppSelector, User } from "../../store";

const UserList = () => {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const ids = useAppSelector((state) => state.users.ids);
  const userEntities = useAppSelector((state) => state.users.entities);

  const selectedUser = useAppSelector((state) =>
    state.users.selectedUserId
      ? userEntities[state.users.selectedUserId]
      : undefined
  );

  const sortedUsers = ids
    .map((id) => userEntities[id])
    .sort((a, b) => {
      if (sortType === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div>
      {!selectedUser ? (
        <div>
          <button onClick={() => setSortType("asc")}>Asc</button>
          <button onClick={() => setSortType("desc")}>Desc</button>
          <ul>
            {sortedUsers.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </ul>
        </div>
      ) : (
        <SelectedUser user={selectedUser} />
      )}
    </div>
  );
};

const UserListItem = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();

  const handleUserClick = () => {
    dispatch({ type: "userSelected", payload: { userId: user.id } });
  };

  return (
    <li onClick={handleUserClick}>
      <span>{user.name}</span>
    </li>
  );
};

const SelectedUser = ({ user }: { user: User }) => {
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
