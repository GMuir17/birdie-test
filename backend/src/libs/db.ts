import * as mysql from "mysql2/promise";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};

export default getConnection;
