import axios from 'axios';
import { LOGIN } from 'store/actions';
import { useReducer } from 'react';
import accountReducer from 'store/accountReducer';

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// const setSession = (serviceToken) => {
//     if (serviceToken) {
//         localStorage.setItem('serviceToken', serviceToken);
//         axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
//     } else {
//         localStorage.removeItem('serviceToken');
//         delete axios.defaults.headers.common.Authorization;
//     }
// };

const register = async (value) => {
    console.log(value);
    await axios.post('http://localhost:8080/api/auth/signup', value);
};

const login = async (username, password) => {
    console.log('login');
    await axios.post('http://localhost:8080/api/auth/signin', { username, password }).then((response) => {
        if (response.data.accessToken) {
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            // dispatch({
            //     type: LOGIN,
            //     payload: {
            //         isLoggedIn: true,
            //         user
            //     }
            // });
            return response.data;
        }

        return response.data;
    });
};

const getCurrentUser = () => {
    console.log(JSON.parse(localStorage.getItem('user')));
    return JSON.parse(localStorage.getItem('user'));
};
const logout = () => {
    localStorage.removeItem('user');
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService;
