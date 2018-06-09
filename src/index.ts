import connection from './connection';
import Eto from './model';

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  const data = await connection(Eto)((con) => con.manager.find(Eto));

  ctx.body = data;
});

app.listen(8888);
