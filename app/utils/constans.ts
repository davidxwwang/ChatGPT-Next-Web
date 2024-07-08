// 授权模式 h5页面 / 极客思工具公众号
enum OuahMode {
  htmlMode = "html_mode",
  gongzhonghaoMode = "gongzhonghao_Mode",
}

const oauthMode = OuahMode.htmlMode;

let weichat_appid = "";
let weichat_AppSecret = "";
if (OuahMode.htmlMode == oauthMode) {
  weichat_appid = "wx54a6d02084c1e466";
  weichat_AppSecret = "7d10851447c03fdbfb1c1890172a19a6";
} else if (OuahMode.gongzhonghaoMode == oauthMode) {
  weichat_appid = "wxce39dc635f1489a4";
  weichat_AppSecret = "bbccff07eeac23eda83f73656ee9fbe6";
}

const redirect_uri = encodeURIComponent("http://x-geeks.com/api/auth/redirect");

const githubOath2Url =
  "https://github.com/login/oauth/authorize?client_id=Ov23liFmILukWbjxjYbe&redirect_uri=http://127.0.0.1:3000/api/auth/redirect";

const weichatOath2Url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${weichat_appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

const debug_model = false;

let oauth2logUrl = debug_model ? githubOath2Url : weichatOath2Url;

export { weichat_appid, weichat_AppSecret, oauth2logUrl };
