import React from 'react';
import dva, { connect } from 'dva';
import createLoading from 'dva-loading';

import 'babel-polyfill';
import './index.less';

import model from './model';
import App from './app';

const app = dva();

app.use(createLoading());
app.model(model);
app.router(() => <App />);
app.start('#root');
