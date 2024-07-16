import { auth } from '@/auth'
import HeaderTop from '@/components/header/HeaderTop'
import LikedContainer from '@/components/liked/LikedContainer'
import { HeartIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const LikedPage = async () => {
	const session = await auth()

	return (
		<div className='w-full h-[calc(100vh-80px)] px-6 text-white flex flex-col'>
			<HeaderTop user={session?.user!} />

			<Link
				href={'/liked'}
				className='w-full max-w-[250px] mt-3 h-[60px] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 overflow-hidden flex items-center gap-4'
			>
				<div className='w-[60px] flex items-center justify-center h-full bg-gradient-to-br from-[#3FA2F6] to-bg-white'>
					<HeartIcon className='w-8' />
				</div>

				<p className='pr-4 text-sm tracking-wider'>Enjoy Your Song</p>
			</Link>

			<div className='pb-4 mt-4 flex-1 overflow-hidden overflow-y-auto scrollbar-hide'>
				<LikedContainer />
			</div>
		</div>
	)
}

export default LikedPage
