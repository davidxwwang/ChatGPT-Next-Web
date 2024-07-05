// pages/redirect.js

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";

const RedirectPage = () => {
  const navigate = useNavigate(); // 如果使用 react-router-dom v6
  useEffect(() => {
    const currentUrl = window.location.href;
    console.log("--------------", currentUrl);
    const url = new URL(currentUrl); // /#user_redirect?user=xxxx
    const hash = url.hash.substring(1);
    const params = new URLSearchParams(hash.split("?")[1]);
    const userParam = params.get("user");

    if (userParam) {
      const userData = JSON.parse(decodeURIComponent(userParam));
      localStorage.setItem("user", JSON.stringify(userData));
    }

    setTimeout(() => {
      navigate(Path.Home); // 如果使用 react-router-dom v6
    }, 100); // 100ms 延迟
  }, [navigate]); // 如果使用 react-router-dom v6

  return (
    <div>
      <p>正在重定向，请稍候...</p>
    </div>
  );
};

// function RedirectPage() {
//   const router = useRouter();
//   useEffect(() => {
//     try {
//       const currentUrl = window.location.href;
//       console.log("--------------", currentUrl);
//       const url = new URL(currentUrl); // /#user_redirect?user=xxxx
//       const hash = url.hash.substring(1);
//       const params = new URLSearchParams(hash.split("?")[1]);
//       const userParam = params.get("user");

//       if (userParam) {
//         // 解析用户数据并保存到 localStorage
//         const userData = JSON.parse(decodeURIComponent(userParam));
//         localStorage.setItem("user", JSON.stringify(userData));
//       }

//       setTimeout( () => {
//         router.push("/");
//       }, 100)

//     }catch (error) {
//       console.error("解析URL或重定向时出错:", error);
//     }}, [router]
//   )
//   return <div>{"重定向中..."}</div>;
// }

export default RedirectPage;
