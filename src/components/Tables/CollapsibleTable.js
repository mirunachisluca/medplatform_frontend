import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.startDateString}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.endDateString}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Medication
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Intake Interval</TableCell>
                    <TableCell>Medication</TableCell>
                    <TableCell>Side effects</TableCell>
                    <TableCell>Dosage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.medicationList.map((medicationRow) => (
                    <TableRow key={medicationRow.intakeInterval}>
                      <TableCell component="th" scope="row">
                        {medicationRow.intakeInterval}
                      </TableCell>
                      <TableCell>{medicationRow.medication.name}</TableCell>
                      <TableCell>
                        {medicationRow.medication.sideEffects}
                      </TableCell>
                      <TableCell>{medicationRow.medication.dosage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    startDateString: PropTypes.instanceOf(Date).isRequired,
    endDateString: PropTypes.instanceOf(Date).isRequired,
    medication: PropTypes.arrayOf(
      PropTypes.shape({
        intakeInterval: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const useStyles = makeStyles({
  table: {
    width: 1110,
  },
});

function CollapsibleTable({ rows }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.startDate} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { CollapsibleTable };
