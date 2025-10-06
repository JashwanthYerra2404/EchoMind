// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   // Check if we have a JWT token in cookies
//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//   };

//   const token = getCookie('jwt');

//   if (!token) {
//     // Redirect to login if no token exists
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;