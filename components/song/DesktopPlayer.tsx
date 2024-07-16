import { formatTime } from '@/lib/utlis'
import VolumeControl from './VolumeControl'
import Seeker from './Seeker'
import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid'
import PlayPauseIcon from './PlayPauseIcon'
import MediaItem from './MediaItem'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'

interface DesktopPlayerProps {
	song: MusicType
	onPlayPrev: () => void
	onPlayNext: () => void
	duration: number
	currentTime: number
	isPlaying: boolean
	handleClick: () => void
	volume: number
	handleVolumeChange: (value: number) => void
	handleValueChange: (value: number[]) => void
	addToLibrary: (id: string) => void
}

const DesktopPlayer: React.FC<DesktopPlayerProps> = ({
	song,
	onPlayNext,
	onPlayPrev,
	duration,
	currentTime,
	isPlaying,
	handleClick,
	volume,
	handleVolumeChange,
	handleValueChange,
	addToLibrary,
}) => {
	return (
		<div className='hidden md:grid grid-cols-2 sm:grid-cols-3 h-full content-center '>
			<div className='flex items-center gap-4'>
				<MediaItem song={song} />

				<button onClick={() => addToLibrary(song.id!)} className='p-2'>
					{song.isInUserLibrary ? (
						<HeartIcon className='w-5' />
					) : (
						<HeartOutlineIcon className='w-5' />
					)}
				</button>
			</div>

			<div className='flex flex-col space-y-1'>
				<div className='flex gap-x-6 items-center justify-center '>
					<button>
						<BackwardIcon
							onClick={onPlayPrev}
							className='text-neutral-400 hover:text-white w-5'
						/>
					</button>
					<PlayPauseIcon onClick={handleClick} isPlaying={isPlaying} />
					<button>
						<ForwardIcon
							onClick={onPlayNext}
							className='text-neutral-400 hover:text-white w-5'
						/>
					</button>
				</div>

				<div className='flex gap-2 items-center'>
					<span className='text-[12px] text-gray-300'>
						{formatTime(currentTime)}
					</span>

					<Seeker
						handleValueChange={handleValueChange}
						duration={duration}
						currentTime={currentTime}
					/>

					<span className='text-[12px] text-gray-300'>
						{formatTime(duration)}
					</span>
				</div>
			</div>

			<div className='sm:flex hidden justify-center'>
				<VolumeControl
					handleVolumeChange={handleVolumeChange}
					volume={volume}
				/>
			</div>
		</div>
	)
}

export default DesktopPlayer
