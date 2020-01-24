import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>
        <button onClick={() => setValue(v => v + 1)}>+</button>
        <button onClick={() => setVisible(false)}>Hide</button>
        <PlanetInfo id={value} />
      </div>
    );
  } else {
    return <button onClick={() => setVisible(true)}>Show</button>;
  }
};

const getPlanet = id => {
  return fetch(`https://swapi.co/api/planets/${id}/`)
    .then(res => res.json())
    .then(data => data);
};

const useRequest = request => {
  const [dataState, setDataState] = useState(null);

  useEffect(() => {
    let canceled = false;
    request().then(data => !canceled && setDataState(data));
    return () => (canceled = true);
  }, [request]);

  return dataState;
};

const usePlanetInfo = id => {
  const request = useCallback(() => getPlanet(id), [ id ])
    return useRequest(request);
};

const PlanetInfo = ({ id }) => {
  const data = usePlanetInfo(id);
  return (
    <div>
      {id} - {data && data.name}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
