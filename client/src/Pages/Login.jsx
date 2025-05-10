import React, { useState } from 'react';
import '../styles/Login.css'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupNumber, setSignupNumber] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });

            const data = await response.json();
            console.log("Login response:", data);

           if (response.ok && data.token) {
            localStorage.setItem('auth-token', data.token);
            toast.success("Logged in successfully");
            setTimeout(() => {
                window.location.replace("/");
            }, 2500);
            } else {
                toast.error(data.errors || data.message || "Login failed.");
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!signupUsername || !signupEmail || !signupPassword || !signupNumber) {
            toast.error("Please fill in all fields.");
            return;
        }

        const formData = {
            username: signupUsername,
            email: signupEmail,
            password: signupPassword,
            number: signupNumber,
        };

        console.log("Signup attempted with:", formData);

        try {
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Signup response:", data);

            if (response.ok && data.token) {
                localStorage.setItem('auth-token', data.token);
                toast.success("Signed up successfully")
                window.location.replace("/");
            } else {
                toast.error(data.errors || data.message || "Signup failed.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("There was an error processing your request.");
        }
    };

    return (
        <div className="container">
            <div className="authContainer">
                {isLogin ? (
                    <>
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="inputGroup">
                                <label htmlFor="loginEmail">Email:</label>
                                <input
                                    type="email"
                                    id="loginEmail"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="loginPassword">Password:</label>
                                <input
                                    type="password"
                                    id="loginPassword"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                            <button type="submit" className="button">Login</button>
                        </form>
                        <span>Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Sign up here</a></span>
                    </>
                ) : (
                    <>
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSignup}>
                            <div className="inputGroup">
                                <label htmlFor="signupUsername">Username:</label>
                                <input
                                    type="text"
                                    id="signupUsername"
                                    value={signupUsername}
                                    onChange={(e) => setSignupUsername(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="signupEmail">Email:</label>
                                <input
                                    type="email"
                                    id="signupEmail"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="signupPassword">Password:</label>
                                <input
                                    type="password"
                                    id="signupPassword"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="signupNumber">Phone Number:</label>
                                <input
                                    type="number"
                                    id="signupNumber"
                                    value={signupNumber}
                                    onChange={(e) => setSignupNumber(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                            <button type="submit" className="button">Sign Up</button>
                        </form>
                        <span>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login here</a></span>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
