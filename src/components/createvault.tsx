import { useState } from "react";

import useProfileChainInfo from "~/hooks/useProfileChainInfo";

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

export function CreateVault() {
  const { loading, profileData } = useProfileChainInfo(
    "0x6dd1E0028eF0a634b01E13B2291949255610b38f"
  );
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
  });

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
    console.log(fields);
  };

  console.log(profileData);
  console.log(loading);
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
        <h1 className="mt-5 text-center font-unbounded text-xl">
          blockchain data will be here, toggleable (can choose not to include)
        </h1>
        <hr className="mt-[20px] h-[2px] rounded-sm bg-[#DDDDDD]" />
      </div>
      <button className="rounded bg-blue-500 px-20 py-2 font-unbounded font-bold text-white">
        Create Identity Vault
      </button>
    </div>
  );
}
