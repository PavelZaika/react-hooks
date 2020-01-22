import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>
        <button onClick={() => setValue(v => v + 1)}>+</button>
        <button onClick={() => setVisible(false)}>Hide</button>
        <Notification />
        <HookCounter value={value} />
      </div>
    );
  } else {
    return <button onClick={() => setVisible(true)}>Show</button>;
  }
};

const HookCounter = ({ value }) => {
  useEffect(() => console.log("Mount"), []);
  useEffect(() => console.log("Update"));
  useEffect(() => () => console.log("Unmount"), []);
  return <p>{value}</p>;
};

const Notification = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timeout); /* очистка таймаута если элемент отмонтирован */
  }, []);
  return <div>{visible && <p>Hello</p>}</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
