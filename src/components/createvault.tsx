import { Web3Button, useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import useProfileChainInfo from "~/hooks/useProfileChainInfo";
import { useSignup } from "~/hooks/useSignUp";

const userFields = [
  { key: "name", placeholder: "Name", required: true },
  { key: "handle", placeholder: "Handle", required: true },
  { key: "ens", placeholder: "ENS" },
  { key: "title", placeholder: "Title" },
  { key: "bio", placeholder: "Bio" },
  { key: "currentLocation", placeholder: "Current Location" },
  { key: "futureLocation", placeholder: "Future Location" },
  { key: "avatar", placeholder: "Avatar" },
];

const mockBlockchainData = [
  {
    chainId: "1",
    token: { name: "!fundrop", symbol: "FUNPASS" },
    tokenAddress: "0x0000000000664ceffed39244a8312bd895470803",
    tokenId: "5922",
    tokenType: "ERC721",
  },
  {
    chainId: "1",
    token: { name: "Allstarz PSX", symbol: "PSX" },
    tokenAddress: "0x6120991c423f3566753d3c6c91a5b50d7d2461b4",
    tokenId: "302",
    tokenType: "ERC721",
  },
  {
    chainId: "1",
    token: { name: "FWB", symbol: "FWB" },
    tokenAddress: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
    tokenType: "ERC20",
  },
  {
    chainId: "1",
    token: { name: "Nouns DAO", symbol: "Nouns" },
    tokenAddress: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
    tokenType: "ERC721",
  },
  {
    chainId: "1",
    token: { name: "CryptoPunk", symbol: "CrypPunk" },
    tokenAddress: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
    tokenType: "ERC721",
  },
];

const RenderTokens = ({ tokens, tokenNames }) => {
  const matchedTokens = tokens.filter((token) =>
    tokenNames.some(
      (tokenNameToMatch) =>
        tokenNameToMatch.name === token.token.name &&
        tokenNameToMatch.address === token.tokenAddress
    )
  );

  return (
    <div className="ml-5">
      {matchedTokens.map((token, index) => (
        <label className="block" key={index}>
          {token.token.name}
        </label>
      ))}
    </div>
  );
};

const tokensToRender = [
  {
    name: "!fundrop",
    address: "0x0000000000664ceffed39244a8312bd895470803",
  },
  {
    name: "FWB",
    address: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
  },
  {
    name: "Nouns DAO",
    address: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
  },
  {
    name: "CryptoPunk",
    address: "0x6120991c423f3566753d3c6c91a5b50d7d2461b3",
  },
];

export function CreateVault() {
  const { loading, profileData } = useProfileChainInfo(
    "0x6dd1E0028eF0a634b01E13B2291949255610b38f"
  );
  const { address, isConnected } = useAccount();
  const [buttonText, setButtonText] = useState("Connect Wallet");

  useEffect(() => {
    if (isConnected) {
      setButtonText("Create Identity Vault");
    } else {
      setButtonText("Connect Wallet to Create Vault");
    }
  }, [isConnected]);
  const [fields, setFields] = useState({
    name: "",
    handle: "",
    // prefill with ENS from address if possible
    ens: "",
    title: "",
    bio: "",
    currentLocation: "",
    futureLocation: "",
    avatar: "",
    twitter: "",
    github: "",
    linkedin: "",
  });

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
    console.log(fields);
  };

  return (
    <div className="mx-1 flex flex-col items-center justify-center rounded-md bg-[#FFFFFF] p-[20px] shadow-md">
      <div className="w-full p-4">
        <div className="space-y-4">
          {userFields.map(({ key, placeholder, required }) => (
            <input
              type="text"
              key={key}
              name={key}
              value={fields[key]}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              className="w-full rounded border border-gray-300 p-2"
            />
          ))}
        </div>
        <hr className="mt-[20px] h-[2px] rounded-sm bg-[#DDDDDD]" />
        {/* chain info div */}
        <h1 className="my-5 text-center font-unbounded text-xl">
          Blockchain Data from Wallet
        </h1>
        <RenderTokens tokens={mockBlockchainData} tokenNames={tokensToRender} />
        <hr className="mt-[20px] h-[2px] rounded-sm bg-[#DDDDDD]" />
      </div>
      <Web3Button />
      <button
        className="mb-5 mt-5 rounded bg-blue-500 px-20 py-2 font-unbounded font-bold text-white"
        onClick={() => handleSubmit()}
      >
        {buttonText}
      </button>
    </div>
  );
}
