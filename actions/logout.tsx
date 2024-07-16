import Axios from '@/config/axios'
import { signOut } from 'next-auth/react'

export const logout = async () => {
	// signOut()
	try {
		const res = await Axios.post('/auth/logout')
		// console.log(res)
		if (res?.data?.status == 200) {
			signOut()
		}
	} catch (error) {
		console.log(error)
	}
}
