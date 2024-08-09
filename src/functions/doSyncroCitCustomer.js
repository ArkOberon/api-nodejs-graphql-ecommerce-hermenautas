import { User } from '../models/User.js';
import mysql from 'mysql';

export const doSyncroCitCustomer = (email, username) => {
  // Customer Data
  const data = {
    email: 'success',
    username: 'success',
  };

  // Estos datos no funcionan bien con process.env.
  // A la hora de cambiar de entorno se debe generar un nuevo archivo con Jenkins
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'oberon-lambda',
  });

  const userEmail = `${email}`;
  const userUsername = `${username}`;

  let RowDataPacket = {
    ID: 0,
  };

  connection.query(`SELECT * FROM wp_users WHERE user_email LIKE '${email}'`, function (err, rows) {
    if (err) {
      console.log('An error occured with the query');
      return;
    }

    RowDataPacket = rows[0];

    const newCit = RowDataPacket.ID;

    User.update(
      { cit: newCit },
      {
        where: {
          email: userEmail,
          username: userUsername,
        },
      },
    );
  });

  connection.end();

  return data;
};
