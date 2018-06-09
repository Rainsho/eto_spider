import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import Config from './config';

interface MiddleWare {
  (middleware: Connection): void;
}

export default (model) => (middleware: MiddleWare) =>
  createConnection({
    ...Config,
    type: 'mysql',
    entities: [model],
  }).then(async (connection) => {
    try {
      const next = await middleware(connection);
      return next;
    } catch (e) {
      console.log(e);
      connection.close();
    } finally {
      connection.close();
    }
  });
