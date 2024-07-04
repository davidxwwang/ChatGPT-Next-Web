// import { addUser, deleteUser, updateUser, getUserById } from "./userService";

// export async function testUser() {
//   // 增加用户
//   const newUser = {
//     nickname: "testuser",
//     avatar: "testavatar",
//     weichat_id: "testweichatid",
//     level: "1",
//     token_info: "testtokeninfo",
//     extras: "testextras",
//   };
//   console.log("Add User begin:");
//   const addUserResult = await addUser(newUser);
//   console.log("Add User Result:", addUserResult);

//   // 查询用户
//   const userId = 1; // 假设这是你想查询的用户ID
//   const user = await getUserById(userId);
//   console.log("User:", user);

//   // 更新用户
//   const updatedUser = {
//     id: userId,
//     nickname: "updatedUser",
//     avatar: "updatedAvatar",
//     weichat_id: "updatedWeichatId",
//     level: "2",
//     token_info: "updatedTokenInfo",
//     extras: "updatedExtras",
//   };
//   const updateUserResult = await updateUser(updatedUser);
//   console.log("Update User Result:", updateUserResult);

//   删除用户
//   // const deleteUserResult = await deleteUser(userId);
//   // console.log('Delete User Result:', deleteUserResult);
// }
