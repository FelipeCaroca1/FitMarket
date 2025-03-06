import { useContext } from "react";
import UserContext from "./UserContext";  

const useUser = () => {
  const { userProfile, getUserProfile, updateUserProfile, logoutUser, deleteAccount } = useContext(UserContext);
  return { userProfile, getUserProfile, updateUserProfile, logoutUser, deleteAccount };
};

export default useUser;