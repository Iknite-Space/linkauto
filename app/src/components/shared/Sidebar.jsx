// components/Sidebar/Menu.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { menuItems } from "../../utils/menuItems";
import { useUser } from "../../hooks/UseAuth";

const Menu = () => {
  const { currentUser } = useUser();
  const role = currentUser?.role; 



  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  if (currentUser.status === "pending" && currentUser.role !== "admin") {
    return null;
  }

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div key={section.title} className="mb-6">
          <span className="px-3 mb-2 text-xs font-semibold text-gray-400">
            {section.title}
          </span>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => {
              if (!item.visible.includes(role)) return null;

              const hasChildren = Array.isArray(item.children);

              return (
                <div key={item.label}>
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className="flex items-center justify-between w-full px-3 py-2 text-gray-600 transition rounded-md hover:bg-blue-100"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        <span>
                          {openSubmenus[item.label] ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </span>
                      </button>

                      {openSubmenus[item.label] && (
                        <div className="flex flex-col gap-1 mt-1 ml-8">
                          {item.children.map(
                            (subItem) =>
                              subItem.visible.includes(role) && (
                                <NavLink
                                  to={subItem.href}
                                  key={subItem.label}
                                  className={({ isActive }) =>
                                    `flex items-center gap-2 px-2 py-1 rounded-md text-sm transition ${
                                      isActive
                                        ? "text-blue-600 font-medium"
                                        : "text-gray-500 hover:text-primary"
                                    }`
                                  }
                                >
                                  {subItem.icon}
                                  <span>{subItem.label}</span>
                                </NavLink>
                              )
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-blue-100"
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
