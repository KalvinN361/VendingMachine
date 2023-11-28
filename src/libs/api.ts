import axios from 'axios';

export const base = 'https://apiv2test.projectvenkman.com/v2';
// export const base = 'http://localhost:3001/v2';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE
        ? process.env.REACT_APP_API_BASE
        : base,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export type ApiError = {
    message: String;
};
