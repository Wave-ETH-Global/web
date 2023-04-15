import React, { useState } from "react";

export function SignIn() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCreateVault = () => {
    // Handle Create Vault logic here
    console.log("Create Vault:", inputValue);
  };

  return (
    <div className="mx-1 flex flex-col items-center justify-center rounded-md bg-[#FFFFFF] p-[20px] shadow-md">
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="w-full p-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter address or ENS"
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <button
            onClick={handleCreateVault}
            className="w-full rounded bg-blue-500 py-2 font-unbounded font-bold text-white"
          >
            Show My Vault
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
