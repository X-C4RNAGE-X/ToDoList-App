import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between bg-slate-900 text-white py-2'>
            <div className="logo">
              <span className='font-bold text-xl mx-8'>JustDoIt</span> 
            </div>
            <ul className="flex gap-10 mx-9">
                <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
                <li className='curser-pointer hover:font-bold transition-all duration-100'>Your Tasks</li>
            </ul>

        </nav>
    )
}

export default Navbar
