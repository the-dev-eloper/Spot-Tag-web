
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function LoginScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(signin(email, password));
    };

    const fp_handler = () => { }

    const goToSignup = () => {
        props.history.push('/register');
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div className="body-login">

            <section class="loginPage">

                <div class="centered--loginBox">

                    <img
                        src="./images/Login_image.png"
                        alt="Login"
                        title="Login"
                    />

                    <section class="login__content--wrap">

                        <div class="login__content--heading">
                            <h2>
                                Welcome to Spot -
                                <span>Tag..</span>
                            </h2>
                        </div>

                        <div class="login__content--form">
                            <form className="form-login" onSubmit={submitHandler}>

                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}

                                <div class="login__form--inputWrap">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div class="login__form--inputWrap">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div class="login__form--cbInputWrap">

                                    <div class="checkboxWrap">
                                        <input type="checkbox" id="remenber_user" name="remember" checked />
                                        {/* <span>Remember Me</span> */}
                                        <label for="remenber_user">Remember me</label>
                                    </div>

                                    <div class="fpWrap">
                                        <button onClick={() => fp_handler()}>Forgot Password</button>
                                    </div>
                                </div>

                                <div class="login__form--buttonSection">
                                    <button type="submit" class="login__btn">Login</button>
                                </div>
                            </form>

                            <div class="login__form--newUser">
                                <h5>New to Spot-Tag?</h5>
                                <button onClick={() => goToSignup()}>Create an account</button>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}
