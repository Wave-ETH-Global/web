import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { BottomNav } from "~/components/bottomnav";
import { ViewProfile } from "~/components/viewprofile";
import { api } from "~/utils/api";

const Profile: NextPage = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Declare "profile" as initial active tab.
  return (
    <>
      <Head>
        {/* <Web3Button /> */}
        <title>Wave Protocol</title>
        <meta name="description" content="Social Tooling" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-[#DDDDDD]">
        <main className="mx-auto flex w-full max-w-md">
          <div className="mt-5">
            <ViewProfile
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSelf={true}
            />
            <div className="mb-5" />
            <BottomNav />
            <div className="mb-20" />
            {/* <p className="">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
