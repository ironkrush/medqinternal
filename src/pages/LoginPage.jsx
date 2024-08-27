import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import signupBgVideo from '../assets/images/signupbg.mp4';

const LoginPage = () => {
    const { login } = useContext(AuthContext); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            setError('Invalid credentials'); 
        }
    };

    return (
        <div id="signin">
            <nav className="logo">
                <h1 className="logo-name">medq</h1>
            </nav>
            <div className="form">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="input-box">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                autoComplete='email'
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                autoComplete='current-password'
                            />
                            
                        </div>
                        <br />
                        <div className="remember-forget">
                            <label><input type="checkbox" />Remember me</label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <br />
                        <div className="btnparent">
                            <button className="button" type="submit">Login</button>
                        </div>
                        <br />
                        <div className="register-link">
                            <p>Don't have an account?<br /> <a href="/signup">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
            <video className="dna" src={signupBgVideo} autoPlay loop muted />
        </div>
    );
};

export default LoginPage;
