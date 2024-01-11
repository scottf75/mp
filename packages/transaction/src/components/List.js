import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch(process.env.API_URL)
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    { field: 'id', headerName: 'id', width: 150 },
    { field: 'accountid', headerName: 'accountid', width: 150 },
    { field: 'name', headerName: 'name', width: 150 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Link to="/transaction/add">Add a Transaction</Link>
      <DataGrid
        rows={transactions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default TransactionsList;
