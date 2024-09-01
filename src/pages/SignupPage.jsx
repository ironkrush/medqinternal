import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../assets/styles/signup.css';
import signupBgVideo from '../assets/images/signupbg.mp4';
import { Link } from 'react-router-dom';

const SignupPage = () => {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate(); // useNavigate hook from React Router

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [role, setRole] = useState('patient');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== rePassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                username,
                email,
                password,
                role
            });
            setSuccess('Signup successful!');
            console.log('Signup successful:', response.data);

            
            navigate('/dashboard');
        } catch (error) {
            setError('Signup failed. Please try again.');
            console.error('Signup failed:', error.response?.data || error.message);
        }
    };

    return (
        <div id="signup">
            <div className="form">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <div className="com">
                            <div className="input-box">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    name="username"
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="pass">
                            <div className="input-box">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type={showRePassword ? 'text' : 'password'}
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        <div className="radio-wrapper">
                            <input
                                type="radio"
                                className="radio"
                                id="radio1"
                                name="role"
                                value="doctor"
                                checked={role === 'doctor'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="radio1" className="label">
                                <svg width="45" height="45" viewBox="0 0 95 95">
                                    <circle cx="50" cy="50" r="20" stroke="black" fill="none"></circle>
                                    <g transform="translate(0,-952.36222)">
                                        <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="black" strokeWidth="3" fill="none" class="path1"></path>
                                    </g>
                                </svg>
                                <span>Doctor</span>
                            </label>
                        </div>
                        <div className="radio-wrapper">
                            <input
                                type="radio"
                                className="radio"
                                id="radio2"
                                name="role"
                                value="staff"
                                checked={role === 'staff'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="radio2" className="label">
                            <svg width="45" height="45" viewBox="0 0 95 95">
                                    <circle cx="50" cy="50" r="20" stroke="black" fill="none"></circle>
                                    <g transform="translate(0,-952.36222)">
                                        <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="black" strokeWidth="3" fill="none" class="path1"></path>
                                    </g>
                                </svg>
                                <span>Staff</span>
                            </label>
                        </div>
                        <div className="radio-wrapper">
                            <input
                                type="radio"
                                className="radio"
                                id="radio3"
                                name="role"
                                value="patient"
                                checked={role === 'patient'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="radio3" className="label">
                            <svg width="45" height="45" viewBox="0 0 95 95">
                                    <circle cx="50" cy="50" r="20" stroke="black" fill="none"></circle>
                                    <g transform="translate(0,-952.36222)">
                                        <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="black" strokeWidth="3" fill="none" class="path1"></path>
                                    </g>
                                </svg>
                                <span>Patient</span>
                            </label>
                        </div>
                        <div className="remember-forget">
                            <label><input type="checkbox" /> Remember me</label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <div className="signupbtn">
                            <button type="submit" className="button">Signup</button>
                        </div>
                        <div className='alreadyaccount'>
                            <Link to="/login">Already have an account</Link>
                        </div>
                    </form>
                </div>
            </div>
          <video className="dna" src={signupBgVideo} autoPlay loop muted></video> 
        </div>
    );
};

export default SignupPage;
