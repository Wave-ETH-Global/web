import axios from "axios";
import { useState } from "react";

const BASE_URL = "http://10.0.0.6:8080";

export const useSignup = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProfile = async (profileData) => {
    setLoading(true);
    try {
      // step 1
      const response = await axios.post(`${BASE_URL}/signup`, profileData);

      // step 2 here - claim handle!
      // ! Placeholder
      const UUID = response.data.UUID;

      console.log("Successfully claimed user handle! ❤️");

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
