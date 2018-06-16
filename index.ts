import { getDate, getEtos, logger } from './src/utils';

const Koa = require('koa');
const router = require('koa-router');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
const src = router();
const api = router({ prefix: '/api' });

src.get('/', serve(path.join(__dirname, 'front-end')));
api.get('/eto/date', getDate);
api.get('/eto/:time', getEtos);

app.use(logger);
app.use(src.routes());
app.use(api.routes());

app.listen(8888);
console.log('listening on port 8888');
