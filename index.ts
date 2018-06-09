import connection from './src/connection';
import Eto from './src/model';

const Koa = require('koa');
const router = require('koa-router');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
const src = router();
const api = router({ prefix: '/api' });

src.get('/', serve(path.join(__dirname, 'front-end')));

api.get('/eto/date', async (ctx) => {
  const date = await connection(Eto)((connection) =>
    connection
      .getRepository(Eto)
      .createQueryBuilder()
      .select('DISTINCT CREATETIME AS TIME')
      .getRawMany()
  );
  ctx.body = date;
});

api.get('/eto/:time', async (ctx) => {
  const { time } = ctx.params;
  const date = new Date(parseInt(time));
  const etos = await connection(Eto)((connection) =>
    connection.getRepository(Eto).find({ createtime: date })
  );
  ctx.body = etos;
});

app.use(src.routes());
app.use(api.routes());

app.listen(8888);
console.log('listening on port 8888');
