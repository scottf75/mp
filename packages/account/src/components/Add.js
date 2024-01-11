import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
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

export default function AddAccount({ onAdd }) {
  const classes = useStyles();

  function handleSubmit(e) {
    e.preventDefault();
    var accountname = document.getElementById('name').value;
    fetch(process.env.API_URL, {
      method: 'POST',
      body: JSON.stringify({ name: accountname }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      // .then((data) => setCategories(data))
      .catch((error) => console.log(error));

    console.log('You clicked submit.');
    let addAccountChannel = postal.channel('addAccountChannel');
    // Publish a message on channel1
    addAccountChannel.publish('addaccountevent', accountname);
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Account Name"
        name="name"
        autoComplete="name"
        autoFocus
      />

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
