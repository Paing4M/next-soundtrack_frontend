'use client'

import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid'
import PlayPauseIcon from './PlayPauseIcon'

interface MobileControlProps {
	onPlayPrev: () => void
	onPlayNext: () => void
	handleClick: () => void
	isPlaying: boolean
}

const MobileControl: React.FC<MobileControlProps> = ({
	onPlayPrev,
	onPlayNext,
	handleClick,
	isPlaying,
}) => {
	return (
		<div className='flex items-center justify-evenly gap-4 w-[90%] mx-auto'>
			<button>
				<BackwardIcon
					onClick={onPlayPrev}
					className='text-neutral-400 hover:text-white w-7'
				/>
			</button>
			<PlayPauseIcon onClick={handleClick} isPlaying={isPlaying} />
			<button>
				<ForwardIcon
					onClick={onPlayNext}
					className='text-neutral-400 hover:text-white w-7'
				/>
			</button>
		</div>
	)
}

export default MobileControl
