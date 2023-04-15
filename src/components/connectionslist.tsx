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
    <div className="mx-1 mt-5 flex w-full max-w-md flex-col items-center justify-center rounded-md bg-[#FFFFFF] p-[20px] shadow-md">
      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        className="mb-4 w-full rounded border-none bg-gray-100 p-2"
        placeholder="Search connections..."
      />
      <hr className="mb-4 border-gray-400" />
      <div className="grid grid-cols-3 gap-6">
        {filteredConnections.map(({ name, handle, avatar }, index) => (
          <div key={index}>
            <img
              src={avatar}
              alt={name}
              className="mx-auto h-20 w-20 rounded-full border border-white"
            />
            <h2 className="mt-3 text-center text-xl font-bold text-blue-600">
              {name}
            </h2>
            <h4 className="text-center text-gray-700">{handle}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
