import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDApAl06KfiQSJn0x0jMxI2BtMqmwm2_kM",
  authDomain: "project-loom-6a5af.firebaseapp.com",
  projectId: "project-loom-6a5af",
  storageBucket: "project-loom-6a5af.appspot.com",
  messagingSenderId: "566650328032",
  appId: "1:566650328032:web:6866c190f5b0e0009fd185",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
