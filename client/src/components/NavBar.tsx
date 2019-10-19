import React from "react";
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  const auth = useAuth0();
  let loading, user, isAuthenticated;
  let loginWithRedirect: Function;
  let logout: Function;
  if (auth) {
    loading = auth.loading;
    user = auth.user;
    isAuthenticated = auth.isAuthenticated;
    loginWithRedirect = auth.loginWithRedirect;
    logout = auth.logout;
  }
  return (
    <header className="flex items-center justify-between flex-wrap bg-indigo-900 shadow-md p-6">
      <h1 className=" text-3xl text-white">Price Tracker</h1>
      {!isAuthenticated && (
        <button
          className="text-white text-xl"
          onClick={() => loginWithRedirect({})}
        >
          Log in
        </button>
      )}

      {isAuthenticated && (
        <button className="text-white text-xl" onClick={() => logout()}>
          Log out
        </button>
      )}
    </header>
  );
};

export default NavBar;
