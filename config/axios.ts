import axios, { AxiosRequestHeaders } from 'axios'
import { getSession } from 'next-auth/react'

const Axios = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api',
	withCredentials: true,
	withXSRFToken: true,
})



Axios.interceptors.request.use(
	async (config) => {
		try {
			const token = await getSession()

			config.headers = {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token?.user.token}`,
			} as AxiosRequestHeaders
		} catch (error) {
			console.error('Error fetching session:', error)
		}
		return config
	},
	async (response) => response
)

export default Axios
