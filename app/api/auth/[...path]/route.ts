import { NextResponse, NextRequest } from "next/server";

import { getServerSideConfig } from "../../../config/server";
import { LAST_INPUT_KEY, USER_ID_KEY } from "@/app/constant";

const debug = true;

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

async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  console.log("redirect api/config");

  const { searchParams } = new URL(req.url);
  const requestToken = searchParams.get("code");
  // const state = searchParams.get('state');
  // const error = searchParams.get('error');
  console.log("[david Route] params ", req.url, requestToken);
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

  const login = userInfo?.login ?? "davidxwwang";

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

export const GET = handle;
export const POST = handle;

export const runtime = "edge";
