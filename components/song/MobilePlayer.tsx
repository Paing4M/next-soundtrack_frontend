'use client'

import BottomSheet from 'react-draggable-bottom-sheet'
import { BackwardIcon, ForwardIcon, HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import MediaItem from './MediaItem'
import PlayPauseIcon from './PlayPauseIcon'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Seeker from './Seeker'
import MobileControl from './MobileControl'
import MobileVolumeControl from './MobileVolumeControl'
import { formatTime } from '@/lib/utlis'
import useMobilePlayer from '@/hooks/useMobilePlayer'

interface MobilePlayerProps {
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

const MobilePlayer: React.FC<MobilePlayerProps> = ({
	song,
	onPlayPrev,
	onPlayNext,
	duration,
	currentTime,
	isPlaying,
	handleClick,
	volume,
	handleVolumeChange,
	handleValueChange,
	addToLibrary,
}) => {
	const { isOpen, onClose, onOpen } = useMobilePlayer()
	const [width, setWidth] = useState(0)

	const close = () => {
		onClose()
	}

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWidth(window.innerWidth)
		})

		if (width > 768) {
			onClose()
		}

		return () => {
			window.removeEventListener('resize', () => {
				setWidth(window.innerWidth)
			})
		}
	}, [width])

	return (
		<>
			<div
				onClick={onOpen}
				className='flex items-center h-full justify-between md:hidden relative cursor-pointer z-[1]'
			>
				<div className='flex items-center gap-4'>
					<MediaItem song={song} />

					<button
						className='p-3'
						onClick={(e) => {
							e.stopPropagation()
							addToLibrary(song.id!)
						}}
					>
						{song.isInUserLibrary ? (
							<HeartIcon className='w-5' />
						) : (
							<HeartOutlineIcon className='w-5' />
						)}
					</button>
				</div>
				<div
					onClick={(e) => e.stopPropagation()}
					className='flex  items-center gap-1 z-10'
				>
					<button
						onClick={(e) => {
							e.stopPropagation()
							onPlayPrev()
						}}
						className='p-3'
					>
						<BackwardIcon className='hidden xs:block text-neutral-400  hover:text-white  w-7' />
					</button>
					<div className=''>
						<PlayPauseIcon
							onClick={(e) => {
								e.stopPropagation()
								handleClick()
							}}
							isPlaying={isPlaying}
						/>
					</div>
					<button
						onClick={(e) => {
							e.stopPropagation()
							onPlayNext()
						}}
						className='p-3'
					>
						<ForwardIcon className='text-neutral-400  hover:text-white w-7' />
					</button>
				</div>
			</div>

			<BottomSheet
				classNames={{
					bottomSheet: 'flex md:hidden',
					dragIndicator: {
						wrap: 'bg-secondary-color',
					},
					backdrop: 'backdrop-blur-md opacity-80',
				}}
				isOpen={isOpen}
				close={close}
			>
				<div className='bg-secondary-color w-full h-full text-white px-6 p-3 pb-6 '>
					<div className='w-full h-full max-w-[350px] mx-auto'>
						<Image
							src={song.image ? song.image : '/assets/logo.png'}
							className='object-cover rounded-lg w-[350px] h-[330px]'
							alt='img'
							width={280}
							height={450}
							priority
						/>

						<div className='my-4 flex items-start justify-between'>
							<div>
								<h2 className='text-lg'>{song.title}</h2>
								<p className='text-sm text-neutral-400'>
									{song.author}
								</p>
							</div>
							<button onClick={() => addToLibrary(song.id!)}>
								{song.isInUserLibrary ? (
									<HeartIcon className='w-5' />
								) : (
									<HeartOutlineIcon className='w-5' />
								)}
							</button>
						</div>

						<div className='my-4 mb-2'>
							<div className='flex flex-col'>
								<Seeker
									duration={duration}
									currentTime={currentTime}
									handleValueChange={handleValueChange}
								/>
								<div className='flex items-center justify-between'>
									<span className='text-[12px] text-neutral-400'>
										{formatTime(currentTime)}
									</span>
									<span className='text-[12px] text-neutral-400'>
										{formatTime(duration)}
									</span>
								</div>
							</div>
						</div>

						<div className='mb-2'>
							<MobileControl
								isPlaying={isPlaying}
								handleClick={handleClick}
								onPlayNext={onPlayNext}
								onPlayPrev={onPlayPrev}
							/>
						</div>

						<div>
							<MobileVolumeControl
								value={volume}
								handleVolumeChange={handleVolumeChange}
							/>
						</div>
					</div>
				</div>
			</BottomSheet>
		</>
	)
}

export default MobilePlayer
