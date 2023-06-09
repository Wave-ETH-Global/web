// web3
import { config, dom, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faCaretDown,
  faEnvelope,
  faHome,
  faSearch,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { type AppType } from "next/app";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { arbitrum, mainnet, polygon, polygonMumbai } from "wagmi/chains";

import { BottomNav } from "~/components/bottomNav";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const chains = [polygonMumbai];
const projectId = "YOUR_PROJECT_ID";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

// No auto CSS, preloaded
config.autoAddCss = false;

// esoteric wizardry to fix fontawesome nextjs hydration error
if (typeof window !== "undefined") {
  dom.watch();
}

// FontAwesome Library
library.add(
  faHome,
  faSearch,
  faShieldAlt,
  faBell,
  faEnvelope,
  faCaretDown,
  faTwitter,
  faGithub,
  faLinkedin
);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>

      <BottomNav />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default api.withTRPC(MyApp);
