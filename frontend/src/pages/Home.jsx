import React from 'react'
import Header from '../components/Header'
import Specialitymenu from '../components/specialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

function Home() {
  return (
    <div>
      <Header/>
      <Specialitymenu />
      <TopDoctors/>
      <Banner/>
    </div>

  )
}

export default Home