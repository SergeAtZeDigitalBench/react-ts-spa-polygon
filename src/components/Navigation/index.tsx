import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export const navLinks = [
  { id: 1, pathname: "/", title: "Home", exact: true },
  { id: 2, pathname: "/iframe_parent", title: "Iframe", exact: false },
  { id: 3, pathname: "/iframe_child", title: "Iframe nested", exact: false },
];

interface IProps {
  [x: string]: unknown;
}

const Navigation = ({}: IProps): JSX.Element | null => {
  const location = useLocation();
  if (location.pathname === navLinks[2].pathname) {
    return null;
  }
  return (
    <nav className="flex gap-2 justify-center items-center h-[50px] text-gray-700 font-bold">
      {navLinks.map(({ id, pathname, title, exact }) => (
        <NavLink
          key={id}
          to={pathname}
          exact={!!exact}
          activeClassName="text-orange-700"
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
