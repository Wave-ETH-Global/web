import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { ConnectionsList } from "~/components/connectionsList";
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
  blockchainData: [
    { name: "FWB", type: "DAO member" },
    { name: "!fundrop", type: "holder" },
    { name: "CryptoPunk", type: "holder" },
    { name: "CryptoCoven", type: "holder" },
    { name: "Pudgy Penguin", type: "holder" },
    { name: "450 days old", type: "" },
  ],
};

const randomTags = () => {
  const tags = [
    "Hackathons",
    "NFTs",
    "Developer",
    "Investor",
    "DeFi",
    "Lisbon",
  ];
  const check = () => Math.random() <= 0.3;
  return tags.filter((_) => check());
};

const mutualConnections = [
  {
    name: "Jeff",
    handle: "@jeff",
    avatar: "https://cryptopunks.app/public/images/cryptopunks/punk8857.png",
  },
  { name: "Sarah", handle: "@sarah", avatar: "https://i.pravatar.cc/301" },
  {
    name: "Dave",
    handle: "@dave",
    avatar:
      "https://i.seadn.io/gcs/files/716ecc2a1f4a491257b33d655f454963.png?auto=format&w=1000",
  },
  {
    name: "Tara Reeves",
    handle: "@tara",
    avatar: "https://i.pravatar.cc/303",
  },
  {
    name: "Michael",
    handle: "@michael",
    avatar:
      "https://i.seadn.io/gcs/files/ba04ea8bd00d4c34528be32c6c2f7be4.png?auto=format&w=1000",
  },
  {
    name: "Alicia",
    handle: "@alicia",
    avatar:
      "https://i.seadn.io/gcs/files/a55f9d8aab226d601874bf7593649549.png?auto=format&w=1000",
  },
  { name: "Samantha", handle: "@sam", avatar: "https://i.pravatar.cc/306" },
  {
    name: "Wade",
    handle: "@wade",
    avatar:
      "https://i.seadn.io/gcs/files/f98b38293c287476d83256c9719e8b83.png?auto=format&w=1000",
  },
  { name: "Oscar", handle: "@oscar", avatar: "https://i.pravatar.cc/308" },
  { name: "Jimmy", handle: "@jimmy", avatar: "https://i.pravatar.cc/309" },
  {
    name: "Victoria",
    handle: "@victoria",
    avatar: "https://i.pravatar.cc/310",
  },
  { name: "Danny", handle: "@danny", avatar: "https://i.pravatar.cc/311" },
  { name: "Celine", handle: "@celine", avatar: "https://i.pravatar.cc/312" },
  { name: "Wendy", handle: "@wendy", avatar: "https://i.pravatar.cc/313" },
  { name: "Travis", handle: "@travis", avatar: "https://i.pravatar.cc/314" },
  {
    name: "Melinda",
    handle: "@melinda",
    avatar: "https://i.pravatar.cc/315",
  },
  { name: "Shawn", handle: "@shawn", avatar: "https://i.pravatar.cc/316" },
  { name: "Olivia", handle: "@olivia", avatar: "https://i.pravatar.cc/317" },
  { name: "Gavin", handle: "@gavin", avatar: "https://i.pravatar.cc/318" },
  { name: "Monica", handle: "@monica", avatar: "https://i.pravatar.cc/319" },
].map((con) => ({
  ...con,
  tags: randomTags(),
}));

console.log(mutualConnections);

const Flow: NextPage = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Declare "profile" as initial active tab.
  const [step, setStep] = useState(0);
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setStep((prevStep) => prevStep + 1);
    }
    if (event.key === "ArrowLeft") {
      setStep((prevStep) => prevStep - 1);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Wave Protocol</title>
        <meta name="description" content="Social Tooling" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-[#DDDDDD]">
        <main className="mx-auto flex w-full max-w-md justify-center">
          <div className="">
            <div className="mb-5" />
            {step === 0 && <SignIn />}
            <div className="mb-5" />
            {step === 1 && <CreateVault />}
            <div className="mb-5" />
            {step === 2 && (
              <CreateProfile
                vaultData={vaultData}
                onSubmitProfile={console.log}
              />
            )}
            <div className="mb-5" />
            {step === 3 && (
              <ViewProfile
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isSelf={true}
              />
            )}
            <div className="mb-5" />
            {step === 4 && (
              <ViewProfile
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isSelf={false}
              />
            )}
            <div className="mb-5" />
            {step === 5 && <ConnectionsList connections={mutualConnections} />}
            <div className="mb-20" />
          </div>
        </main>
      </div>
    </>
  );
};

export default Flow;
