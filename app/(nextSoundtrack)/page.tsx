import { auth } from '@/auth'
import Header from '@/components/header/Header'
import SongList from '@/components/song/SongList'
import axios from 'axios'

const getSongs = async (token: string = '') => {
	const res = await axios.get(
		process.env.NEXT_PUBLIC_BACKEND_URL + '/api/music',
		{
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	)
	return res.data
}

const HomePage = async () => {
	const session = await auth()

	const songs = await getSongs(session?.user?.token!)

	return (
		<div className='h-[calc(100vh-80px)] text-white bg-bg-color flex-1 flex flex-col'>
			<Header user={session?.user!} />
			<div className='pb-4 pt-8 px-6 flex-1 overflow-hidden overflow-y-auto scrollbar-hide'>
				<h2 className='text-lg mb-3'>Latest Songs</h2>

				<SongList songs={songs} />
			</div>
		</div>
	)
}

export default HomePage
