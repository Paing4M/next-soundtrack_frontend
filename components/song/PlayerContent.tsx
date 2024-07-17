'use client'

import usePlayer from '@/hooks/usePlayer'
import { useEffect, useRef, useState } from 'react'
// import MobilePlayer from './MobilePlayer'
import DesktopPlayer from './DesktopPlayer'
import { addLibrary } from '@/actions/song'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useEventBus } from '@/providers/EventBusProvider'
import dynamic from 'next/dynamic'

const MobilePlayer = dynamic(() => import('./MobilePlayer'), { ssr: false })

const PlayerContent = ({
	song: initial,
	songUrl,
}: {
	song: MusicType
	songUrl: string
}) => {
	const [song, setSong] = useState<MusicType>(initial)
	const [isPlaying, setIsPlaying] = useState(true)
	const [duration, setDuration] = useState(0)
	const [volume, setVolume] = useState(0.8)
	const [currentTime, setCurrentTime] = useState(0)

	const audioRef = useRef<HTMLAudioElement | null>(null)

	const player = usePlayer()
	const { data } = useSession()
	const { emit } = useEventBus()

	const onPlayNext = () => {
		if (player.ids?.length == 0) {
			return
		}

		setIsPlaying(true)

		const currentIdx = player.ids?.findIndex((i) => i == player.activeId)
		const nextSong = player.ids?.[currentIdx! + 1]

		if (!nextSong) {
			return player.setId(player?.ids?.[0]!)
		}

		player.setId(nextSong)
	}

	const onPlayPrev = () => {
		if (player.ids?.length == 0) {
			return
		}

		setIsPlaying(true)

		const currentIdx = player.ids?.findIndex((i) => i == player.activeId)
		const prevSong = player.ids?.[currentIdx! - 1]

		if (!prevSong) {
			return player.setId(player?.ids?.[player.ids.length - 1]!)
		}

		player.setId(prevSong)
	}

	useEffect(() => {
		if (isPlaying) {
			audioRef?.current?.play()
			const audioDuration = audioRef?.current?.duration
			setDuration(audioDuration!)
		}
	}, [isPlaying])

	const handleClick = () => {
		if (!isPlaying) {
			audioRef?.current?.play()
		} else {
			audioRef?.current?.pause()
		}

		setIsPlaying((prev) => !prev)
	}

	const handleVolumeChange = (value: number) => {
		if (audioRef.current) {
			audioRef.current.volume = value
		}
		setVolume(value)
	}

	const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) => {
		setDuration(e.currentTarget.duration)
		setCurrentTime(e.currentTarget.currentTime)
	}

	const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
		setCurrentTime(e.currentTarget.currentTime)
		setDuration(audioRef?.current?.duration!)
	}

	const handleValueChange = (value: number[]) => {
		if (audioRef.current) {
			const newTime = value[0]
			audioRef.current.currentTime = newTime
			setCurrentTime(newTime)
		}
	}

	const handleEnded = () => {
		setIsPlaying(false)
		onPlayNext()
	}

	const addToLibrary = async (id: string) => {
		if (!data?.user) {
			toast.error('Please login first.')

			return
		}

		const res = await addLibrary(id)
		if (res) {
			if (res?.status === 200) {
				setSong((prev) => ({ ...prev, isInUserLibrary: false }))
			} else if (res?.status === 201) {
				setSong((prev) => ({ ...prev, isInUserLibrary: true }))
			}
			emit('library', { status: res.status, music: res.music })

			toast.success(
				res?.status == 201
					? 'Added to your library'
					: 'Removed from your library'
			)
		}
	}

	return (
		<>
			<DesktopPlayer
				song={song}
				onPlayNext={onPlayNext}
				onPlayPrev={onPlayPrev}
				duration={duration}
				currentTime={currentTime}
				isPlaying={isPlaying}
				handleClick={handleClick}
				volume={volume}
				handleVolumeChange={handleVolumeChange}
				handleValueChange={handleValueChange}
				addToLibrary={addToLibrary}
			/>

			<MobilePlayer
				song={song}
				onPlayNext={onPlayNext}
				onPlayPrev={onPlayPrev}
				duration={duration}
				currentTime={currentTime}
				isPlaying={isPlaying}
				handleClick={handleClick}
				volume={volume}
				handleVolumeChange={handleVolumeChange}
				handleValueChange={handleValueChange}
				addToLibrary={addToLibrary}
			/>

			<audio
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={handleEnded}
				ref={audioRef}
				src={songUrl}
				className='hidden'
				aria-label='audio'
			></audio>
		</>
	)
}

export default PlayerContent
