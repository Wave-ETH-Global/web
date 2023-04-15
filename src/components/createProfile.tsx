import React, { useState } from "react";

// const Tile = ({ label, onClick, selected }) => (
//   <div
//     onClick={onClick}
//     className={`cursor-pointer bg-blue-500 ${
//       selected ? "opacity-75" : ""
//     } m-1 max-w-[350px] rounded-md px-4 py-2 font-bold text-white`}
//   >
//     {label}
//   </div>
// );

const Tile = ({ label, onClick, selected, isAvatar }) => (
  <div
    onClick={onClick}
    className={`flex 
    cursor-pointer items-center justify-center ${
      isAvatar ? "bg-transparent" : "bg-blue-500"
    } ${selected ? "opacity-75" : ""}
      m-1 rounded-md px-4 py-2 font-bold text-white shadow-lg`}
  >
    {isAvatar ? (
      <img
        src={label}
        alt="Profile Avatar"
        className="h-16 w-16 rounded-full border-0 object-cover"
      />
    ) : (
      label
    )}
  </div>
);

export const CreateProfile = ({ vaultData, onSubmitProfile }) => {
  const [selectedEntries, setSelectedEntries] = useState(new Set());

  const handleTileClick = (item) => {
    const newSelectedEntries = new Set(selectedEntries);
    if (selectedEntries.has(item)) {
      newSelectedEntries.delete(item);
    } else {
      newSelectedEntries.add(item);
    }
    setSelectedEntries(newSelectedEntries);
  };

  const handleSubmit = () => {
    const profileData = Array.from(selectedEntries);
    onSubmitProfile(profileData);
  };

  return (
    <div
      className="flex w-full max-w-md flex-col
    items-center justify-center rounded-md bg-[#FFFFFF] p-[20px] shadow-md"
    >
      <div className="w-full p-4">
        <h1 className="my-5 text-center font-unbounded text-xl">Vault</h1>
        <p className="mb-4 text-center">Click each value to add to profile</p>
        <div className="flex flex-wrap justify-center">
          {/* {Object.entries(vaultData).map(([key, value]) => (
            <Tile
              key={key}
              label={value}
              selected={selectedEntries.has(value)}
              onClick={() => handleTileClick(value)}
            />
          ))} */}
          {Object.entries(vaultData).map(([key, value]) => (
            <Tile
              key={key}
              label={value}
              selected={selectedEntries.has(value)}
              onClick={() => handleTileClick(value)}
              isAvatar={key === "avatar"}
            />
          ))}
        </div>
        <hr className="mt-4 h-[2px] rounded-sm bg-[#DDDDDD]" />
      </div>
      {selectedEntries.size > 0 && (
        <>
          <h1 className="my-5 text-center font-unbounded text-xl">
            Profile Creation
          </h1>
          <p className="mb-4 text-center">
            Click to remove from profile creation
          </p>
        </>
      )}
      <div className="selected-data mb-4 flex flex-wrap justify-center">
        {Array.from(selectedEntries).map((value) => (
          <Tile
            key={value}
            label={value}
            selected={true}
            onClick={() => handleTileClick(value)}
          />
        ))}
      </div>
      <button
        className="mb-5 mt-5 rounded bg-blue-500 px-20 py-2 font-unbounded
        font-bold text-white"
        onClick={handleSubmit}
        disabled={selectedEntries.size < 1}
      >
        {selectedEntries.size > 0 ? "Create Profile" : "Add items to Create"}
      </button>
    </div>
  );
};
