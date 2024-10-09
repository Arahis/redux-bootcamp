import "./App.css";
import Counter from "./components/counter";
import UserList from "./components/users-list";

function App() {
  return (
    <>
      <UserList />
      <hr />
      <Counter id={"1"} />
      <Counter id={"2"} />
      <Counter id={"3"} />
    </>
  );
}

export default App;
