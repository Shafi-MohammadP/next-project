import React, { useState } from "react";
import "./index.css"; // Import the CSS file
import LoginForms from "@/components/forms/LoginForms";

function Index() {
  const [name, setName] = useState("name");
  const [password, setPassword] = useState("password");

  return <LoginForms formName={name} formPassword={password} />;
}

export default Index;
