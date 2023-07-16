import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

export default function useLogOut() {
  const router = useRouter();
  const resetHistory = () => {
    window.history.pushState(null, "", "/signin");
  };
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("You have been successfully logged out!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        resetHistory();
        router.push("/signin");
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  return handleLogout;
}
