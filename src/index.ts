import connection from './connection';
import Eto from './model';

connection(Eto)(async (connection) => {
  const data = await connection.manager.find(Eto);

  console.log(data);
});
