import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-900 text-white py-2 px-4">
      {/* Logo */}
      <div className="logo">
        <span className="font-bold text-xl">(Do It Box) Daily Task</span> {/* removed invalid 'mx' */}
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6">
        <li className="cursor-pointer font-bold hover:text-gray-300 transition-all">Home</li>
        <li className="cursor-pointer font-bold hover:text-gray-300 transition-all">Your Task</li> {/* fixed missing quote issue */}
      </ul>

      {/* Heading */}
      
    </nav>
  )
}

export default Navbar;
