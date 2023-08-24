import React, { useState } from "react";
import Address from "../Address/Address";
import AdmissionLog from "../AdmissionLog/AdmissionLog";
import ClinicianProfile from "../ClinicianProfile/ClinicianProfile";
import DigitalTherapy from "../DigitalTherapy/DigitalTherapy";
import Hospital from "../Hospital/Hospital";
import HospitalTherapy from "../HospitalTherapy/HospitalTherapy";
import Organization from "../Organization/Organization";
import PatientPrescription from "../PatientPrescription/PatientPrescription";
import PatientProfile from "../PatientProfile/PatientProfile";
import PrescriptionHistory from "../PrescriptionHistory/PrescriptionHistory";
import Product from "../Product/Product";
import Role from "../Role/Role";
import Trust from "../Trust/Trust";
import TrustOrganization from "../TrustOrganization/TrustOrganization";
import UserProfile from "../UserProfile/UserProfile";
import UserRole from "../UserRole/UserRole";

import "./Home.css";


const Home = () => {
  const [tab, setTab] = useState(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);

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
        <button className="my-button" onClick={() => handleTabSwitch(2, "Hospital")}>Hospital Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(3, "Organization")}>Organization Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(4, "TrustOrganization")}>TrustOrganization Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(5, "UserProfile")}>UserProfile Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(6, "Address")}>Address Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(7, "PatientProfile")}>PatientProfile Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(8, "AdmissionLog")}>AdmissionLog Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(9, "ClinicianProfile")}>ClinicianProfile Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(10, "Role")}>Role Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(11, "UserRole")}>UserRole Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(12, "Product")}>Product Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(13, "DigitalTherapy")}>Digital Therapy Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(14, "HospitalTherapy")}>Hospital Therapy Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(15, "PatientPrescription")}>PatientPrescription Details</button>
        <button className="my-button" onClick={() => handleTabSwitch(16, "PrescriptionHistory")}>PrescriptionHistory Details</button>

        <div className="centered-content">
          <div><h1 >{title}</h1> </div>
      
      {tab === 1 && <Trust />}
      {tab === 2 && <Hospital />}
      {tab === 3 && <Organization />}
      {tab === 4 && <TrustOrganization />}
      {tab === 5 && <UserProfile />}
      {tab === 6 && <Address />}
      {tab === 7 && <PatientProfile />}
      {tab === 8 && <AdmissionLog />}
      {tab === 9 && <ClinicianProfile />}
      {tab === 10 && <Role />}
      {tab === 11 && <UserRole />}
      {tab === 12 && <Product />}
      {tab === 13 && <DigitalTherapy />}
      {tab === 14 && <HospitalTherapy />}
      {tab === 15 && <PatientPrescription />}
      {tab === 16 && <PrescriptionHistory />}

      </div>
    </div>
    </div>
  );
};

export default Home;











