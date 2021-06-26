import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DELETE_RESET } from '../constants/userConstants';

export default function UserListScreen(props) {

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userDelete = useSelector((state) => state.userDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = userDelete;

    const dispatch = useDispatch();

    useEffect(() => {

        // if (successDelete) {
        //     dispatch({ type: USER_DELETE_RESET });
        // }

        dispatch(listUsers());
    }, [dispatch, successDelete])

    const deleteHandler = (user) => {
        if(window.confirm('Are you sure to delete?')) {
            dispatch(deleteUser(user._id));
        }
    }

    return (
        <div>

            <h1>Users</h1>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {
                successDelete && (
                    <MessageBox variant="success">User Deleted Successfully</MessageBox>
                )
            }

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
                                <th>Actions</th>
                            </thead>

                            <tbody>
                                {
                                    Array.isArray(users) ? (
                                        users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                                <td>{user.createdAt}</td>
                                                <td>{user.updatedAt}</td>

                                                <td>
                                                    <button
                                                        type="button"
                                                        className="small"
                                                        onClick={() =>
                                                            props.history.push(`/user/${user._id}/edit`)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="small"
                                                        onClick={() => deleteHandler(user)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
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
