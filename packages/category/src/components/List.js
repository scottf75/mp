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

function GridItem({ classes, categoryname }) {
  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid item xs={12} sm={6} md={3}>
      <Paper className={classes.paper}>{categoryname} </Paper>
    </Grid>
  );
}

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('http://localhost:3001/category')
      .then((response) => response.json())
      .then((data) => setCategories(data))
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
      <Link to="/category/add">Add a Category</Link>
      <DataGrid
        rows={categories}
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

export default CategoriesList;
