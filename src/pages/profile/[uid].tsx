import { Web3Button } from "@web3modal/react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { BottomNav } from "~/components/bottomnav";
import { CreateVault } from "~/components/createvault";
import { SignIn } from "~/components/signin";
import { ViewProfile } from "~/components/viewprofile";
import { api } from "~/utils/api";

const OtherProfile: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
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
          <h1>test</h1>
        </main>
      </div>
    </>
  );
};

export default OtherProfile;
