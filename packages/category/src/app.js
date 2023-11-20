import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Add from './components/Add';
import List from './components/List';

const generateClassName = createGenerateClassName({
  productionPrefix: 'cat',
});

export default ({ history, onAdd }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/category/add">
              <Add onAdd={onAdd} />
            </Route>
            <Route path="/category/list">
              <List />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
