import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../actions/userActions';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import data from '../data';

export default function SignupScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState(0);
    const [designation, setDesignation] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [tnc, setTnc] = useState(false);

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Password and confirm password are not match');
        } else {
            dispatch(register(
                name,
                email,
                password,
                mobile,
                designation
            ));
        }
    };

    const gotoLogin = () => {
        props.history.push('/signin')
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div className="body--signup">

            <section class="signupPage">
                <div class="centered--signupBox">

                    <img src={data.loginImage} alt="Signup" title="Signup" />

                    <section class="signup__content--wrap">

                        <div class="signup__content--header">
                            <h2>
                                Hello World,<br />
                                Welcome to Spot -
                                <span>Tag!</span>
                            </h2>
                        </div>

                        <div class="signup__content--form">
                            <form onSubmit={submitHandler}>

                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}

                                <div class="signup__form--inputSection">

                                    <div class="signup__form--row">
                                        <div class="signupForm--inputWrap">
                                            <label htmlFor="name" className="formLabel">First Name*</label> <br/>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Name"
                                                required
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div class="signupForm--inputWrap">
                                            <label htmlFor="email" className="formLabel">Email*</label> <br/>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="Email"
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div class="signup__form--row">
                                        <div class="signupForm--inputWrap">
                                            <label htmlFor="mobile" className="formLabel">Mobile*</label> <br/>
                                            <input
                                                type="number"
                                                id="mobile"
                                                placeholder="Mobile"
                                                required
                                                onChange={(e) => setMobile(e.target.value)}
                                            />
                                        </div>

                                        <div class="signupForm--inputWrap">
                                            <label htmlFor="designation" className="formLabel">Designation*</label> <br/>
                                            <input
                                                type="text"
                                                id="designation"
                                                placeholder="Designation"
                                                required
                                                onChange={(e) => setDesignation(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div class="signup__form--row">
                                        <div class="signupForm--inputWrap">

                                            <label htmlFor="password" className="formLabel">New Password*</label> <br/>
                                            <input
                                                type="password"
                                                id="password"
                                                placeholder="Password"
                                                required
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>

                                        <div class="signupForm--inputWrap">
                                            <label htmlFor="confirmPassword" className="formLabel">Confirm Password*</label> <br/>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                placeholder="Confirm Password"
                                                required
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="signup__form--cbInputWrap">
                                    <input
                                        type="checkbox"
                                        id="tncbox"
                                        onChange={() => setTnc(!tnc)}
                                        required
                                    />
                                    <span>I agree to all the Terms and Conditions</span>
                                </div>

                                <div class="signup__form--buttonSection">
                                    <button type="submit" disabled={!tnc}>Sign up</button>
                                </div>
                            </form>
                        </div>

                        <div class="signup__form--newUser">
                            <h5>Already have an account?</h5>
                            <button onClick={() => gotoLogin()}>Log in</button>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}
