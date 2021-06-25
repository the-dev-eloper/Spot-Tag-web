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
                                <th>ID</th>
                                <th>name</th>
                                <th>email</th>
                                <th>isAdmin</th>
                                <th>Created</th>
                                <th>Last Updated</th>
                            </thead>

                            <tbody>
                                {
                                    Array.isArray(users) ? (
                                        users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>

                                                {
                                                    user.isAdmin ? (
                                                        <td>True</td>
                                                    ) : (
                                                        <td>False</td>
                                                    )
                                                }

                                                <td>{user.createdAt}</td>
                                                <td>{user.updatedAt}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr></tr>
                                    )
                                }
                            </tbody>
                        </table>

                    </div>
                )
            }
        </div>
    );
}
