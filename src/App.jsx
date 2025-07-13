import Layout from "./Layout"
import UserCard from "./pages/Admin/UsersCards/index.jsx";
import Events from "./pages/Admin/Events/index.jsx";
import React from "react";
function App() {

  return (
    <div>
      <Layout />
      <UserCard />
      <Events />
    </div>
  )
}

export default App
