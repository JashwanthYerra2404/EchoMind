// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './SignupPage.css';
// import chatGptLogo from '/src/assets/ChatGPT-Logo.png';

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError(''); // Clear error when user types
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
//       setError('All fields are required');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3000/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password
//         }),
//         credentials: 'include'
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Signup failed');
//       }

//       // Redirect to chat page on successful signup
//       navigate('/chat');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <div className="logo-section">
//           {/* <img src={chatGptLogo} alt="EchoMind Logo" /> */}
//           <h1>EchoMind</h1>
//         </div>

//         <form onSubmit={handleSubmit} className="signup-form">
//           {error && <div className="error-message">{error}</div>}
          
//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//             />
//           </div>

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

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm your password"
//             />
//           </div>

//           <button type="submit" className="signup-button">
//             Sign Up
//           </button>
//         </form>

//         <div className="login-link">
//           Already have an account? <Link to="/login">Login here</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;