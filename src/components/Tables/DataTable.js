import React from "react";
import { useTable } from "react-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  CAREGIVER_DETAILS_PAGE_PATH,
  MEDICATION_DETAILS_PAGE_PATH,
  PATIENT_DETAILS_PAGE_PATH,
} from "../../routes";

const useStyles = makeStyles({
  table: {
    width: 1110,
  },
});

function DataTable({ columns, data }) {
  const classes = useStyles();
  const tableInstance = useTable({ columns, data });
  const history = useHistory();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  function handleRowClick(data) {
    if (data.patientId) {
      console.log(data.patientId);
      history.push({
        pathname: PATIENT_DETAILS_PAGE_PATH,
        state: data,
      });
    } else if (data.caregiverId) {
      console.log(data.caregiverId);
      history.push({
        pathname: CAREGIVER_DETAILS_PAGE_PATH,
        state: data,
      });
    } else if (data.medicationId) {
      history.push({
        pathname: MEDICATION_DETAILS_PAGE_PATH,
        state: data,
      });
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="simple table"
          {...getTableProps()}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  const { render, getHeaderProps } = column;
                  return (
                    <TableCell align="left" {...getHeaderProps()}>
                      {render("Header")}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  onClick={() => {
                    handleRowClick(row.original);
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell align="left" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export { DataTable };
