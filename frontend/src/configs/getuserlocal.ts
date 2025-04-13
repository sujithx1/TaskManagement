import { UserStateTypes } from "../types/userside";

// utils/getStoredUser.ts
export const getStoredUser = () => {
    try {
      const data = localStorage.getItem('user');
      return data ? JSON.parse(data) as UserStateTypes : null;
    } catch {
      return null;
    }
  };
  