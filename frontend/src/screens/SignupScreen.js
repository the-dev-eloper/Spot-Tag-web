import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import data from '../data';

export default function SignupScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState(0);
    const [designation, setDesignation] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Password and confirm password are not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div className="body-login">
            <div className="box-login">

                <div className="col-div-6-login">

                    <img
                        src={data.loginImage}
                        alt="Login"
                        title="Login"
                    />
                </div>

                <div className="col-div-6-login">

                    <div className="headText-signup">
                        <p>Hello World, Welcome to Spot-<span>Tag</span>..</p>
                    </div>

                    <div className="clearfix"></div>
                    <br />

                    <div className="formField-signup">
                        <form className="form-signup" onSubmit={submitHandler}>

                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}

                            <div className="col-div-3-signup">
                                <label htmlFor="name" className="formLabel">First Name*</label> <br/>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="col-div-3-signup">
                                <label htmlFor="email" className="formLabel">Email*</label> <br/>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="clearfix"></div>

                            <div className="col-div-3-signup">
                                <label htmlFor="mobile" className="formLabel">Mobile*</label> <br/>
                                <input
                                    type="number"
                                    id="mobile"
                                    placeholder="Mobile"
                                    required
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </div>

                            <div className="col-div-3-signup">
                                <label htmlFor="designation" className="formLabel">Country*</label> <br/>
                                <input
                                    type="text"
                                    id="designation"
                                    placeholder="Designation"
                                    required
                                    onChange={(e) => setDesignation(e.target.value)}
                                />
                            </div>

                            <div className="clearfix"></div>

                            <div className="col-div-3-signup">
                                <label htmlFor="password" className="formLabel">New Password*</label> <br/>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="col-div-3-signup">
                                <label htmlFor="confirmPassword" className="formLabel">Confirm Password*</label> <br/>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div className="clearfix"></div>
                            <br />

                            <label className="tnc-signup">
                                <input
                                    type="checkbox"
                                    id="tnc"
                                    required
                                /> I agree to all the Terms and Conditions
                            </label>

                            <div className="clearfix"></div>
                            <br />

                            <div className="btn-section-signup">
                                <button type="submit" className="signupbtn-signup">Sign up</button>
                            </div>
                        </form>
                    </div>

                    <div className="clearfix"></div>
                    <br />

                    <p className="accounted-signup">
                        Already have an account?{' '}
                        <Link to={`/login?redirect=${redirect}`}>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
