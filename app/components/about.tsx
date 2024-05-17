// About.js

import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>About Page</h2>
      <button
        onClick={() => {
          //navigate(-1)}
          window.location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx807d86fb6b3d4fd2&redirect_uri=http%3A%2F%2Fdevelopers.weixin.qq.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default About;
