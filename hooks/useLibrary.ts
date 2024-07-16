import { getLibrary } from '@/actions/song'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'

const useLibrary = () => {
	const [songs, setSongs] = useState<ApiResponseType<MusicType[]> | undefined>(
		undefined
	)
	const { data } = useSession()

	const getSongs = async () => {
		const res = await getLibrary()
		// console.log(res)
		setSongs(res)
	}

	useEffect(() => {
		if (!data?.user) return

		getSongs()
	}, [data?.user])

	return useMemo(
		() => ({
			songs,
			setSongs,
		}),
		[songs]
	)
}

export default useLibrary
