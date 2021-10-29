import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import data from '../data';

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

    const fp_handler = () => {}

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

            <div class="login__box">

                <div class="col-div-6">
                    <img
                        src="./images/Login_image.png"
                        alt="Login"
                        title="Login"
                    />
                </div>

                <div class="col-div-6">
                    <section class="login__content--wrap">

                        <div class="login__content--heading">
                            <p>
                                Welcome to Spot -
                                <span>Tag..</span>
                            </p>
                        </div>

                        <div class="login__form">
                            <form className="form-login" onSubmit={submitHandler}>

                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}

                                <div class="login__input--Wrap">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div class="login__input--Wrap">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div class="login__input--Checkbox">
                                    <input type="checkbox" id="remenber_user" name="remember" checked />
                                    <label for="remenber_user">Remember me</label>
                                </div>

                                <div class="login__input--buttons">
                                    <button type="submit" class="login__btn">Login</button>
                                    <button class="fp__btn" onClick={() => fp_handler()}>Forgot Password?</button>
                                </div>
                            </form>

                            <div class="login__input--newUser">
                                <h5>New to Spot-Tag?</h5>
                                <button onClick={() => goToSignup()}>Create an account</button>
                            </div>                
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
