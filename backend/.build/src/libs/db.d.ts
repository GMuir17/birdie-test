import * as mysql from "mysql2/promise";
declare const getConnection: () => Promise<mysql.Connection>;
export default getConnection;
