import React from "react";

const LoginForms = (props) => {
  return (
    <div>
      <p>parent name {props.formName}</p>
      <p>parent password{props.formPassword} </p>
    </div>
  );
};

export default LoginForms;
