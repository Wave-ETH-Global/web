import { Web3Button } from "@web3modal/react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { CreateProfile } from "~/components/createProfile";
import { CreateVault } from "~/components/createVault";
import { SignIn } from "~/components/signIn";
import { ViewProfile } from "~/components/viewProfile";
import { api } from "~/utils/api";

const vaultData = {
  name: "Skylar",
  handle: "@skylar",
  ens: "skylar.eth",
  title: "Founder at wave.xyz",
  bio: "Traveler and foodie. Spend my days contributing to DAOs and tinkering with new ideas to further web3 for all.",
  currentLocation: "ETH Tokyo",
  futureLocation: "Lisbon",
  avatar:
    "https://i.seadn.io/gae/E8MVasG7noxC0Fa_duhnexc2xze1PzT1jzyeaHsytOC4722C2Zeo7EhUR8-T6mSem9-4XE5ylrCtoAsceZ_lXez_kTaMufV5pfLc3Fk?auto=format&w=3840",
  // blockchainData: [
  //   { name: "FWB", type: "DAO" },
  //   { name: "!fundrop", type: "NFT" },
  // ],
};

const Home: NextPage = () => {
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
          <div className="">
            <div className="mb-5" />
            <SignIn />
            <div className="mb-5" />
            <CreateVault />
            <div className="mb-5" />
            <CreateProfile
              vaultData={vaultData}
              onSubmitProfile={console.log}
            />
            <div className="mb-5" />
            <ViewProfile
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSelf={true}
            />
            <div className="mb-5" />
            {/* <BottomNav /> */}
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

export default Home;
