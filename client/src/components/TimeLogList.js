import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const TimeLogList = ({ logs }) => {
  console.log("logs", logs);
  return (
    <List component="ul">
      {logs.map(time => (
        <ListItem component="li">{time}</ListItem>
      ))}
    </List>
  );
};

export default TimeLogList;
