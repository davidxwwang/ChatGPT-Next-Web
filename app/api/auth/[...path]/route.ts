import { NextResponse, NextRequest } from "next/server";

import { getServerSideConfig } from "../../../config/server";

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
  console.log("[david Route] params ", params, requestToken);

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
    console.error("Failed to retrieve access token:", tokenResponse.statusText);
  }

  // 构造 JSON 数据
  const responseData = {
    message: "页面已永久重定向到新的地址",
    redirect_url: "/",
  };

  const x = NextResponse.json(
    { body: responseData },
    {
      status: 301,
      headers: { Location: "/", "Content-Type": "application/json" },
    },
  );
  return x;
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";
