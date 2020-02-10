import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { isEqual } from "lodash";

const CellStyles = {
  borderBottom: "none"
};

const LogRow = ({ log, onUpdateLog, onDeleteLog }) => {
  const [updatedValues, setUpdatedValues] = useState(log);

  useEffect(() => {
    setUpdatedValues(log);
  }, [log]);

  const handleClickSave = () => {
    onUpdateLog(updatedValues);
  };

  const handleChange = e => {
    setUpdatedValues({
      ...updatedValues,
      [e.target.name]: e.target.value,
      id: log.id
    });
  };

  return (
    <TableRow hover>
      <TableCell style={CellStyles}>
        <TextField
          name="date"
          value={updatedValues.date}
          type="date"
          onChange={e => {
            handleChange(e);
          }}
        />
      </TableCell>
      <TableCell style={CellStyles}>
        <TextField
          name="check_in"
          value={updatedValues.check_in}
          type={"time"}
          onChange={e => {
            handleChange(e);
          }}
        />
      </TableCell>
      <TableCell style={CellStyles}>
        <TextField
          name="check_out"
          value={updatedValues.check_out || ''}
          type="time"
          onChange={e => {
            handleChange(e);
          }}
        />
      </TableCell>
      <TableCell
        style={{
          display: "flex",
          justifyContent: "flex-end",
          borderBottom: "none"
        }}
      >
        <Button
          variant="text"
          onClick={() => onDeleteLog(log.id)}
          style={{ flexGrow: "1", marginRight: "10px" }}
        >
          Delete
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="outlined"
          disabled={isEqual(updatedValues, log)}
          color="secondary"
          onClick={handleClickSave}
          style={{ flexGrow: "1" }}
        >
          Update
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default LogRow;
