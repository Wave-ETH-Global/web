import React, { useState } from "react";

type FeedProps = {
  text: string;
  image?: string;
};

interface SocialFeedProps {
  header: string;
  tweets: FeedProps[];
}

// stani.lens
export const SocialFeed: React.FC<SocialFeedProps> = ({ header, tweets }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="lex mx-1 mb-5 flex-col rounded-md bg-[#FFFFFF] p-[20px] shadow-md">
      <div className="flex items-center justify-between bg-white px-4 py-2">
        <h3 className="font-bold">{header}</h3>
        <button
          className={`transform transition-transform duration-300 ${
            isVisible ? "rotate-180" : ""
          }`}
          onClick={() => setIsVisible((prevState) => !prevState)}
        >
          <i className="fas fa-caret-down"></i>
        </button>
      </div>

      {isVisible && (
        <div className="h-[400px] select-none space-y-4 overflow-y-scroll px-4 py-2">
          {tweets.map((tweet, index) => (
            <div
              key={index}
              className="h-auto rounded-md bg-[#F5F5F5] pb-6 pl-4 pt-4"
            >
              <p>{tweet.text}</p>
              {tweet.image && (
                <img
                  src={tweet.image}
                  alt={`Social Feed Image ${index}`}
                  className="my-2 h-auto w-full max-w-[450px] rounded-sm object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
