import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { isEmpty } from "lodash";

const CellStyles = {
  borderBottom: "none",
};

const LogRow = ({ log, onUpdateLog, onDeleteLog }) => {
  const [updatedValues, setUpdatedValues] = useState({});

  const handleClickSave = () => {
    onUpdateLog(updatedValues);
    setUpdatedValues({});
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
          defaultValue={log.date}
          type="date"
          onChange={e => {
            handleChange(e);
          }}
        />
      </TableCell>
      <TableCell style={CellStyles}>
        <TextField
          name="check_in"
          defaultValue={log.check_in}
          type={"time"}
          onChange={e => {
            handleChange(e);
          }}
        />
      </TableCell>
      <TableCell style={CellStyles}>
        <TextField
          name="check_out"
          defaultValue={log.check_out}
          type="time"
          onChange={e => {
            handleChange(e);
          }}
        />
      </TableCell>
      <TableCell style={{display: "flex", justifyContent: "flex-end", borderBottom: "none"}}>
        <Button variant="text" onClick={() => onDeleteLog(log.id)} style={{flexGrow: "1", marginRight: "10px"}}>
          Delete
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="outlined"
          disabled={isEmpty(updatedValues)}
          color="secondary"
          onClick={handleClickSave}
          style={{flexGrow: "1"}}
        >
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default LogRow;
