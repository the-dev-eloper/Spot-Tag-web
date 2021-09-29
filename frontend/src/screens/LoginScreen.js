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

                    <div className="headText-login">
                        <p className="logo-login">Welcome to Spot-<span>Tag</span>..</p>
                    </div>

                    <div className="formField-login">
                        <form className="form-login" onSubmit={submitHandler}>

                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}

                            <input
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <br />

                            <label>
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked="checked"
                                /> Remember me
                            </label>

                            <div className="clearfix"></div>
                            <br />

                            <div className="btn-section-login">
                                <button type="submit" className="signupbtn-login">Login</button>
                                <Link to="#" className="fp-login">Forgot Password?</Link>
                            </div>
                        </form>
                    </div>

                    <div className="clearfix"></div>
                    <br />

                    <p className="noaccount-login">
                        New to Spot-Tag? <Link to={`/register?redirect=${redirect}`}>
                            Click me
                        </Link>
                    </p>
                </div>
            </div> 
        </div>
    );
}
