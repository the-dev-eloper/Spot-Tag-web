import React, { useCallback, useContext, useState } from 'react';
import './styles.less';
import { Button, Image, Typography } from 'antd';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../navigation/RootNavigation';

interface Values {
    firstName: string;
    email: string;
    designation: string;
    password: string;
    termsChecked: boolean;
};

export const Signup = () => {

    const navigate = useNavigate();
    const authStatus = useContext(AuthContext);

    const [tnc, setTnc] = useState(false);

    const created = useCallback(() => {
        authStatus.onLogin();
        navigate('/');
    }, [navigate, authStatus]);

    const goToLogin = () => {
        navigate('/');
    };

    return (
        <div className='signup'>
            <div className='signup--centeredBox row--spacedContents'>

                <Image src='./images/Login_image.png' title='signup' preview={false} />

                <div className='signup--contentPadding'>
                    <div className='signup--marginAdjustment'>
                        <Typography.Title level={2} className='signup--headingText1'>
                            Hello World,
                        </Typography.Title>
                        <Typography.Title level={2} className='signup--headingText2'>
                            Welcome to Spot-
                            <span>Tag!</span>
                        </Typography.Title>
                    </div>

                    <div className='signup--marginAdjustment'>
                        <Formik
                            initialValues={{
                                firstName: '',
                                email: '',
                                designation: '',
                                password: '',
                                termsChecked: false
                            }}
                            onSubmit={(
                                values: Values,
                                { setSubmitting }: FormikHelpers<Values>
                            ) => {
                                setTimeout(() => {
                                    created();
                                    setSubmitting(false);
                                }, 500);
                            }}
                        >
                            <Form>
                                <div className='signup--inputSection'>
                                    <Field
                                        type='text'
                                        id='firstName'
                                        name='firstName'
                                        placeholder='Enter First Name'
                                        className='signup--inputBox'
                                        required
                                    />
                                    <Field
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder='Enter Email'
                                        className='signup--inputBox'
                                        required
                                    />
                                </div>

                                <div className='signup--inputSection'>
                                    <Field
                                        type='text'
                                        id='designation'
                                        name='designation'
                                        placeholder='Enter Designation'
                                        className='signup--inputBox'
                                        required
                                    />
                                    <Field
                                        type='password'
                                        id='password'
                                        name='password'
                                        placeholder='Enter Password'
                                        className='signup--inputBox'
                                        required
                                    />
                                </div>

                                <div className='signup--checkbox'>
                                    <Field type='checkbox' name='termsChecked' onClick={() => setTnc(!tnc)} className='signup--checkbox__field' />
                                    <label className='signup--checkbox__label'>I agree to all the Terms and Conditions</label>
                                </div>

                                <div className='signup--button signup--marginAdjustment'>
                                    <Button type='primary' htmlType='submit' disabled={!tnc}>Sign up</Button>
                                </div>
                            </Form>
                        </Formik>
                    </div>

                    <div className='signup--newUser'>
                        <Typography.Title level={5} className='signup--newUser__text'>
                            Already have an account?
                        </Typography.Title>

                        <Button onClick={() => goToLogin()}>Log in</Button>
                    </div>
                </div>
            </div>

        </div>
    );
};
