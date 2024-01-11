import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import postal from 'postal';

import Add from './components/Add';
import List from './components/List';

// postal channels
/*let addCategoryChannel = postal.channel('addCategoryChannel');
addCategoryChannel.subscribe('addcategoryevent', (data) => {
  console.log(
    'addCategoryChannel received in Transaction MFE:',
    data
  );

  fetch(process.env.CATEGORYAPI_URL, {
    method: 'POST',
    body: JSON.stringify({ name: data }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
});

let addAccountChannel = postal.channel('addAccountChannel');
addAccountChannel.subscribe('addaccountevent', (data) => {
  console.log('addAccountChannel received in Transaction MFE:', data);

  fetch(process.env.ACCOUNTAPI_URL, {
    method: 'POST',
    body: JSON.stringify({ name: data }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
});*/

const generateClassName = createGenerateClassName({
  productionPrefix: 'tran',
});

export default ({ history, onAdd }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/transaction/add">
              <Add onAdd={onAdd} />
            </Route>
            <Route path="/transaction/list">
              <List />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
