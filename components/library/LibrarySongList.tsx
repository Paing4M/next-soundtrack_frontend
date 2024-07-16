'use client'

import { useEffect, useMemo, useState } from 'react'
import LibrarySongItem from './LibrarySongItem'
import useOnPlay from '@/hooks/useOnPlay'
import { useEventBus } from '@/providers/EventBusProvider'
import useLibrary from '@/hooks/useLibrary'
import { useInView } from 'react-intersection-observer'
import { sleep } from '@/lib/utlis'
import { getLibrary } from '@/actions/song'
import LoadMore from '../LoadMore'

interface EventDataInterface {
	status: number
	music: MusicType
}

const LibrarySongList = () => {
	const { songs, setSongs } = useLibrary()
	const [orderSongs, setOrderSongs] = useState<MusicType[]>()
	const onPlay = useOnPlay(songs?.data!)
	const { on } = useEventBus()
	const { inView, ref } = useInView()

	const handleEvent = (e: EventDataInterface) => {
		if (e.status == 201) {
			const search = songs?.data.some((song) => song.id == e.music.id)
			if (!search)
				setSongs((prev) =>
					prev
						? {
								...prev,
								data: [e.music, ...prev.data],
						  }
						: {
								data: [e.music],
								links: {},
								meta: {},
						  }
				)
		}

		if (e.status == 200) {
			const updatedSong = songs?.data.filter((song) => song.id != e.music.id)
			setSongs((prev) =>
				prev ? { ...prev, data: updatedSong! } : undefined
			)
		}
	}

	useEffect(() => {
		if (songs) {
			const event = on('library', handleEvent)

			return () => {
				event()
			}
		}
	}, [on, songs])

	useEffect(() => {
		if (inView) {
			if (songs?.meta.next_cursor) {
				loadMore()
			}
		}
	}, [inView])

	const loadMore = async () => {
		await sleep(2000)

		const res = (await getLibrary(
			songs?.meta.next_cursor!
		)) as ApiResponseType<MusicType[]>

		if (res.data) {
			let exists = songs?.data.some((song) => song.id !== res.data?.[0]?.id)

			if (exists) {
				setSongs((prev) => ({
					data: [...prev?.data!, ...res.data],
					links: {
						...res.links,
						next: res.links.next,
						prev: res.links.prev,
					},
					meta: {
						...res.meta,
						next_cursor: res.meta.next_cursor,
						prev_cursor: res.meta.prev_cursor,
					},
				}))
			}
		}
	}

	useEffect(() => {
		if (songs) {
			const orderSongs = [...songs.data].sort((a, b) => {
				if (a?.title?.toLowerCase()! < b?.title?.toLowerCase()!) {
					return -1
				}
				if (a?.title?.toLowerCase()! > b?.title?.toLowerCase()!) {
					return 1
				}
				return 0
			})

			setOrderSongs(orderSongs)
		}
	}, [songs])

	if (!songs && !orderSongs) return

	return (
		<>
			{orderSongs?.length == 0 && (
				<p className='text-neutral-400 text-center'>
					Your library is empty.
				</p>
			)}

			{orderSongs &&
				orderSongs?.length > 0 &&
				orderSongs?.map((song, idx) => (
					<LibrarySongItem
						key={song.id! + idx}
						song={song}
						// handleClick={handleClick}
						onPlay={() => onPlay(song?.id!)}
					/>
				))}

			{songs?.meta.next_cursor && (
				<div
					ref={ref}
					className='w-full flex items-center justify-center mt-4'
				>
					<LoadMore />
				</div>
			)}
		</>
	)
}

export default LibrarySongList
