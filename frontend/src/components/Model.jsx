import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

function Model() {
  const [isOpen, setIsOpen] = useState(true); // Automatically opens the modal on page load

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <button
            onClick={closeModal}
            className=" top-3 right-3 text-gray-500 hover:text-gray-800"
          >
             
             <img src={assets.close} alt="closebutton" />
          </button>
          <div className="flex flex-col items-center">
      
            <img
              src={assets.aliMain}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
            />
            <h2 className="text-xl font-bold mt-4">Ali Qannan</h2>
            <p className="text-gray-600 mt-2 text-center">
             Full Stack Developer
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/AliQannan" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                <img  src={assets.github} alt='githubAccount'/>
              </a>
              <a  href="https://www.linkedin.com/in/ali-qannan-672633240/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                <img  src={assets.linkedin} alt='linkedinAccount'/>
              </a>
              <a href="https://x.com/ali_ganan62895" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                <img src={assets.twitter} alt="twitter Account" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Model;
