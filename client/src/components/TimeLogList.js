import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const TimeLogList = ({ logs }) => {
  console.log("logs list", logs);
  return (
    <List component="ul">
      {logs.map(time => (
        <ListItem component="li" key={time.id}>
          Check In: {time.check_in} Check Out: {time.check_in}
        </ListItem>
      ))}
    </List>
  );
};

export default TimeLogList;
