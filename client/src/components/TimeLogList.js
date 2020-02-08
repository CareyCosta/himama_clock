import React from "react";
import Table from "@material-ui/core/Table";
import SessionRow from "./SessionRow";
import { TableHead } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const TimeLogList = ({ logs, onUpdateLog, onDeleteLog }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Check In</TableCell>
          <TableCell>Check Out</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {logs.map(log => (
          <SessionRow
            log={log}
            key={log.id}
            onUpdateLog={onUpdateLog}
            onDeleteLog={onDeleteLog}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TimeLogList;
