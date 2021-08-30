import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";

export const preguntarPermisos = async (app) => {
  try {
    const messaging = getMessaging();

    //await messaging.requestPermission();
    await Notification.requestPermission().then(async (permission) => {
      if (permission === "denied") {
        console.log("Permission wasn't granted. Allow a retry.");
        return;
      } else if (permission === "default") {
        console.log("The permission request was dismissed.");
        return;
      }
      const token = await getToken(messaging);
      let user = localStorage.getItem("username");
      if (token && user) {
        axios
          .post("http://hashkings.xyz/registerusernotifications", {
            user,
            token,
          })
          .then(async (response) => {
            console.log(response.data);
            return response.data;
          });
      }

      return token;
    });
  } catch (error) {
    console.error(error);
  }
};
