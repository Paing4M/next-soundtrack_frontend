import Axios from '@/config/axios'

export const getSongs = async (
	search: string | '' = '',
	cursor: string | null = null
) => {
	const res = await Axios.get('/music?search=' + search + '&cursor=' + cursor)
	console.log(search)
	return res.data
}

export const getSong = async (id: string) => {
	const res = await Axios.get('/music/' + id)
	return res.data
}

export const getSongUrl = async (id: string) => {
	const res = await Axios.get('/music/stream/' + id)
	return res.data
}

export const addSong = async (prevState: any, formData: FormData) => {
	const data = {
		title: formData.get('title'),
		author: formData.get('author'),
		image: formData.get('image'),
		song: formData.get('song'),
	}

	try {
		const res = await Axios.post('music', data)
		if (res.status == 201) {
			return {
				succss: true,
				data: res.data,
			}
		}
	} catch (error: any) {
		console.log(error)
		if (error?.response?.status == 422) {
			return {
				errors: error?.response?.data?.errors,
			}
		}
	}
}

export const addLibrary = async (id: string) => {
	const res = await Axios.post('/music/add-library', { music_id: id })
	return res.data
}

export const getLibrary = async (cursor: string | null = null) => {
	const res = await Axios.get('/library?cursor=' + cursor)
	return res.data
}

export const deleteMusic = async (id: string) => {
	const res = await Axios.delete('/music/' + id)
	return res.data
}
