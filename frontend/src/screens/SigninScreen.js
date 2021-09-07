import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {

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
        <div className="grid-container-signin">

            <div className="page-grid">

                <div className="row">

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <img
                            src="./images/login.png"
                            alt="Login"
                            title="Login"
                            className="img-responsive center-block imageField"
                        />
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                        <div className="headText">
                            <h1>
                                Hello World,
                            </h1>

                            <h1>
                                Welcome to Spot-Tag..
                            </h1>
                        </div>

                        <div className="formField">
                            <form className="form" onSubmit={submitHandler}>

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
                                        // style={margin-bottom:15px}
                                    /> Remember me
                                </label>

                                <label>
                                    <p className="">
                                        Forgot Password?
                                    </p>
                                </label>

                                <div className="clearfix">
                                    <button
                                        type="submit"
                                        className="signupbtn"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="registerPage">

                            Don't have an account ? {' '}

                            <Link to={`/register?redirect=${redirect}`}>
                                Click me
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    );
}
