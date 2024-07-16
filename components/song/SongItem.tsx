'use client'

import Image from 'next/image'
import PlayButton from './PlayButton'
import usePlayer from '@/hooks/usePlayer'
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import React from 'react'
import { deleteMusic } from '@/actions/song'
import toast from 'react-hot-toast'

interface SongItemProps {
	song: MusicType
	handleClick: (id: string) => void
	handleDelete: (e: React.MouseEvent, id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({
	song,
	handleClick,
	handleDelete,
}) => {
	const { activeId } = usePlayer()
	const session = useSession()

	return (
		<div
			onClick={() => handleClick(song?.id!)}
			className={`relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4  cursor-pointer  hover:bg-neutral-400/10 transition p-3  sm:w-auto ${
				activeId == song?.id ? 'bg-neutral-400/10' : 'bg-neutral-400/5'
			}`}
		>
			<>
				<div className=' aspect-square w-full h-full rounded-md overflow-hidden'>
					<Image
						src={song.image ? song.image : '/assets/logo.png'}
						width={200}
						height={200}
						className='object-cover w-full h-full'
						alt='music-img'
						priority
					/>
				</div>
			</>

			<div className='pt-4 flex items-start flex-col w-full gap-y-1'>
				<p className='truncate capitalize font-semibold tracking-wider w-full'>
					{song?.title}
				</p>
				<p className='truncate capitalize text-sm text-neutral-400 w-full'>
					By {song?.author}
				</p>
			</div>

			<div className='absolute bottom-[90px] right-4'>
				<PlayButton onClick={() => handleClick(song?.id!)} />
			</div>

			{session?.data?.user?.role == 1 && (
				<div className='opacity-0 transition group-hover:opacity-100 absolute top-3 right-3'>
					<Menu>
						<MenuButton
							onClick={(e) => e.stopPropagation()}
							className='p-1'
						>
							<EllipsisVerticalIcon className='w-6' />
						</MenuButton>
						<MenuItems
							transition
							anchor='bottom end'
							className='w-52 origin-top-right rounded-xl border border-white/5 bg-secondary-color p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
						>
							<MenuItem>
								<button
									onClick={(e) => handleDelete(e, song?.id!)}
									className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'
								>
									<TrashIcon className='size-4 fill-white/30' />
									Delete
								</button>
							</MenuItem>
						</MenuItems>
					</Menu>
				</div>
			)}
		</div>
	)
}

export default SongItem
