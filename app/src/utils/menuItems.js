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
            {
              label: "Document Verification",
              icon: <FiClipboard />,
              href: "/dashboard/ver-document-input",
              visible: ["admin"],
            },
          ],
        },
        {
          label: "Bookings",
          icon: <FiBookOpen />,
          href: "/dashboard/upload",
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
          href: "/dashboard/logout",
          visible: ["admin", "owner", "customer"],
        },
      ],
    },
  ];

  export const cars = [
  {
    id: 1,
    name: "Toyota Corolla",
    image: "/assets/filthy.png",
    pricePerDay: 45,
    brand: "Toyota",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
  },
  {
    id: 2,
    name: "Honda Civic",
    image: "/assets/luxury.webp",
    pricePerDay: 50,
    brand: "Honda",
    transmission: "Manual",
    energy_type: "Diesel",
    no_seats: "5",
    
  },
  {
    id: 3,
    name: "Ford Focus",
    image: "/assets/luxurylaunches.jpg",
    pricePerDay: 48,
    brand: "Ford",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  {
    id: 4,
    name: "Chevrolet Malibu",
    image: "/assets/face.jpeg",
    pricePerDay: 55,
    brand: "Chevrolet",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  {
    id: 5,
    name: "Hyundai Elantra",
    image: "/assets/faq.png",
    pricePerDay: 47,
    brand: "Hyundai",
    transmission: "Manual",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  {
    id: 6,
    name: "Nissan Altima",
    image: "/assets/car2.png",
    pricePerDay: 52,
    brand: "Nissan",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  {
    id: 7,
    name: "Kia Forte",
    image: "/assets/sport.webp",
    pricePerDay: 43,
    brand: "Kia",
    transmission: "Manual",
    energy_type: "Diesel",
    no_seats: "5",
    
  },
  {
    id: 8,
    name: "Volkswagen Jetta",
    image: "/assets/carbuzz.avif",
    pricePerDay: 54,
    brand: "Volkswagen",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  {
    id: 9,
    name: "Mazda 3",
    image: "/assets/face.jpeg",
    pricePerDay: 49,
    brand: "Mazda",
    transmission: "Manual",
    energy_type: "Diesel",
    no_seats: "5",
    
  },
  {
    id: 10,
    name: "Subaru Impreza",
    image: "/assets/car1.png",
    pricePerDay: 46,
    brand: "Subaru",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  
];



  