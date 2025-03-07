import { useContext } from "react";
import UserContext from "../context/UserContext";  

const useUser = () => {
  const { userProfile, getUserProfile, updateUserProfile } = useContext(UserContext);
  return { userProfile, getUserProfile, updateUserProfile };
};

export default useUser;
