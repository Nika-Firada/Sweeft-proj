import UserDetails from "./components/UserDetails";
import UserList from "./components/UserList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="p-1">
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
