// Filename: useSignin.ts
import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://10.0.0.6:8080";

interface RequestTokenResult {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    nonce: string;
    expiresAt: string;
  } | null;
}

const requestToken = async (
  wallet_address: string,
  signature: string,
  nonce: string
): Promise<RequestTokenResult> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/token`,
      {
        wallet_address,
        signature,
        nonce,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      statusCode: response.status,
      message: response.statusText,
      data: response.data,
    };
  } catch (error) {
    console.error("Error requesting token:", error);
    return {
      statusCode: error.response.status,
      message: error.response.statusText,
      data: null,
    };
  }
};

export const useSignin = ([object Object]) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (wallet_address: string, signature: string, nonce: string) => {
    setLoading(true);
    try {
      const result = await requestToken(wallet_address, signature, nonce);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    signIn,
    isLoading,
    error,
  };
};