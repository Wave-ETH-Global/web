import React, { useState } from "react";
import QRCode from "react-qr-code";

import { LensIntegration } from "./lensIntegration";
import { ProfileFeed } from "./profileFeed";
import { SocialFeed } from "./socialFeed";

// import avatarPlaceholderImg from "./avatar_placeholder_image.png";

interface ProfileProps {
  data: ProfileData;
  activeTab: string; // Add these two props
  setActiveTab: (tab: string) => void;
  isSelf: boolean;
}

// example data
const data = {
  name: "Skylar",
  handle: "@skylar",
  ens: "skylar.eth",
  title: "Founder at wave.xyz",
  bio: "Traveler and foodie. Spend my days contributing to DAOs and tinkering with new ideas to further web3 for all.",
  currentLocation: "ETH Tokyo",
  futureLocation: "Lisbon",
  avatar:
    "https://i.seadn.io/gae/E8MVasG7noxC0Fa_duhnexc2xze1PzT1jzyeaHsytOC4722C2Zeo7EhUR8-T6mSem9-4XE5ylrCtoAsceZ_lXez_kTaMufV5pfLc3Fk?auto=format&w=3840",
  mutualConnections: [
    { name: "Jeff", handle: "@jeff", avatar: "https://i.pravatar.cc/300" },
    { name: "Sarah", handle: "@sarah", avatar: "https://i.pravatar.cc/301" },
    { name: "Dave", handle: "@dave", avatar: "https://i.pravatar.cc/302" },
    {
      name: "Tara Reeves",
      handle: "@tara",
      avatar: "https://i.pravatar.cc/303",
    },
    {
      name: "Michael",
      handle: "@michael",
      avatar: "https://i.pravatar.cc/304",
    },
    { name: "Alicia", handle: "@alicia", avatar: "https://i.pravatar.cc/305" },
    { name: "Samantha", handle: "@sam", avatar: "https://i.pravatar.cc/306" },
    { name: "Wade", handle: "@wade", avatar: "https://i.pravatar.cc/307" },
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
  ],
  platforms: {
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  blockchainData: [
    { name: "FWB", type: "DAO" },
    { name: "!fundrop", type: "NFT" },
  ],
};

type PlatformData = {
  [key: string]: string;
};

type ConnectionData = {
  name: string;
  handle: string;
  avatar?: string;
};

type ProfileData = {
  name: string;
  handle: string;
  ens: string;
  title: string;
  bio: string;
  currentLocation: string;
  futureLocation: string;
  avatar?: string;
  mutualConnections: ConnectionData[];
  platforms: PlatformData;
};

interface SocialIconsProps {
  platforms: PlatformData;
}

interface MutualConnectionsProps {
  connections: ConnectionData[];
}

interface ProfileProps {
  data: ProfileData;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ platforms }) => (
  <div className="flex items-center space-x-3 pr-5">
    {Object.keys(platforms).map((platform) => (
      <>
        <a
          key={platform}
          href={platforms[platform]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`fab fa-${platform}`}></i>
        </a>
      </>
    ))}
  </div>
);

const MutualConnections: React.FC<MutualConnectionsProps> = ({
  connections,
}) => {
  const displayedConnections = connections.slice(0, 3);
  const remainingConnections = connections.length - displayedConnections.length;
  return (
    <div className="flex items-center space-x-1">
      <div className="relative mr-2 flex flex-row">
        {displayedConnections.map((connection, index) => (
          <img
            key={connection.handle}
            src={connection.avatar ? connection.avatar : ""}
            alt={connection.name}
            className={`z-30 h-6 w-6 rounded-full border-2 border-white ${
              index > 0 ? `-right-${index * 2}` : ""
            }`}
            style={{ zIndex: displayedConnections.length - index }}
          />
        ))}
      </div>
      <span>
        {connections.slice(0, 3).map((connection, index) => (
          <React.Fragment key={connection.handle}>
            {connection.name}
            {index < displayedConnections.length - 1 ? ", " : ""}
          </React.Fragment>
        ))}
        {remainingConnections > 0 && (
          <React.Fragment> and {remainingConnections} others</React.Fragment>
        )}
      </span>
    </div>
  );
};

export function ViewProfile({ activeTab, setActiveTab, isSelf }: ProfileProps) {
  const [wave, setWave] = useState(false);
  return (
    <>
      <div className="mx-1 flex flex-col items-center justify-center rounded-md bg-[#FFFFFF] p-[20px] shadow-md">
        <div className="ml-4 flex self-start">
          <div className="mr-4 self-center">
            <img
              src={data.avatar}
              alt={data.name}
              className="h-[100px] w-[100px] rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-unbounded text-[35px] font-bold">
              {data.name}
            </h1>
            <span>{data.handle}</span>
            <span>{data.ens}</span>
            <span>{data.title}</span>
          </div>
        </div>
        <div className="ml-4">
          <p className="mb-2 mt-4">{data.bio}</p>

          <div className="flex flex-row">
            <div className="mr-5">
              <h2 className="text-xl font-bold">📍</h2>
              <span>{data.currentLocation}</span>
            </div>
            {data.futureLocation && (
              <div className="">
                <h2 className="text-xl font-bold">🔜</h2>
                <span>{data.futureLocation}</span>
              </div>
            )}
          </div>

          {!isSelf && (
            <div className="my-4">
              <h2 className="text-md font-bold">Mutual Connections</h2>
              <MutualConnections connections={data.mutualConnections} />
            </div>
          )}

          {isSelf && (
            <div className="my-4">
              <h2 className="text-md font-bold">Connections</h2>
              <MutualConnections connections={data.mutualConnections} />
            </div>
          )}

          <div className="flex items-center justify-between space-x-5">
            {!isSelf ? (
              <button
                className="rounded bg-blue-500 px-4 py-2 font-unbounded font-bold text-white"
                onClick={() => console.log("handle connect!")}
              >
                Connect
              </button>
            ) : (
              <button
                className="rounded bg-blue-500 px-4 py-2 font-unbounded font-bold text-white"
                onClick={() => setWave(!wave)}
              >
                {!wave ? "Wave 👋" : "Done!"}
              </button>
            )}
            <SocialIcons platforms={data.platforms} />
          </div>
        </div>
        {isSelf && wave && (
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 200,
              width: "100%",
              marginTop: "20px",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"www.google.com"}
              viewBox={`0 0 256 256`}
            />
          </div>
        )}
        <hr className="mt-[20px] h-[2px] w-full rounded-sm bg-[#DDDDDD]" />
        <div className="ml-[35px] mt-4 flex w-full items-center font-unbounded text-lg">
          <button
            className={`mr-4 font-bold ${
              activeTab === "profile" ? "text-blue-500" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`ml-4 font-bold ${
              activeTab === "social" ? "text-blue-500" : ""
            }`}
            onClick={() => setActiveTab("social")}
          >
            Social
          </button>
        </div>
      </div>

      {activeTab === "profile" && <ProfileFeed />}
      {activeTab === "social" && (
        <div className="mt-4 w-full">
          <LensIntegration />
          <SocialFeed
            header="Twitter"
            tweets={[
              {
                text: "Tokyo has been amazing! I can't believe I'm here!",
                image: "https://source.unsplash.com/c/random/1",
              },
              {
                text: "Second meal in Japan!",
                image: "https://source.unsplash.com/c/random/2",
              },
              {
                text: "First meal in Japan!",
                image: "https://source.unsplash.com/c/random/2",
              },
              {
                text: "Flying to japan!",
              },
            ]}
          />
          <SocialFeed
            header="BlueSky"
            tweets={[
              {
                text: "Wow, this app is so much better than twitter.",
                image: "https://source.unsplash.com/c/random/3",
              },
              {
                text: "Mock Bluesky tweet 2",
                image: "https://source.unsplash.com/c/random/4",
              },
            ]}
          />
        </div>
      )}
    </>
  );
}
