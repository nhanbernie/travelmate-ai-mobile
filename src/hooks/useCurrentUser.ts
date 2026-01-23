import { useState, useEffect } from "react";
import { useGetUserByIdQuery } from "@/services/auth";
import { SecureStorageService } from "@/services/storage/secureStorage.service";

export const useCurrentUser = () => {
  const [userId, setUserId] = useState<string | null>(null);

  // Get userId from SecureStorage
  useEffect(() => {
    const getUserId = async () => {
      const userData = await SecureStorageService.getUserData();
      if (userData?.id) {
        setUserId(userData.id);
      }
    };
    getUserId();
  }, []);

  // Fetch user data by ID - auto-cached by RTK Query
  const {
    data: response,
    isLoading,
    error,
  } = useGetUserByIdQuery(userId!, {
    skip: !userId, // Skip query if no userId
  });

  return {
    user: response?.data,
    isLoading,
    error,
    userId,
  };
};
