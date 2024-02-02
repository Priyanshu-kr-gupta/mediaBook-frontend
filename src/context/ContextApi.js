import { createContext } from "react";

  //  const backendApi="https://media-book-backend.vercel.app";
  const backendApi="http://localhost:5000";
const Context = createContext();

const AppContextProvider = (props) => {
  return (
    <Context.Provider value={backendApi}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, AppContextProvider };