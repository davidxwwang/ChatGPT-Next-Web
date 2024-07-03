import pool from "./connect";

interface User {
  id?: number;
  nickname: string;
  avatar: string;
  weichat_id: string;
  level: string;
  token_info: string;
  extras: string;
}

// 增加用户
export async function addUser(user: User) {
  // const connection = await pool.getConnection();
  try {
    const [result] = await (
      await pool
    ).query(
      "INSERT INTO users (nickname, avatar, weichat_id, level, token_info, extras) VALUES (?, ?, ?, ?, ?, ?)",
      [
        user.nickname,
        user.avatar,
        user.weichat_id,
        user.level,
        user.token_info,
        user.extras,
      ],
    );
    return result;
  } finally {
    // connection.release();
  }
}

// 删除用户
export async function deleteUser(userId: number) {
  // const connection = await pool.getConnection();
  try {
    const [result] = await (
      await pool
    ).query("DELETE FROM users WHERE id = ?", [userId]);
    return result;
  } finally {
    // connection.release();
  }
}

// 更新用户
export async function updateUser(user: User) {
  //  const connection = await pool.getConnection();
  try {
    const [result] = await (
      await pool
    ).query(
      "UPDATE users SET nickname = ?, avatar = ?, weichat_id = ?, level = ?, token_info = ?, extras = ? WHERE id = ?",
      [
        user.nickname,
        user.avatar,
        user.weichat_id,
        user.level,
        user.token_info,
        user.extras,
        user.id,
      ],
    );
    return result;
  } finally {
    //connection.release();
  }
}

// 查询用户
export async function getUserById(userId: number) {
  // const connection = await pool.getConnection();
  try {
    const [rows] = await (
      await pool
    ).query("SELECT * FROM users WHERE id = ?", [userId]);
    return rows;
  } finally {
    //connection.release();
  }
}
