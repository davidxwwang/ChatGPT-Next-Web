import mysql from "mysql2/promise";

const host = "rm-uf68o0dxl4r7md1hd3o.mysql.rds.aliyuncs.com";
const user = "geeks2023";
const password = "438444angGG";
const database = "geeks2023";

// 创建连接
const pool = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

export default pool;
