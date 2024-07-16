import Image from 'next/image'

interface MediaItemProps {
	song: MusicType
}

const MediaItem: React.FC<MediaItemProps> = ({ song }) => {
	return (
		<div className='flex gap-x-3 items-center'>
			<div className=' overflow-hidden rounded-md w-12 h-12'>
				<Image
					className='object-cover w-full h-full'
					src={song?.image ? song.image : '/assets/logo.png'}
					width={48}
					height={48}
					priority
					alt='media-img'
				/>
			</div>

			<div>
				<p className='font-semibold text-[15px] tracking-wider capitalize'>
					{song?.title}
				</p>
				<p className='text-neutral-400 capitalize text-[13px] '>
					By {song?.author}
				</p>
			</div>
		</div>
	)
}

export default MediaItem
