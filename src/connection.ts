import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import Config from './config';
import Eto from './model';

interface MiddleWare {
  (middleware: Connection): void;
}

let connection;

const conFactory = () =>
  createConnection({
    ...Config,
    type: 'mysql',
    entities: [Eto],
  }).then(con => {
    connection = con;
    return con;
  });

export default () => (middleware: MiddleWare) => {
  if (connection) {
    return Promise.resolve(connection).then(async con => {
      try {
        const next = await middleware(con);
        return next;
      } catch (e) {
        console.log(e);
        con.close();
        connection = null;
      } finally {
        con.close();
        connection = null;
      }
    });
  }

  return conFactory().then(async con => {
    try {
      const next = await middleware(con);
      return next;
    } catch (e) {
      console.log(e);
      con.close();
      connection = null;
    } finally {
      con.close();
      connection = null;
    }
  });
};
