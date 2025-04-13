import { UserStateTypes } from "../types/userside";

export const getStoredAdmin = () => {
    try {
      const data = localStorage.getItem('admin');
      return data ? JSON.parse(data) as UserStateTypes : null;
    } catch {
      return null;
    }
  };
  