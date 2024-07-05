import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { Link, useNavigate } from "react-router-dom";
import { Path, USER_INFO_KEY } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import { useEffect } from "react";
import { getClientConfig } from "../config/client";
import oauth2loginUrl from "../utils/constans";

export function AuthPage() {
  const navigate = useNavigate();
  const accessStore = useAccessStore();

  const goHome = () => navigate(Path.Home);
  const goChat = () => navigate(Path.Chat);
  const resetAccessCode = () => {
    accessStore.update((access) => {
      access.openaiApiKey = "";
      access.accessCode = "";
    });
  }; // Reset access code to empty string

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate(Path.Settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const hasQurey = window.location.search.charAt(0) === "?";
    if (hasQurey) {
      const searchParams = new URLSearchParams(window.location.search);
      const login = searchParams.get("login") as string;
      if (login) {
        localStorage.setItem(USER_INFO_KEY, login);
      }
    }
  }, []);

  const userInfo = JSON.parse(localStorage.getItem("user") as string);
  const isLogin = userInfo != null;
  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      <div className={styles["auth-title"]}>{Locale.Auth.Title}</div>
      <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div>
      {isLogin ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={userInfo.headimgurl}
            alt="User Avatar"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              marginRight: 20,
            }}
          />
          <span>{userInfo.nickname}</span>
        </div>
      ) : null}
      <IconButton
        text="微信登录"
        onClick={() => {
          window.location.href = oauth2loginUrl;
        }}
      />
      {isLogin ? (
        <IconButton
          text="微信logout"
          onClick={() => {
            logout();
          }}
        />
      ) : null}

      <input
        className={styles["auth-input"]}
        type="password"
        placeholder={Locale.Auth.Input}
        value={accessStore.accessCode}
        onChange={(e) => {
          accessStore.update(
            (access) => (access.accessCode = e.currentTarget.value),
          );
        }}
      />
      {!accessStore.hideUserApiKey ? (
        <>
          <div className={styles["auth-tips"]}>{Locale.Auth.SubTips}</div>
          <input
            className={styles["auth-input"]}
            type="password"
            placeholder={Locale.Settings.Access.OpenAI.ApiKey.Placeholder}
            value={accessStore.openaiApiKey}
            onChange={(e) => {
              accessStore.update(
                (access) => (access.openaiApiKey = e.currentTarget.value),
              );
            }}
          />
          <input
            className={styles["auth-input"]}
            type="password"
            placeholder={Locale.Settings.Access.Google.ApiKey.Placeholder}
            value={accessStore.googleApiKey}
            onChange={(e) => {
              accessStore.update(
                (access) => (access.googleApiKey = e.currentTarget.value),
              );
            }}
          />
        </>
      ) : null}

      <div className={styles["auth-actions"]}>
        <IconButton
          text={Locale.Auth.Confirm}
          type="primary"
          onClick={goChat}
        />
        <IconButton
          text={Locale.Auth.Later}
          onClick={() => {
            resetAccessCode();
            goHome();
          }}
        />
      </div>
    </div>
  );
}
