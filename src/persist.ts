import connection from './connection';
import fetchData from './spider';
import Eto from './model';

connection(Eto)(async (connection) => {
  const data = await fetchData();
  const date = new Date();
  const etos = data.map((eto) => new Eto(eto.address, eto.percentage, date));

  await connection.manager.save(etos);
  console.log('job done!');
});
