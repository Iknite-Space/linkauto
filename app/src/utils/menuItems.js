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
    FiDribbble,
    FiDollarSign,
  } from "react-icons/fi";

  
  export const menuItems = [
    {
      title: "MANAGEMENT",
      items: [
        {
          label: "Dashboard",
          icon: <FiHome />,
          href: "/dashboard",
          visible: ["admin", "car_owner", "customer"],
        },
        {
          label: "General",
          icon: <FiBookOpen />,
          visible: ["admin","car_owner", "customer"],
          children: [
            {
              label: "All Users",
              icon: <FiUsers />,
              href: "/dashboard/users",
              visible: ["admin"],
            },
            {
              label: "All Cars",
              icon: <FiTruck />,
              href: "/dashboard/owner-cars",
              visible: ["car_owner"],
            },
             {
              label: "All Cars",
              icon: <FiTruck />,
              href: "/dashboard/cars/all",
              visible: ["admin"],
            },
            {
              label: "Payments",
              icon: <FiDollarSign />,
              href: "/dashboard/all-payments",
              visible: ["admin","car_owner", "customer"],
            },
            
            {
              label: "Reservations",
              icon: <FiBookOpen />,
              href: "/dashboard/customer-reservations",
              visible: ["customer"],
            },
             {
              label: "Reservations",
              icon: <FiBookOpen />,
              href: "/dashboard/reservations",
              visible: ["admin"],
            }
          ],
          
        },
        {
          label: "Verifications",
          icon: <FiTruck />,
          visible: ["admin"],
          children: [
            {
              label: "users",
              icon: <FiList />,
              href: "/dashboard/user-verification",
              visible: ["admin"],
            },
            {
              label: "Cars",
              icon: <FiPlusSquare />,
              href: "/dashboard/car-verification",
              visible: ["admin"],
            },
            
           
            // {
            //   label: "Diff Payment Page",
            //   icon: <FiDribbble />,
            //   href: "/dashboard/diff-payment-page",
            //   visible: ["admin"],
            // },
          ],
        },
        {
          label: "Cars",
          icon: <FiTruck />,
          visible: ["car_owner"],
          children: [
            {
              label: "All Cars",
              icon: <FiList />,
              href: "/dashboard/cars/all",
              visible: ["car_owner"],
            },
            {
              label: "Add Car",
              icon: <FiPlusSquare />,
              href: "/dashboard/cars/upload",
              visible: ["car_owner"],
            },
          ],
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
          visible: ["admin", "car_owner", "customer"],
        },
        {
          label: "Logout",
          icon: <FiLogOut />,
          href: "/dashboard/logout",
          visible: ["admin", "car_owner", "customer"],
        },
      ],
    },
  ];

  export const cars = [
  {
    id: 1,
    name: "Toyota Corolla",
    images:{
      front: "/assets/filthy.png",
      back: "/assets/car2.png",
    } ,
    pricePerDay: 45,
    brand: "Toyota",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
  },
  {
    id: 2,
    name: "Honda Civic",
    images:{front: "/assets/luxury.webp",
       back: "/assets/car3.png"

    } ,
    pricePerDay: 50,
    brand: "Honda",
    transmission: "Manual",
    energy_type: "Diesel",
    no_seats: "5",
    
  },
  {
    id: 3,
    name: "Ford Focus",
    images: {front: "/assets/luxurylaunches.jpg",
      back: "/assets/car1.png"},
    pricePerDay: 48,
    brand: "Ford",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  {
    id: 4,
    name: "Chevrolet Malibu",
    images: {front: "/assets/face.jpeg",
      back: "/assets/car2.png"},
    pricePerDay: 55,
    brand: "Chevrolet",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  {
    id: 5,
    name: "Hyundai Elantra",
    images: {front: "/assets/faq.png",
      back: "/assets/sport.webp"},
    pricePerDay: 47,
    brand: "Hyundai",
    transmission: "Manual",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  {
    id: 6,
    name: "Nissan Altima",
    images: {front: "/assets/car2.png",
      back: "/assets/car3.png"},
    pricePerDay: 52,
    brand: "Nissan",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  {
    id: 7,
    name: "Kia Forte",
    images: {front: "/assets/sport.webp",
      back: "/assets/faq.png"},  
    pricePerDay: 43,
    brand: "Kia",
    transmission: "Manual",
    energy_type: "Diesel",
    no_seats: "5",
    
  },
  {
    id: 8,
    name: "Volkswagen Jetta",
    images: {front: "/assets/carbuzz.avif",
      back: "/assets/face.jpeg"}, 
    pricePerDay: 54,
    brand: "Volkswagen",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  {
    id: 9,
    name: "Mazda 3",
    images: {front: "/assets/face.jpeg",
      back: "/assets/car1.png"},  
    pricePerDay: 49,
    brand: "Mazda",
    transmission: "Manual",
    energy_type: "Diesel",
    no_seats: "5",
    
  },
  {
    id: 10,
    name: "Subaru Impreza",
    images: {front: "/assets/car1.png",
      back: "/assets/luxurylaunches.jpg"},
    pricePerDay: 46,
    brand: "Subaru",
    transmission: "Automatic",
    energy_type: "Petrol",
    no_seats: "5",
    
  },
  
];



  