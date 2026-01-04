import { NavLink } from "react-router-dom";

const NavItem = ({ to, label, activeColor = "blue" }) => {
  const activeClasses = {
    blue: "border-blue-500 text-blue-500 font-medium",
    green: "border-green-500 text-green-500 font-medium",
    red: "border-red-500 text-red-500 font-medium",
    yellow: "border-yellow-500 text-yellow-500 font-medium",
  };

  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <span
          className={` inline-flex text-lg items-center transition-all duration-300 border-b-2 ${
            isActive ? activeClasses[activeColor] : "border-transparent"
          }`}
        >
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default NavItem;
