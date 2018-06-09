import 'reflect-metadata';
import { createConnection } from 'typeorm';
import fetchData from './spider';
import Eto from './model';
import Config from './config';

createConnection({
  ...Config,
  type: 'mysql',
  entities: [Eto],
})
  .then(async (connection) => {
    const data = await fetchData();
    const date = new Date();
    const etos = data.map((eto) => new Eto(eto.address, eto.percentage, date));

    try {
      await connection.manager.save(etos);
      console.log('job done!');
    } finally {
      connection.close();
    }
  })
  .catch((e) => console.log(e));
