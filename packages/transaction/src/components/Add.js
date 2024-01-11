import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import postal from 'postal';

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
}));

export default function AddTransaction({ onAdd }) {
  const classes = useStyles();
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accountid, setAccount] = useState('');
  const [categoryid, setCategory] = useState('');

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
    console.log(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    fetch(process.env.TRANSACTION_ACCOUNTAPI_URL)
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(process.env.TRANSACTION_CATEGORYAPI_URL)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    var tranname = document.getElementById('name').value;
    fetch(process.env.API_URL, {
      method: 'POST',
      body: JSON.stringify({
        name: tranname,
        accountid: accountid,
        categoryid: categoryid,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

    console.log(
      'You clicked submit..',
      tranname,
      accountid,
      categoryid
    );
    /* let addTransactionChannel = postal.channel(
      'addTransactionChannel'
    );
    // Publish a message on channel1
    addTransactionChannel.publish(
      'addtransactionevent',
      tranname,
      accountid,
      categoryid
    );*/
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Transaction Name"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <InputLabel id="demo-simple-select-label">Account</InputLabel>
      <Select
        labelId="accountlabelid"
        id="accountid"
        label="Account"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleAccountChange}
      >
        {accounts.map((account) => (
          <MenuItem value={account.id}>{account.name}</MenuItem>
        ))}
      </Select>

      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="categorylabelid"
        id="categoryid"
        label="Category"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <MenuItem value={category.id}>{category.name}</MenuItem>
        ))}
      </Select>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onAdd}
      >
        Save
      </Button>
    </form>
  );
}
