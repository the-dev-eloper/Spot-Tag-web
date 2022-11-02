
import './styles.less';
import React, { useState } from 'react';
import { Button, Image, Typography } from 'antd';
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Values {
    email: string;
    password: string;
    checked: boolean;
};

export const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: '',
        checked: false
    });

    const fp_handler = () => {
        // ToDo: Forgot Password
    };

    const goToSignup = () => {
        // ToDo: Navigate to signup
    };

    return (
        <div className="login">
            <div className="login--centeredBox row--spacedContents">

                <Image src='./images/Login_image.png' preview={false} />

                <div className='login--contentPadding'>
                    <div className="login--marginAdjustment">
                        <Typography.Title level={2} className='login--headingText'>
                            Welcome to Spot-
                            <span>Tag..</span>
                        </Typography.Title>
                    </div>

                    <div className="login--marginAdjustment">
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                checked: false
                            }}
                            onSubmit={(
                                values: Values,
                                { setSubmitting }: FormikHelpers<Values>
                            ) => {
                                setTimeout(() => {
                                    setUser({
                                        email: values.email,
                                        password: values.password,
                                        checked: values.checked,
                                    });
                                    console.log(user);
                                    setSubmitting(false);
                                }, 500);
                            }}
                        >
                            <Form>
                                <Field
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='Enter Email'
                                    className='login--inputBox'
                                />

                                <Field
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Enter Password'
                                    className='login--inputBox'
                                />

                                <div className="row--spacedContents login--marginAdjustment">
                                    <div className="login--checkbox">
                                        <Field type="checkbox" name="checked" className='login--checkbox__field' />
                                        <label className='login--checkbox__label'>Remember me</label>
                                    </div>

                                    <div className="login--forgotPassword">
                                        <Button onClick={() => fp_handler()}>
                                            Forgot Password
                                        </Button>
                                    </div>
                                </div>

                                <div className="login--button login--marginAdjustment">
                                    <Button type="primary" htmlType='submit'>Login</Button>
                                </div>
                            </Form>
                        </Formik>
                    </div>

                    <div className="login--newUser">
                        <Typography.Title level={5} className='login--newUser__text'>
                            New to Spot-Tag?
                        </Typography.Title>

                        <Button onClick={() => goToSignup()}>Create an account</Button>
                    </div>
                </div>
            </div>

        </div>
    );
};
