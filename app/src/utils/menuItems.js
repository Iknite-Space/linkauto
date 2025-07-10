// utils/menuItems.js
import {
    FiHome,
    FiUsers,
    FiSettings,
    FiLogOut,
    FiTruck,
    FiPlusSquare,
    FiList,
    FiBookOpen,
    FiChevronDown,
    FiChevronRight,
    FiUser,
    FiClipboard,
  } from "react-icons/fi";
  
  export const menuItems = [
    {
      title: "MANAGEMENT",
      items: [
        {
          label: "Dashboard",
          icon: <FiHome />,
          href: "/dashboard",
          visible: ["admin", "owner", "customer"],
        },
        {
          label: "Fleet",
          icon: <FiTruck />,
          visible: ["admin", "owner"],
          children: [
            {
              label: "All Cars",
              icon: <FiList />,
              href: "dashboard/fleet/cars",
              visible: ["admin", "owner"],
            },
            {
              label: "Add Car",
              icon: <FiPlusSquare />,
              href: "dashboard/fleet/add",
              visible: ["owner"],
            },
            {
              label: "Categories",
              icon: <FiClipboard />,
              href: "dashboard/fleet/categories",
              visible: ["admin"],
            },
          ],
        },
        {
          label: "Bookings",
          icon: <FiBookOpen />,
          href: "dashboard/bookings",
          visible: ["admin", "owner", "customer"],
        },
        {
          label: "Users",
          icon: <FiUsers />,
          href: "dashboard/users",
          visible: ["admin"],
        },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        {
          label: "Profile",
          icon: <FiUser />,
          href: "dashboard/profile",
          visible: ["admin", "owner", "customer"],
        },
        {
          label: "Logout",
          icon: <FiLogOut />,
          href: "dashboard/logout",
          visible: ["admin", "owner", "customer"],
        },
      ],
    },
  ];
  