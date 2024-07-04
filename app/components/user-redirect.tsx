// pages/redirect.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";

function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const currentUrl = window.location.href;
    console.log("--------------", currentUrl);
    const url = new URL(currentUrl); // /#user_redirect?user=xxxx
    const hash = url.hash.substring(1);
    const params = new URLSearchParams(hash.split("?")[1]);
    const userParam = params.get("user");

    if (userParam) {
      // 解析用户数据并保存到 localStorage
      const userData = JSON.parse(decodeURIComponent(userParam));
      localStorage.setItem("user", JSON.stringify(userData));
    }
    router.push("/"); // 重定向到主页
    // const navigate = useNavigate();
    // navigate(Path.Home);
  }, []);

  return <div></div>;
}

export default RedirectPage;
