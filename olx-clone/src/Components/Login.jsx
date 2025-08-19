import guitar from "../assets/guita.png";
import google from "../assets/google.png";
import phone from "../assets/mobile.svg";
import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/Firebase";

function Login(props) {
  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Close the login popup after successful sign-in
      props?.setLoginPop(false);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      id="login-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-96 max-w-md p-6">
        <h1
          onClick={() => props?.setLoginPop(false)}
          className="text-3xl font-semibold cursor-pointer"
        >
          X
        </h1>
        <img src={guitar} alt="" className="w-20 h-20 ml-32" />
        <p className="text-sm font-medium text-base mt-5">
          Help us to become one of the safest places to buy and sell online in
          India. Please login to continue.
        </p>
        <div className="flex border-2 border-black p-2 rounded-md mt-12  cursor-pointer">
          <img src={phone} alt="" className="w-6 h-6" />
          <h1 className="font-semibold ml-12" cursor-pointer>
            Continue with Phone
          </h1>
        </div>
        <div
          onClick={googleSignIn}
          className="flex border-2 border-gray-300 p-2 rounded-md mt-12 cursor-pointer"
        >
          <img src={google} alt="" className="w-6 h-6" />
          <h1 className="font-semibold ml-12 cursor-pointer">
            Continue with Google
          </h1>
        </div>
        <h1 className="text-center mt-4">Or</h1>
        <h1 className="font-semibold text-center mt-4 underline cursor-pointer">
          Login with Email
        </h1>
        <h1 className=" text-center mt-4 text-xs">
          All your personal details are safe with us.
        </h1>
        <h1 className=" text-center mt-4 text-xs">
          If you continue, you are accepting OLX Terms and Conditions and
          Privacy Policy
        </h1>
      </div>
    </div>
  );
}

export default Login;
