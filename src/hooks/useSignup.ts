import axios from "axios";
import { useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const BASE_URL = "http://10.0.0.6:8080";

export const useSignup = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { config } = usePrepareContractWrite({
    address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
    abi: [
      {
        name: "mint",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          {
            internalType: "string",
            name: "userHandle",
            type: "string",
          },
          {
            internalType: "string",
            name: "uuid",
            type: "string",
          },
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
        ],
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
      },
    ],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading: isContractLoading, isSuccess: isContractSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  const createProfile = async (profileData) => {
    setLoading(true);
    try {
      // step 1
      const response = await axios.post(`${BASE_URL}/signup`, profileData);
      const UUID = response.data.uuid;
      const oneTimeToken = response.data.one_time_token;
      console.log("Successfully claimed user handle! ❤️");

      // step 2 leggo
      write({ userHandle: profileData.handle, UUID, tokenURI: 1 });

      // step 3 - verify it's working.
      const tokenResponse = await axios.post(`${BASE_URL}/signup/completed`, {
        UUID,
      });

      setLoading(false);

      return {
        token: tokenResponse.data.token,
        success: tokenResponse.status === 200,
      };
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    createProfile,
    isLoading,
    error,
  };
};
