import React from "react";
import NavBar from "./components/NavBar";
import Greeting from "./components/Greeting";
import { useAuth0 } from "./react-auth0-spa";
import PricesTable from "./components/PricesTable";
import "./styles/App.css";
function App() {
  const { loading, user, isAuthenticated } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <NavBar />
      {!isAuthenticated && <Greeting />}
      {!isAuthenticated && <PricesTable />}
    </div>
  );
}

export default App;
