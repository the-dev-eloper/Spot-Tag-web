import React from 'react';
import { Typography } from 'antd';
import './style.less';

export const Navbar = () => {
    return (
        <div className='navbar'>
            <Typography.Title level={2} className='navbar--title'>Red Notice</Typography.Title>
            <Typography.Title level={4} className='navbar--auth'>Sign in</Typography.Title>
        </div>
    )
}