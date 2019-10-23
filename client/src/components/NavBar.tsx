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
      <button
        className="bg-white hover:bg-gray-300 text-indigo-900 mr-auto ml-4 rounded-full py-2 px-2 shadow-lg"
        onClick={() =>
          window.open("https://github.com/cfbender/price-tracker", "_blank")
        }
      >
        Source
        <svg
          className="h-5 fill-current inline ml-2"
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>GitHub</title>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </button>
      {(!isAuthenticated || loading) && (
        <button
          className="text-white text-xl"
          onClick={() => loginWithRedirect({})}
        >
          Log in
        </button>
      )}

      {isAuthenticated && (
        <div className="flex">
          <h2 className="text-l text-white mr-4 my-auto">
            Welcome, {user.given_name}!
          </h2>
          <img
            src={user.picture}
            alt="User"
            className="h-8 w-8 rounded-full mr-10"
          />
          <button className="text-white text-xl" onClick={() => logout()}>
            Log out
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
