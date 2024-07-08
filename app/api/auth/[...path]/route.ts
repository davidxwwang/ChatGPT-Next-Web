import { NextResponse, NextRequest } from "next/server";

import { getServerSideConfig } from "../../../config/server";
import { LAST_INPUT_KEY } from "@/app/constant"; // USER_ID_KEY
import { use } from "react";
import { User, UserLevel } from "../../users/userDTO";
import { createUser, getUserById, updateUser } from "../../users/userService";
import { weichat_appid, weichat_AppSecret } from "@/app/utils/constans";

const debug = true;
const test_weichat = false;
const weichat = true;

const serverConfig = getServerSideConfig();

// Danger! Do not hard code any secret value here!
// 警告！不要在这里写入任何敏感信息！
const DANGER_CONFIG = {
  needCode: serverConfig.needCode,
  hideUserApiKey: serverConfig.hideUserApiKey,
  disableGPT4: serverConfig.disableGPT4,
  hideBalanceQuery: serverConfig.hideBalanceQuery,
  disableFastLink: serverConfig.disableFastLink,
  customModels: serverConfig.customModels,
  defaultModel: serverConfig.defaultModel,
};

// declare global {
//   type DangerConfig = typeof DANGER_CONFIG;
// }

// const weichat_appid = "wxce39dc635f1489a4";
// const weichat_AppSecret = "a37de7e411b63a491718754b1da484e0";

const user2 = {
  openid: "oipho6j4PIZv9Lhg4ypmpR6j2I7Q",
  unionid: "67890",
  nickname: "davidwang",
  headimgurl:
    "https://thirdwx.qlogo.cn/mmopen/vi_32/9aSoX1VtTdHJOUDMiaCXfRhJfXjb0acgW25EgWK1ibicpI6sQ3ktYYESaPx9kKiaics2ictnVp6F8L6vfb4nOzp6HdPQ/132",
  token_infos: JSON.stringify({ token: "xyz_tt" }),
  user_level: "basic",
  extras: "...",
} as User;

// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
async function getUserWeichatInfo(code: string) {
  if (test_weichat) {
    const login = user2.openid;
    // 构造重定向URL，带有查询参数login
    const getToken = `/getToken?login=${encodeURIComponent(login)}`;
    const y = {
      openid: user2.openid,
      nickname: user2.nickname,
      headimgurl: user2.headimgurl,
    };
    const userData = encodeURIComponent(JSON.stringify(y));
    //const x = NextResponse.redirect(getToken);
    const user_redirectUrl = `/#user_redirect?user=${userData}`;
    const responseData = {
      message: "页面已永久重定向到新的地址",
      redirect_url: user_redirectUrl,
    };
    const x = NextResponse.json(
      { body: responseData },
      {
        status: 307,
        headers: {
          Location: user_redirectUrl,
          "Content-Type": "application/json",
          "david-Control": "david",
        },
      },
    );
    return x;
  }
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${weichat_appid}&secret=${weichat_AppSecret}&code=${code}&grant_type=authorization_code`;
  const tokenResponse = await fetch(url);
  if (tokenResponse.ok) {
    const data = await tokenResponse.json();
    const accessToken = data.access_token;
    const refresh_token = data.refresh_token;
    const openid = data.openid;
    console.log("Access Token:", data);

    const result = await fetch(
      `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}&lang=zh_CN`,
      {
        method: "get",
        headers: {
          accept: "application/json",
        },
      },
    );
    if (result.ok) {
      const rst = await result.json();
      console.log("weichat_user info:", rst);
      const user = {
        openid: rst.openid,
        unionid: rst.unionid,
        nickname: rst.nickname,
        headimgurl: rst.headimgurl,
        token_infos: JSON.stringify({
          accessToken: accessToken,
          refresh_token: refresh_token,
        }),
        user_level: UserLevel.COMMON,
      } as User;

      const userInfo = {
        openid: rst.openid,
        nickname: rst.nickname,
        headimgurl: rst.headimgurl,
      };
      const userInfo2 = encodeURIComponent(JSON.stringify(userInfo));
      const userRedirectUrl = `/#user_redirect?user=${userInfo2}`;
      saveUser(user);
      return NextResponse.json(
        {
          body: {
            message: "页面已永久重定向到新的地址",
            redirect_url: userRedirectUrl,
          },
        },
        {
          status: 307,
          headers: {
            Location: userRedirectUrl,
            "Content-Type": "application/json",
          },
        },
      );
    }
  } else {
    console.error("Failed to retrieve access token:", tokenResponse.statusText);
  }
  return NextResponse.json(
    {
      error: true,
      msg: "no request token",
    },
    {
      status: 400,
    },
  );
}

async function getUserGithubInfo(requestToken: string) {
  let userInfo = null;
  if (debug) {
    userInfo = {
      login: "davidxwwang",
      id: 13027592,
      node_id: "MDQ6VXNlcjEzMDI3NTky",
      avatar_url: "https://avatars.githubusercontent.com/u/13027592?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/davidxwwang",
      html_url: "https://github.com/davidxwwang",
      followers_url: "https://api.github.com/users/davidxwwang/followers",
      following_url:
        "https://api.github.com/users/davidxwwang/following{/other_user}",
      gists_url: "https://api.github.com/users/davidxwwang/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/davidxwwang/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/davidxwwang/subscriptions",
      organizations_url: "https://api.github.com/users/davidxwwang/orgs",
      repos_url: "https://api.github.com/users/davidxwwang/repos",
      events_url: "https://api.github.com/users/davidxwwang/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/davidxwwang/received_events",
      type: "User",
      site_admin: false,
      name: null,
      company: null,
      blog: "",
      location: null,
      email: null,
      hireable: null,
      bio: null,
      twitter_username: null,
      public_repos: 84,
      public_gists: 1,
      followers: 1,
      following: 1,
      created_at: "2015-06-24T04:07:53Z",
      updated_at: "2024-05-07T01:53:08Z",
    };

    // 保存前端
    // localStorage.setItem(USER_ID_KEY, userInfo.node_id);
  } else {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token?" +
        `client_id=Ov23liFmILukWbjxjYbe&` +
        `client_secret=496d865310a49ea7d0be84f4d2c07397f2e2c43a&` +
        `code=${requestToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (tokenResponse.ok) {
      const data = await tokenResponse.json();
      const accessToken = data.access_token;
      console.log("Access Token:", data);

      const result = await fetch("https://api.github.com/user", {
        method: "get",
        headers: {
          accept: "application/json",
          Authorization: `token ${accessToken}`,
        },
      });
      if (result.ok) {
        const rst = await result.json();
        console.log("user info:", rst);
      }
    } else {
      console.error(
        "Failed to retrieve access token:",
        tokenResponse.statusText,
      );
    }
  }

  // 构造 JSON 数据
  const responseData = {
    message: "页面已永久重定向到新的地址",
    redirect_url: "/",
  };

  //const login = userInfo?.login ?? "davidxwwang";
  const login = user2.openid;

  // 构造重定向URL，带有查询参数login
  const getToken = `/getToken?login=${encodeURIComponent(login)}`;
  const x = NextResponse.json(
    { body: responseData },
    {
      status: 301,
      headers: {
        Location: `/?login=${encodeURIComponent(login)}`,
        "Content-Type": "application/json",
        "david-Control": "david",
      },
    },
  );
  return x;
}

async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  console.log("redirect api/config");

  const { searchParams } = new URL(req.url);
  const requestToken = searchParams.get("code");
  if (!requestToken) {
    return NextResponse.json(
      {
        error: true,
        msg: "no request token",
      },
      {
        status: 400,
      },
    );
  }

  console.log("[david Route] params ", req.url, requestToken);
  let userInfo = null;
  if (weichat) {
    let user = await getUserWeichatInfo(requestToken);
    return user;
  } else {
    const userInfo = await getUserGithubInfo(requestToken);
    console.log("[getUserGithubInfo] userInfo ", userInfo);
    return userInfo;
  }
}

// 还要把userid save到chrome中
async function saveUser(user: User) {
  const userId = await createUser(user);

  if (userId) {
    console.log(`Created user with ID: ${userId}`);

    const user = await getUserById(userId);
    console.log("User:", user);

    // const updated = await updateUser(userId, { nickname: "david" });
    // console.log("User updated:", updated);
  }
  console.log("[saveUser] user ", user);
}

export const GET = handle;
export const POST = handle;

export const runtime = "nodejs";
