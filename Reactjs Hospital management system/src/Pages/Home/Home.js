import React, { useState } from "react";
import Comp1 from "../Comp1/Comp1";
import Comp10 from "../Comp10/Comp10";
import Comp11 from "../Comp11/Comp11";
import Comp2 from "../Comp2/Comp2";
import Comp3 from "../Comp3/Comp3";
import Comp4 from "../Comp4/Comp4";
import Comp5 from "../Comp5/Comp5";
import Comp6 from "../Comp6/Comp6";
import Comp7 from "../Comp7/Comp7";
import Comp8 from "../Comp8/Comp8";
import Comp9 from "../Comp9/Comp9";

import "./Home.css";

const Home = () => {
  const [tab, setTab] = useState(1,2,3,4,5,6,7,8,9,10,11);

  const [title, setTitle] = useState("");
  const handleTabSwitch = (tab, name) => {
    setTab(tab);
    setTitle(name);
  };
  return (

    <div>
      <div className="container">
      <h1 className="custom-title">{"Hospital Management System"}</h1>
    </div>
      <div>

        <button className="my-button" onClick={() => handleTabSwitch(1, "Trust")}>Trust Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(2, "Organization")}>Organization Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(3, "Hospital")}>Hospital Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(4, "TrustOrganization")}>TrustOrganization Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(5, "UserProfile")}>UserProfile Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(6, "Address")}>Address Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(7, "PatientProfile")}>PatientProfile Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(8, "AdmissionLog")}>AdmissionLog Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(9, "ClinicianProfile")}>ClinicianProfile Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(10, "Role")}>Role Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(11, "UserRole")}>UserRole Details</button>


        <div className="centered-content">
          <div><h1 >{title}</h1> </div>
      
  
      {tab === 1 && <Comp1 />}
      {tab === 2 && <Comp2 />}
      {tab === 3 && <Comp3 />}
      {tab === 4 && <Comp4 />}
      {tab === 5 && <Comp5 />}
      {tab === 6 && <Comp6 />}
      {tab === 7 && <Comp7 />}
      {tab === 8 && <Comp8 />}
      {tab === 9 && <Comp9 />}
      {tab === 10 && <Comp10 />}
      {tab === 11 && <Comp11 />}

      </div>
    </div>
    </div>
  );
};

export default Home;











