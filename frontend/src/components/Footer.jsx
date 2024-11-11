import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <footer className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {
          //  ---- left section
        }
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leadin-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum odit
            molestias minima omnis commodi aliquid incidunt cum nostrum animi
            quaerat nam magni velit, non eius. Natus doloribus cum animi culpa!
          </p>
        </div>
        {
          //  ----- cetner section
        }
        <div>
          <p className="tet-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li> Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        {
          //  ---- right section
        }
        <div>
          <p className="tet-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>
      {/*  ---- Copyright Text */}
      <div>
        <hr />
        <p className="text-center  py-5">
          Copyright &copy; 2024 Prescripto - All Right Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
