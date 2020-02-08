import React, { Fragment } from "react";
import Clock from "react-live-clock";

const App = () => (
  <Fragment>
    <h1 className="App-header">Carey's App </h1>
    <Clock
      format={"HH:mm:ss"}
      ticking={true}
      timezone={"Eastern Standard Time"}
    />
  </Fragment>
);

export default App;
