import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  //kullanicinin sectigi odanin stati
  const [room, setRoom] = useState("");
  //kullanicinin yetkisi varmi stati
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  //giris yetkisi yoksa giris yap sayfasini gorur
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
    //giris yetkisi varsa oda secme sayfasini gorur
  }
  return (
    <div className="container">
      {!room ? (
        //kullanici oda sectiyse
        <RoomPage setRoom={setRoom} setIsAuth={setIsAuth} />
      ) : (
        //kullanici oda secmediyse
        <ChatPage room={room} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
