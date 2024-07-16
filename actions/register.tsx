import Axios from '@/config/axios'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'

export const register = async (prevState: any, formData: FormData) => {
	try {
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
		}

		const res = await Axios.post('/auth/register', data)
		console.log(res)
		if (res?.data?.status == 201) {
			signIn('credentials', {
				email: data.email,
				password: data.password,
				callbackUrl: '/',
			})
			toast.success(res?.data?.message)
		}
	} catch (error: any) {
		console.log('login err', error)
		if (error?.response?.status == 422) {
			return {
				errors: error.response.data.errors,
			}
		}
	}
}
