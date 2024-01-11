import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Progress from './components/Progress';
import postal from 'postal';
import ResponsiveAppBar from './components/ResponsiveAppBar';

import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import { StyledEngineProvider } from '@mui/material/styles';

import { createBrowserHistory } from 'history';

// postal channels
let addCategoryChannel = postal.channel('addCategoryChannel');
addCategoryChannel.subscribe('addcategoryevent', (data) => {
  console.log('addCategoryChannel received:', data);

  fetch(process.env.TRANSACTION_CATEGORYAPI_URL, {
    method: 'POST',
    body: JSON.stringify({ name: data }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
});

let addAccountChannel = postal.channel('addAccountChannel');
addAccountChannel.subscribe('addaccountevent', (data) => {
  console.log('addAccountChannel received:', data);

  fetch(process.env.TRANSACTION_ACCOUNTAPI_URL, {
    method: 'POST',
    body: JSON.stringify({ name: data }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
});

const AuthLazy = lazy(() => import('./components/AuthApp'));
const CategoryLazy = lazy(() => import('./components/CategoryApp'));
const AccountLazy = lazy(() => import('./components/AccountApp'));
const TransactionLazy = lazy(() =>
  import('./components/TransactionApp')
);

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdded, setAddCategory] = useState(false);
  const [isAccountAdded, setAddAccount] = useState(false);
  const [isTransactionAdded, setAddTransaction] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (isAdded) {
      console.log('added');
    }
  }, [isAdded]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          {/*
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
  */}
          <StyledEngineProvider injectFirst>
            <ResponsiveAppBar />
          </StyledEngineProvider>
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/category">
                <CategoryLazy onAdd={() => setAddCategory(true)} />
              </Route>
              <Route path="/account">
                <AccountLazy onAdd={() => setAddAccount(true)} />
              </Route>
              <Route path="/transaction">
                <TransactionLazy
                  onAdd={() => setAddTransaction(true)}
                />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
