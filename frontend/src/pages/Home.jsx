import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/Specialitymenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import Model from '../components/Model';

function Home() {
  return (
    <div>
      <Model/>
      <Header/>
      <SpecialityMenu />
      <TopDoctors/>
      <Banner/>
    </div>
      
   

  )
}

export default Home ;