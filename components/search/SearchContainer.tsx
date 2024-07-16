'use client'

import { getSongs } from '@/actions/song'
import { useEffect, useState } from 'react'
import MobileSongItem from '../song/MobileSongItem'
import useOnPlay from '@/hooks/useOnPlay'
import { useInView } from 'react-intersection-observer'
import LoadMore from '../LoadMore'
import { sleep } from '@/lib/utlis'

interface SearchContainerProps {
	searchParam?: string
}

const SearchContainer: React.FC<SearchContainerProps> = ({ searchParam }) => {
	const [songs, setSongs] = useState<ApiResponseType<MusicType[]> | undefined>(
		undefined
	)
	const [loading, setLoading] = useState(false)

	const onPlay = useOnPlay(songs?.data!)
	const { ref, inView } = useInView()

	useEffect(() => {
		if (searchParam) {
			setLoading(true)
			fetchSongs(searchParam).then((res: ApiResponseType<MusicType[]>) => {
				if (res?.data?.length > 0) {
					setLoading(false)
					setSongs(res)
				} else {
					setLoading(false)
				}
			})
		}
	}, [searchParam])

	useEffect(() => {
		if (!searchParam) setSongs(undefined)
	}, [searchParam, songs])

	const fetchSongs = async (search: string) => {
		if (search) {
			const res = await getSongs(search)
			return res
		}
	}

	useEffect(() => {
		if (inView) {
			if (songs?.meta.next_cursor) {
				loadMore()
			}
		}
	}, [inView])

	const loadMore = async () => {
		await sleep(2000)

		const res = (await getSongs(
			'',
			songs?.meta.next_cursor!
		)) as ApiResponseType<MusicType[]>
		// console.log(res)
		if (res.data) {
			let exists = songs?.data.some((song) => song.id !== res.data?.[0].id)

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
		<div className='w-full h-full text-white'>
			{searchParam && songs && (
				<h2 className='text-lg font-semibold tracking-wide'>
					Search result for{' '}
					<span className='inline-block border-b-2 border-blue-400'>
						{searchParam}
					</span>
				</h2>
			)}

			{searchParam && !songs && !loading && (
				<p className='text-neutral-400 text-center'>
					No result for{' '}
					<span className='text-white inline-block border-b-2 border-blue-400'>
						{searchParam}
					</span>
				</p>
			)}

			<div className='flex flex-col mt-3 gap-y-2'>
				{songs?.data?.length! > 0 &&
					songs?.data.map((song, idx) => (
						<MobileSongItem
							key={song.id! + idx}
							handleClick={(id) => onPlay(id)}
							song={song}
						/>
					))}
			</div>

			{songs?.meta.next_cursor && (
				<div
					ref={ref}
					className='w-full flex items-center justify-center mt-4'
				>
					<LoadMore />
				</div>
			)}
		</div>
	)
}

export default SearchContainer
