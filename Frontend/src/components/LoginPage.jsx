// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './LoginPage.css';
// // import chatGptLogo from '../assets/ChatGPT-Logo.png';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     // ❌ removed setError('') here so typing doesn’t constantly reset or cause flashing
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation (runs only when submitting)
//     if (!formData.email || !formData.password) {
//       setError('All fields are required');
//       return;
//     }

//     console.log("Entering into");

//     try {
//       const response = await fetch('http://localhost:3000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password
//         }),
//         credentials: 'include'
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Login failed');
//       }

//       // Clear any previous errors
//       setError('');

//       // Redirect to chat page on successful login
//       navigate('/chat');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="logo-section">
//           {/* <img src={chatGptLogo} alt="EchoMind Logo" /> */}
//           <h1>EchoMind</h1>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
//           {error && <div className="error-message">{error}</div>}

//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//             />
//           </div>

//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>

//         <div className="signup-link">
//           Don't have an account? <Link to="/signup">Sign up here</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
