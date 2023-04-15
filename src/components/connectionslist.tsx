import React, { useState } from "react";

interface ConnectionData {
  name: string;
  handle: string;
  avatar: string;
}

export const ConnectionsList = ({
  connections,
}: {
  connections: ConnectionData[];
}) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredConnections = connections.filter(
    ({ name, handle }) =>
      name.toLowerCase().includes(searchValue.toLowerCase()) ||
      handle.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="mt-5 flex w-full flex-col rounded-md bg-[#FFFFFF] p-[20px] shadow-md">
      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        className="mb-4 w-full rounded border-none bg-gray-100 p-2"
        placeholder="Search connections..."
      />
      <hr className="mb-4 border-gray-400" />

      <div className="w-[410px]">
        <h1 className="mb-1 font-unbounded text-lg font-bold">Pinned Tags</h1>
        <h4>Your frequently searched tags are pinned to the top.</h4>
        <div className="my-5 flex w-[410px] flex-row overflow-hidden overflow-x-scroll">
          <div className="mr-2 rounded-md border border-solid border-[#9747FF] bg-[#EAE0FF] px-2 py-1 text-[#9747FF]">
            <p>Hackathons</p>
          </div>
          <div className="mr-2 rounded-md border border-solid border-[#2489F4] bg-[#CCE5FF] px-2 py-1 text-[#2489F4]">
            <p>NFTs</p>
          </div>
          <div className="mr-2 rounded-md border border-solid border-[#E9AD13] bg-[#FFEEC2] px-2 py-1 text-[#E9AD13]">
            <p>Developer</p>
          </div>
          <div className="mr-2 rounded-md border border-solid border-[#3FA90D] bg-[#D4FFC0] px-2 py-1 text-[#3FA90D]">
            <p>Investor</p>
          </div>
          <div className="mr-2 rounded-md border border-solid border-[#9747FF] bg-[#EAE0FF] px-2 py-1 text-[#9747FF]">
            <p>Lisbon</p>
          </div>
          <div className="mr-2 rounded-md border border-solid border-[#2489F4] bg-[#CCE5FF] px-2 py-1 text-[#2489F4]">
            <p>DeFi</p>
          </div>
        </div>
      </div>

      <hr className="mb-4 border-gray-400" />
      <h1 className="mb-5 font-unbounded text-lg font-bold">
        {searchValue ? "Results" : "Recent Connections"}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {filteredConnections.map(({ name, handle, avatar }, index) => (
          <div key={index}>
            <img
              src={avatar}
              alt={name}
              className="mx-auto h-20 w-20 rounded-full border border-white"
            />
            <h2 className="mt-3 text-center font-unbounded text-lg">{name}</h2>
            <h4 className="text-center text-gray-700">{handle}</h4>
          </div>
        ))}
      </div>
      {/* second order connections wip */}
      {/* <hr className="mb-4 mt-5 border-gray-400" />
      <h1 className="mb-5 font-unbounded text-lg font-bold">
        Second-order connections
      </h1> */}
    </div>
  );
};
