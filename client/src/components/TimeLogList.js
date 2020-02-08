import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const TimeLogList = ({ logs }) => {
  return (
    <List component="ul">
      {logs.map(time => (
        <ListItem component="li">
          Check In: {time.checkIn} Check Out: {time.checkOut}
        </ListItem>
      ))}
    </List>
  );
};

export default TimeLogList;
