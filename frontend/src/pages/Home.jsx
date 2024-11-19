import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/Specialitymenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import Model from "../components/Model";
import { useContext } from "react";
import { AppContext } from "../context/Context";

function Home() {
  const { token } = useContext(AppContext);
  return (
    <div>
      {
        // If user is authenticated, don't show the Model component.
        token ? null : <Model /> 
      }
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
}

export default Home;
