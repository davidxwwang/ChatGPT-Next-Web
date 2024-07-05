const weichat_appid = "wxce39dc635f1489a4";
const weichat_AppSecret = "bbccff07eeac23eda83f73656ee9fbe6";
const redirect_uri = encodeURIComponent("http://x-geeks.com/api/auth/redirect");

const githubOath2Url =
  "https://github.com/login/oauth/authorize?client_id=Ov23liFmILukWbjxjYbe&redirect_uri=http://127.0.0.1:3000/api/auth/redirect";
const weichatOath2Url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${weichat_appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

const debug_model = false;

let oauth2loginUrl = debug_model ? githubOath2Url : weichatOath2Url;

export default oauth2loginUrl;
