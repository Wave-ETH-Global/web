import { type NextPage } from "next";
import Head from "next/head";

import { ViewProfile } from "~/components/viewProfile";

const OtherProfile: NextPage = () => {
  return (
    <>
      <Head>
        {/* <Web3Button /> */}
        <title>Wave Protocol</title>
        <meta name="description" content="Social Tooling" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-[#DDDDDD]">
        <main className="mx-auto flex w-full max-w-md">
          <h1>test</h1>
        </main>
      </div>
    </>
  );
};

export default OtherProfile;
