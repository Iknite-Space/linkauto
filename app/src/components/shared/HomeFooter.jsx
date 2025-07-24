import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarker, FaEnvelope, FaPhone, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const HomeFooter = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-6 mx-auto max-w-7xl">
        {/* Top 4 Columns */}
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-700 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Company Info */}
            <div className="col-span-2 md:col-span-1">
                <h4 className="mb-3 text-lg font-bold text-black">LinkAuto</h4>
                <p className="mb-2">Reliable and affordable car rental services across Cameroon.</p>
                <p className="flex items-center gap-2 mb-1"><span className="font-bold text-primary"><FaMapMarker /></span> Check-Point, Molyko<br /> Buea, Cameroon</p>
                <p className="flex items-center gap-2 mb-1"><span className="font-bold text-red"><FaEnvelope /></span> contact@linkauto.xyz</p>
                <p className="flex items-center gap-2 mb-1"><span className="font-bold text-accent"><FaPhone /></span> +237 6XX XXX XXX</p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h4 className="mb-3 text-lg font-semibold text-black">Quick Links</h4>
                <div className="flex flex-col space-y-2">
                    <Link className='hover:underline' to="/about">About Us</Link>
                    <Link className='hover:underline' to="/contact">Contact Us</Link>
                    <Link className='hover:underline' to="/faq">FAQ</Link>
                </div>
            </div>

            {/* Column 3: Services */}
            <div>
                <h4 className="mb-3 text-lg font-semibold text-black">Working Hours</h4>
                <div className="space-y-2">
                    <p>Mon - Fri: <span className='font-bold text-black'>09:00AM - 09:00PM</span></p>
                    <p>Sat: <span className='font-bold text-black'>09:00AM - 07:00PM</span></p>
                    <p>Sun: <span className='font-bold text-black'>Closed</span></p>
                </div>
            </div>

            {/* Column 4: Follow Us */}
            <div className='col-span-2 md:col-span-1'>
                <h4 className="mb-3 text-lg font-semibold text-black">Stay Updated</h4>
                <p className="mb-2">Subscribe to get the latest offers and updates.</p>
                <form className="flex flex-col gap-3">
                    <input type="email" placeholder="Enter your email" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
                    <button className="py-2 text-white transition rounded-md bg-primary hover:bg-opacity-90">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>


        {/* Divider */}
        <hr />

        {/* Bottom Row */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p>
            &copy; {new Date().getFullYear() } <span className="font-bold"><Link to="/">LinkAuto.</Link></span> All Rights Reserved
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebook size={20} /></a>
            <a href="#" className="text-pink-500 hover:text-pink-700"><FaInstagram size={20} /></a>
            <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter size={20} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
