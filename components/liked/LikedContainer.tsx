'use client'

import useLibrary from '@/hooks/useLibrary'
import useOnPlay from '@/hooks/useOnPlay'
import { useInView } from 'react-intersection-observer'
import LoadMore from '../LoadMore'
import LibrarySongItem from '../library/LibrarySongItem'
import { sleep } from '@/lib/utlis'
import { getLibrary } from '@/actions/song'
import { useEffect } from 'react'

const LikedContainer = () => {
	const { songs, setSongs } = useLibrary()
	const onPlay = useOnPlay(songs?.data!)
	const { ref, inView } = useInView()

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

	return (
		<>
			{songs && songs?.data.length == 0 && (
				<p className='text-neutral-400 text-center'>
					Your library is empty.
				</p>
			)}

			{songs &&
				songs?.data?.length > 0 &&
				songs?.data.map((song, idx) => (
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

export default LikedContainer
