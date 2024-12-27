import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-[#1a1464] text-white p-4">
      <div className="flex gap-6 container mx-auto px-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => `
            text-white no-underline hover:opacity-80 transition-opacity
            ${isActive ? 'font-bold' : 'font-normal'}
          `}
        >
          Home
        </NavLink>
        <NavLink 
          to="/SavedCandidates" 
          className={({ isActive }) => `
            text-white no-underline hover:opacity-80 transition-opacity
            ${isActive ? 'font-bold' : 'font-normal'}
          `}
        >
          Potential Candidates
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;