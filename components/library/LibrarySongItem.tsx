'use client'

import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import MediaItem from '../song/MediaItem'
import usePlayer from '@/hooks/usePlayer'

interface LibrarySongItemProps {
	song: MusicType
	handleClick?: (id: string) => void
	onPlay: () => void
}

const LibrarySongItem: React.FC<LibrarySongItemProps> = ({
	song,
	handleClick,
	onPlay,
}) => {
	const { activeId } = usePlayer()

	return (
		<div
			onClick={onPlay}
			className={`flex items-center justify-between px-2 py-3 mb-1 last:mb-0  rounded-lg hover:bg-neutral-400/10 transition cursor-pointer ${
				activeId == song?.id ? 'bg-neutral-400/10' : ''
			}`}
		>
			<MediaItem song={song} />

			{/* <button
				onClick={(e) => {
					e.stopPropagation()
					handleClick(song.id!)
				}}
				className='p-2'
			>
				{song.isInUserLibrary ? (
					<HeartOutline className='w-5' />
				) : (
					<HeartIcon className='w-5' />
				)}
			</button> */}
		</div>
	)
}

export default LibrarySongItem
