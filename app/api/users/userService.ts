import pool from "./connect";
import { User } from "./userDTO";

// 插入用户
export async function createUser(user: User): Promise<number | null> {
  try {
    const [result] = await (
      await pool
    ).query(
      "INSERT INTO user (openid, unionid, nickname, headimgurl, token_infos, user_level, extras) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE openid = openid",
      [
        user.openid,
        user.unionid,
        user.nickname,
        user.headimgurl,
        user.token_infos,
        user.user_level,
        user.extras,
      ],
    );
    console.log("createUser -- ", result);
    return (result as any)?.insertId || null;
    // return result.insertId;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

// 根据 ID 查询用户
export async function getUserById(id: number): Promise<User | null> {
  try {
    const [rows] = await (
      await pool
    ).query("SELECT * FROM user WHERE id = ?", [id]);

    console.log("getUserById -- ", rows);
    const users = rows as User[];
    const valid = Array.isArray(users) && users.length > 0;
    return valid ? users[0] : null;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return null;
  }
}

// 更新用户信息
export async function updateUser(
  id: number,
  newData: Partial<User>,
): Promise<boolean> {
  try {
    const [result] = await (
      await pool
    ).query("UPDATE user SET ? WHERE id = ?", [newData, id]);
    return (result as any).affectedRows > 0;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
}

// 删除用户
export async function deleteUser(id: number): Promise<boolean> {
  try {
    const [result] = await (
      await pool
    ).query("DELETE FROM user WHERE id = ?", [id]);
    return (result as any).affectedRows > 0;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}
