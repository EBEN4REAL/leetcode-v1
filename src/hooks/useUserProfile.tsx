import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";

function useUserProfile() {
  const [user] = useAuthState(auth);
  const userId = auth?.currentUser?.uid;
  const storage = getStorage();
  const storageRef = ref(storage, `profilePictures/${userId}/${user?.email}`);
  const [userPic, setUserPic] = useState<string>(
    "https://placehold.co/800x800"
  );
  const [loading, setUserPicLoading] = useState<boolean>(false);
  const [updatePic, setUpdatePic] = useState<boolean>(false);
  const [updateProfile, updating, error] = useUpdateProfile(auth);

  const getPic = () => {
    setUserPicLoading(true);
    getDownloadURL(storageRef)
      .then((downloadURL) => {
        setUserPic(downloadURL);
        setUserPicLoading(false);
      })
      .catch((error) => {
        setUserPicLoading(false);
      });
  };

  const updateUser = async () => {
    const success = await updateProfile({ displayName: "E.B.E.N" });
    if (success) {
    }
  };

  async function getPicFunc() {
    try {
      await getPic();
      setUpdatePic(false);
    } catch (e) {}
  }

  useEffect(() => {
    async function loadDp() {
      if (userId && user) {
        getPicFunc();
      }
    }
    loadDp();
    if (!user?.displayName) {
      updateUser();
    }
  }, [userId, user]);

  useEffect(() => {
    if (updatePic) {
      getPicFunc();
    }
  }, [updatePic]);

  return {
    userPic,
    loading,
    setUpdatePic,
    setUserPic
  };
}

export default useUserProfile;


