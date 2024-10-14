import "./App.css";
import Counter from "./modules/counters";
import UserList from "./modules/users";

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
