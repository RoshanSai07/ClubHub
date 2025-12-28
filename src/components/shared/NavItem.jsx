import { NavLink } from "react-router-dom";

const NavItem = ({ to, label, activeColor = "blue" }) => {
  const activeClasses = {
    blue: "border-blue-500 text-blue-500",
    green: "border-green-500 text-green-500",
    red: "border-red-500 text-red-500",
  };

  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <span
          className={` inline-flex text-xl items-center transition-all duration-300 border-b-2 ${
            isActive
              ? activeClasses[activeColor]
              : "border-transparent"
          }`}
        >
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default NavItem;
