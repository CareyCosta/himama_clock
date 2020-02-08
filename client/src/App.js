import React, { Fragment } from "react";
import Clock from "react-live-clock";
import Button from "@material-ui/core/Button";

const App = () => (
  <Fragment>
    <h1 className="App-header">Carey's App </h1>
    <Clock
      format={"HH:mm:ss"}
      ticking={true}
      timezone={"Eastern Standard Time"}
    />
    <Button>Hello World</Button>
  </Fragment>
);

export default App;
