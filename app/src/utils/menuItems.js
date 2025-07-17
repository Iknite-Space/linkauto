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
          label: "Verifications",
          icon: <FiTruck />,
          visible: ["admin", "owner"],
          children: [
            {
              label: "users",
              icon: <FiList />,
              href: "/dashboard/user-verification",
              visible: ["admin"],
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
  