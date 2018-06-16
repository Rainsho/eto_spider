import { getDate, getEtos, logger } from './src/utils';

const Koa = require('koa');
const router = require('koa-router');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();

const api = router({ prefix: '/api' });
api.get('/eto/date', getDate);
api.get('/eto/:time', getEtos);

app.use(logger);
app.use(api.routes());
app.use(serve(path.join(__dirname, 'dist')));

app.listen(8888, () => {
  console.log('listening on port 8888');
});
