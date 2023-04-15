import React from "react";

import { ProfileFeed } from "./profilefeed";
import { SocialFeed } from "./socialfeed";

// import avatarPlaceholderImg from "./avatar_placeholder_image.png";

interface ProfileProps {
  data: ProfileData;
  activeTab: string; // Add these two props
  setActiveTab: (tab: string) => void;
}

// example data
const data = {
  name: "Skyler",
  handle: "@john.doe",
  ens: "johndoe.eth",
  title: "Founder at being a placeholder character",
  bio: "I'm a placeholder character for the web3 social app Wave!",
  currentLocation: "ETH Tokyo!",
  futureLocation: "Cyberspace",
  avatar: "https://i.pravatar.cc/300",
  mutualConnections: [
    { name: "jeff", handle: "@jeff", avatar: "https://i.pravatar.cc/303" },
    { name: "sarah", handle: "@sarah", avatar: "https://i.pravatar.cc/301" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/302" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
    { name: "dave", handle: "@dave", avatar: "https://i.pravatar.cc/300" },
  ],
  platforms: {
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
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
  <div className="flex items-center space-x-3">
    {Object.keys(platforms).map((platform) => (
      <>
        {/* broken for now, need to add icons. using plaintext in meantime. */}
        <a
          key={platform}
          href={platforms[platform]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`fab fa-${platform}`}></i>
        </a>
        <a href={platforms[platform]}>{platform}</a>
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

export function ViewProfile({ activeTab, setActiveTab }: ProfileProps) {
  const avatarPlaceholder = "avatar-placeholder-color"; // Add desired color here
  return (
    <>
      <div className="mx-1 flex flex-col items-center justify-center rounded-md bg-[#FFFFFF] p-[20px] shadow-md">
        <div className="flex">
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

          <div className="grid w-full grid-cols-2">
            <div className="">
              <h2 className="text-md font-bold">Current</h2>
              <span>{data.currentLocation}</span>
            </div>
            <div className="">
              <h2 className="text-md font-bold">Future</h2>
              <span>{data.futureLocation}</span>
            </div>
          </div>

          <div className="my-4">
            <h2 className="text-md font-bold">Mutual Connections</h2>
            <MutualConnections connections={data.mutualConnections} />
          </div>

          <div className="flex items-center space-x-5">
            <button className="rounded bg-blue-500 px-4 py-2 font-unbounded font-bold text-white">
              Connect
            </button>
            <SocialIcons platforms={data.platforms} />
          </div>
        </div>
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
      {/* {activeTab === "social" && <SocialFeed />} */}
      {activeTab === "social" && (
        <div className="mt-4 w-full">
          <SocialFeed
            header="Twitter"
            tweets={[
              {
                text: "Mock tweet 1",
                image: "https://source.unsplash.com/c/random/1",
              },
              {
                text: "Mock tweet 2",
                image: "https://source.unsplash.com/c/random/2",
              },
            ]}
          />
          <SocialFeed
            header="Bluesky"
            tweets={[
              {
                text: "Mock Bluesky tweet 1",
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
