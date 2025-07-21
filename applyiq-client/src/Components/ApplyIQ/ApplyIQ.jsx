import React from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router";
const ApplyIQ = () => {
  return (
    <Link className="flex items-center" to={"/"}>
      <img src={Logo} className="w-10 h-10 mr-2" alt="Employee Flow Logo" />
      <h3 className="hidden md:block text-lg font-bold text-primary">
        Apply IQ
      </h3>
    </Link>
  );
};

export default ApplyIQ;
