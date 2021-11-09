import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

const API_ENDPOINT = process.env.NEXT_PUBLIC_URL_API

export const axiosInstanceServerSide = (session = null, timeout = 5000) => {

	const axiosInstance = axios.create({
		baseURL: API_ENDPOINT,
		timeout: timeout,
		headers: {
			Authorization: session
				? 'Bearer ' + session.accessToken
				: null,
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
	});

	axiosInstance.interceptors.response.use(
		(response) => {
			return response;
		},
		async function (error) {

			if (typeof error.response === 'undefined') {
				alert(
					'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
				);
				return Promise.reject(error);
			}

			if (
				error.response.data.code === 'token_not_valid' &&
				error.response.status === 401 &&
				error.response.statusText === 'Unauthorized'
			) {
				console.log("FAILED", error.response.data);
				return Promise.reject(error);
			}

			// specific error handling done elsewhere
			return Promise.reject(error);
		}
	);

	return axiosInstance
}


export const axiosInstanceFetch = (session = null, timeout = 5000) => {
	const axiosInstance = axios.create({
		baseURL: API_ENDPOINT,
		timeout: timeout,
		headers: {
			Authorization: session
				? 'Bearer ' + session.accessToken
				: null,
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
	});

	axiosInstance.interceptors.response.use(
		(response) => {
			return response;
		},
		async function (error: AxiosError) {
			const originalRequest = error.config;
			console.log(error.response);

			if (typeof error.response === 'undefined') {
				alert(
					'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
				);
				return Promise.reject(error);
			}
			if (
				error.response.status === 401 &&
				error.response.statusText === 'Unauthorized'
			) {
				const newSession = await getSession()
				try {
					if (newSession) {
						axiosInstance.defaults.headers['Authorization'] =
							'Bearer ' + newSession.accessToken;
						originalRequest.headers['Authorization'] =
							'Bearer ' + newSession.accessToken;

						return axiosInstance(originalRequest);
					} else {
						console.log('Refresh token invalid. SignOut...');
					}
				} catch (error) {
					console.log(error);
					console.log('Refresh token invalid. SignOut...');
				}

			}

			return Promise.reject(error);
		}
	);

	return axiosInstance
}