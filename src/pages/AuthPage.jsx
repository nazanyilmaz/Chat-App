import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

const AuthPage = ({ setIsAuth }) => {
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data.user);

      setIsAuth(true);

      //kullanici bilgisini localstorede sakla
      localStorage.setItem("token", data.user.refreshToken);
    });
  };
  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Room</h1>
        <button onClick={handleClick}>
          <img src="/g-logo.png" />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
