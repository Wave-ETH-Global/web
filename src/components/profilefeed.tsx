import React, { useState } from "react";

function InfoCard({ header, tokens }: { header: string; tokens: string[] }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="mx-1 mb-5 rounded-md bg-[#FFFFFF] p-[20px] shadow-md">
      <div className="flex items-center justify-between bg-white px-4 py-2">
        <h3 className="font-bold">{header}</h3>
        <button
          className={`transform transition-transform duration-300 ${
            isVisible ? "rotate-180" : ""
          }`}
          onClick={() => setIsVisible((prevState) => !prevState)}
        >
          <i className="fas fa-caret-down" />
        </button>
      </div>

      {isVisible && (
        <div className="flex w-full select-none flex-col items-center overflow-hidden overflow-x-scroll px-4 py-2">
          {tokens.map((token, index) => (
            <div
              key={index}
              className={`align-center mx-1 my-1 justify-center rounded-md ${
                index > 0 ? "ml-1" : ""
              } draggable inline-block h-[140px] w-[185px] cursor-grab bg-black px-4 py-2 text-center text-white`}
            >
              <h1 className="my-auto self-center break-words font-unbounded text-3xl">
                {token}
              </h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProfileFeed() {
  return (
    <div className="mt-4 w-full">
      <InfoCard header="DAOs" tokens={["Boys Club", "FWB", "Nouns DAO"]} />
      <InfoCard
        header="Verifiable Credentials"
        // ! important: disco.xyz integration in the future for this
        tokens={["Credential1", "Credential2", "Credential3"]}
      />
      <InfoCard
        header="NFTs"
        tokens={["Crypto Coven", "CryptoPunk", "Azuki"]}
      />
    </div>
  );
}
