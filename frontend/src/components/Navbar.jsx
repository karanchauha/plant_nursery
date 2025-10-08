// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <nav className="bg-white shadow">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="font-bold text-xl text-green-700">
//           RarePlants
//         </Link>
//         <div className="flex items-center gap-4">
//           <Link to="/plants" className="hover:underline">
//             Browse
//           </Link>
//           <Link to="/cart" className="hover:underline">
//             Cart
//           </Link>
//           {user ? (
//             <>
//               {user.role === "seller" && (
//                 <Link to="/seller" className="hover:underline">
//                   Seller
//                 </Link>
//               )}
//               <button className="text-sm text-red-500" onClick={logout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//               <Link to="/register" className="hover:underline">
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const navLinks = [
    { to: "/plants", label: "Browse" },
    { to: "/cart", label: "Cart", icon: <ShoppingBagIcon className="w-5 h-5" /> },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="fixed w-full z-50 bg-white/70 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-2xl tracking-tight text-green-800 hover:text-green-600 transition-colors"
        >
          RarePlants
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1 hover:text-green-700 transition-colors ${
                location.pathname === link.to ? "text-green-700 font-medium" : "text-gray-700"
              }`}
            >
              {link.icon && link.icon}
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              {user.role === "seller" && (
                <Link
                  to="/seller"
                  className={`hover:text-green-700 transition-colors ${
                    location.pathname.startsWith("/seller") ? "text-green-700 font-medium" : "text-gray-700"
                  }`}
                >
                  Seller
                </Link>
              )}
              <button
                onClick={logout}
                className="px-4 py-1 rounded-full text-sm text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1 rounded-full text-sm text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 rounded-full text-sm border border-green-600 text-green-600 hover:bg-green-50 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
