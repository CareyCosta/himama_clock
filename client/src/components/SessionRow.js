import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { isEmpty } from "lodash";

const SessionRow = ({ log, onUpdateLog, onDeleteLog }) => {
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
      <TableCell>
        <TextField
          name="date"
          label="Date"
          defaultValue={log.date}
          type="date"
          onChange={e => {
            handleChange(e);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="check_in"
          label="Check In:"
          defaultValue={log.check_in}
          type={"time"}
          onChange={e => {
            handleChange(e);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="check_out"
          defaultValue={log.check_out}
          type="time"
          onChange={e => {
            handleChange(e);
          }}
          label="Check Out:"
        />
      </TableCell>
      <TableCell>
        <Button variant="text" onClick={() => onDeleteLog(log.id)}>
          Delete
        </Button>
        <Button
          variant="outlined"
          disabled={isEmpty(updatedValues)}
          color="secondary"
          onClick={handleClickSave}
        >
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default SessionRow;
