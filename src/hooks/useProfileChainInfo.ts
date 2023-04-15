import { useEffect, useState } from "react";

const BASE_URL = "http://10.0.0.6:8080";

async function fetchProfileChainInfo(address: string) {
  const response = await fetch(`${BASE_URL}/profile/chaininfo/${address}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
}

function useProfileChainInfo(address: string) {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function getProfileData() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await fetchProfileChainInfo(address);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setProfileData(data);
      setLoading(false);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getProfileData();
  }, [address]);

  return { loading, profileData };
}

export default useProfileChainInfo;
