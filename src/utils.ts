import connection from './connection';
import Eto from './model';

export async function getDate(ctx) {
  const date = await connection()(connection =>
    connection
      .getRepository(Eto)
      .createQueryBuilder()
      .select('DISTINCT CREATETIME AS TIME')
      .getRawMany()
  );
  ctx.body = date;
}

export async function getEtos(ctx) {
  const { time } = ctx.params;
  const date = new Date(parseInt(time));
  const etos = await connection()(connection =>
    connection.getRepository(Eto).find({ createtime: date })
  );
  ctx.body = etos;
}

export async function logger(ctx, next) {
  const { ip, method, url } = ctx.request;
  const start = new Date();
  console.log(`=== ${start.toISOString()} from ${ip}`);
  console.log(`--> ${method} ${url}`);
  await next();
  const { status, length } = ctx.response;
  console.log(`<-- ${method} ${url} ${status} ${Date.now() - start.getTime()}ms ${length}`);
}
