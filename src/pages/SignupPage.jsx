import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../assets/styles/signup.css';
import signupBgVideo from '../assets/images/signupbg.mp4';

const SignupPage = () => {
    const { signup } = useContext(AuthContext);
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
        } catch (error) {
            setError('Signup failed. Please try again.');
            console.error('Signup failed:', error.response?.data || error.message);
        }
    };

    return (
        <div id="signup">
            <nav className="logo">
                <h1 className="logo-name">medq</h1>
            </nav>
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
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="toggle-icon"
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
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
                                <button
                                    type="button"
                                    onClick={() => setShowRePassword(!showRePassword)}
                                    className="toggle-icon"
                                >
                                    <i className={`fas ${showRePassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
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
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke={role === 'doctor' ? 'black' : '#bbb'} strokeWidth="2"/>
                                    <circle cx="12" cy="12" r="6" fill={role === 'doctor' ? 'black' : 'none'} />
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
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke={role === 'staff' ? 'black' : '#bbb'} strokeWidth="2"/>
                                    <circle cx="12" cy="12" r="6" fill={role === 'staff' ? 'black' : 'none'} />
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
                                value="user"
                                checked={role === 'user'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="radio3" className="label">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke={role === 'user' ? 'black' : '#bbb'} strokeWidth="2"/>
                                    <circle cx="12" cy="12" r="6" fill={role === 'user' ? 'black' : 'none'} />
                                </svg>
                                <span>User</span>
                            </label>
                        </div>
                        <div className="remember-forget">
                            <label><input type="checkbox" /> Remember me</label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <div className="signupbtn">
                        <button type="submit" className="button">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
            <video className="dna" src={signupBgVideo} autoPlay loop muted></video>
        </div>
    );
};

export default SignupPage;
