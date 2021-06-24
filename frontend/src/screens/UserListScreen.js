import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function UserListScreen() {

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listUsers());
        // console.log(users);
    }, [dispatch])

    return (
        <div>
            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox>{error}</MessageBox>
                ) : (

                    <div>
                        <table className="table">
                            <thead>
                                <th>name</th>
                                <th>email</th>
                                <th>isAdmin</th>
                            </thead>

                            <tbody>
                                {
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{users[0].name}</td>
                                            <td>{users[0].email}</td>
                                            <td>{users[0].isAdmin}</td>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>

                    </div>
                    // console.table(users)

                    // <h1>SD</h1>
                )
            }
        </div>
    )
}
