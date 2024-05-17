import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";
import MyApp from "./components/app";

import { getServerSideConfig } from "./config/server";

const serverConfig = getServerSideConfig();

export default async function App() {
  return (
    <>
      <Home />
      {serverConfig?.isVercel && (
        <>
          <Analytics />
        </>
      )}
    </>
    //   <>
    //   <MyApp />
    //   {serverConfig?.isVercel && (
    //     <>
    //       <Analytics />
    //     </>
    //   )}
    // </>
  );
}
