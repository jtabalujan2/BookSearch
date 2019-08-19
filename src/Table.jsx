//React
import React from 'react';

//Component - Material UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';

import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './TableActions'
import { makeStyles } from '@material-ui/core/styles';


/*
Table Component - Child
-------------------------
Majority of boilerplate code is from Material-UI website

- Only changes made were:
    - Creating dynamic table headers based on initial column state
    - There could be a more elegant way to create column headers truly dynamic, but 
       I was unable to find it based on the JSON fields
    - Styling to fit theme of the pages
    - Seperating tablePaginationActions to a separate custom component to handle button actions
- Decided to go w/ Material-UI due to ease of use with tables
- Very close to native way of creating tables w/ React
- Most of code was pre-written
*/

 
const AuthorTable = (props) => {
    
  const rows = props.tableData
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
      
        <Table className={classes.table}>

        <TableHead>
          <TableRow>
            {props.columnNames.map(column => (
                <TableCell className={classes.head} key={column} align="left">{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>

          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow className={classes.row} key={row.key}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="left">{row.author_name}</TableCell>
                <TableCell align="left">{row.first_publish_year}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

          </TableBody>

          <TableFooter>
            <TableRow className={classes.row}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={props.tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>

        </Table>
      </div>
    </Paper>
  );
}

export default AuthorTable

//Table Styling
const useStyles = makeStyles(theme => ({
    root: {
      width: '90%',
      marginTop: theme.spacing(3),
    },
    head: {
        backgroundColor: '#1a237e',
        color: '#e8eaf6',
    },
    row: {
       backgroundColor: '#9fa8da',
       color: '#e8eaf6',
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  }));