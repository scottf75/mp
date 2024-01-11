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

const AccountsList = () => {
  const [accounts, setAccounts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch(process.env.API_URL)
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.log(error));
  }, []);

  /* const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
*/
  const columns = [
    { field: 'id', headerName: 'id', width: 150 },
    { field: 'name', headerName: 'name', width: 150 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Link to="/account/add">Add an Account</Link>
      <DataGrid
        rows={accounts}
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

    /*<Link to="/category/add">Add a Category</Link>

    <Grid container spacing={1}>
      {categories.map((category) => (
        <GridItem
          classes={classes}
          categoryname={category.name}
        ></GridItem>
      ))}
    </Grid>*/
  );
};

export default AccountsList;
