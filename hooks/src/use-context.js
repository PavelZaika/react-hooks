import React, { useContext } from "react";
import ReactDOM from "react-dom";

const MyContext = React.createContext();
const MyContextTwo = React.createContext();

const App = () => {
  return (
    <MyContextTwo.Provider value = 'Hi'>
    <MyContext.Provider value="Hello World 123">
      <Child />
    </MyContext.Provider>
    </MyContextTwo.Provider>
  );
};

const Child = () => {
  const value = useContext(MyContext);
  const val = useContext(MyContextTwo)
  
  return <p>{value} and {val}</p>;
};

ReactDOM.render(<App />, document.getElementById("root"));
