import React from "react";
import NavBar from "./components/NavBar";
import Greeting from "./components/Greeting";
import { useAuth0 } from "./react-auth0-spa";
import PricesTable from "./components/PricesTable";
import "./styles/App.css";
function App() {
  const auth = useAuth0();
  let loading, user, isAuthenticated;
  if (auth) {
    loading = auth.loading;
    user = auth.user;
    isAuthenticated = auth.isAuthenticated;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <NavBar />
      {!isAuthenticated && <Greeting />}
      {isAuthenticated && <PricesTable user={user} />}
    </div>
  );
}

export default App;
