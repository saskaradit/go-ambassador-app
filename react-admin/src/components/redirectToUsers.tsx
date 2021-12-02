import React from 'react'
import { Navigate } from 'react-router-dom';

const RedirectToUsers = () => <Navigate to={'/users'}/>

export default RedirectToUsers;