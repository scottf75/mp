import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Progress from './components/Progress';
import postal from 'postal';

import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import { createBrowserHistory } from 'history';

// postal channels
let addCategoryChannel = postal.channel('addCategoryChannel');
addCategoryChannel.subscribe('addcategoryevent', (data) => {
  console.log('addCategoryChannel received:', data);
});

const AuthLazy = lazy(() => import('./components/AuthApp'));
const CategoryLazy = lazy(() => import('./components/CategoryApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdded, setAddCategory] = useState(false);

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
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/category">
                <CategoryLazy onAdd={() => setAddCategory(true)} />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
