import { getSong } from '@/actions/song'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

const useGetSongById = (id: string) => {
	const [loading, setLoading] = useState(false)
	const [song, setSong] = useState<MusicType | undefined>(undefined)
	const [songUrl, setSongUrl] = useState<string | undefined>(undefined)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!id) return

		const getSongUrl = async () => {
			try {
				const res = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/music/stream/${id}`,
					{
						headers: {
							Accept: 'audio/mpeg',
						},
						responseType: 'blob',
					}
				)

				// console.log(res)

				if (res.data) {
					const blob = new Blob([res.data], { type: 'audio/mpeg' })
					const url = URL.createObjectURL(blob)
					setSongUrl(url)
					setError(null)
				}
			} catch (error: any) {
				setLoading(false)
				if (error.response.status === 404) {
					setError(error.response.data.message)
					return
				}
			}
		}

		const getActiveSong = async () => {
			setLoading(true)
			try {
				const res = await getSong(id)
				if (res) {
					setLoading(false)
					setSong(res.data)
					setError(null)
				}
			} catch (error: any) {
				setLoading(false)
				if (error.response.status === 404) {
					setError(error.response.data.message)
				}
			}
		}
		getActiveSong()
		getSongUrl()
	}, [id])

	return useMemo(
		() => ({
			song,
			loading,
			songUrl,
			error,
			setError,
		}),
		[loading, song, songUrl, error]
	)
}

export default useGetSongById
