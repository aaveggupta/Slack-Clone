import React from "react";
import "./SignIn.css";

import { auth, provider } from "../../Firebase/firebase-config";

const SignIn = () => {
  const signinWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((user) => console.log(user))
      .catch((error) => console.log(error));
  };

  return (
    <div className="signin">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
        alt="slack_logo"
        className="signin__logo"
      />
      <h3 className="signin__to">Sign In to</h3>
      <h2 className="signin__aaveghq">Aaveg's Headquarter</h2>
      <button onClick={signinWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default SignIn;
