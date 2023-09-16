import React, { useState } from "react";
import Output from "./Output";
const Greeting = () => {
  const [changeText, setChangeText] = useState(false);

  const ChangeTextHandler = () => {
    setChangeText(!changeText);
  };
  return (
    <div>
      <p>Greeting</p>
      {!changeText && <Output>this is for testing </Output>}
      {changeText && <Output>Greeting changed</Output>}
      <button onClick={ChangeTextHandler}>Change Text !</button>
    </div>
  );
};
export default Greeting;