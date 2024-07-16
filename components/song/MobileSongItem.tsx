'use client'

import { useSession } from 'next-auth/react'
import MediaItem from './MediaItem'
import usePlayer from '@/hooks/usePlayer'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/solid'

interface MobileSongItemProps {
	song: MusicType
	handleClick: (id: string) => void
	handleDelete?: (e: React.MouseEvent, id: string) => void
}

const MobileSongItem: React.FC<MobileSongItemProps> = ({
	song,
	handleClick,
	handleDelete,
}) => {
	const { activeId } = usePlayer()
	const session = useSession()

	return (
		<div
			onClick={() => handleClick(song.id!)}
			className={`w-full h-full flex items-center justify-between group hover:bg-neutral-400/10 cursor-pointer p-2 rounded-md  transition ${
				activeId == song?.id ? 'bg-neutral-400/10' : ''
			}`}
		>
			<MediaItem song={song} />

			{!!handleDelete && session?.data?.user?.role == 1 && (
				<Menu>
					<MenuButton onClick={(e) => e.stopPropagation()} className='p-1'>
						<EllipsisVerticalIcon className='w-6' />
					</MenuButton>
					<MenuItems
						transition
						anchor='bottom end'
						className='w-52 origin-top-right rounded-xl border border-white/5 bg-secondary-color p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
					>
						<MenuItem>
							<button
								onClick={(e) => handleDelete?.(e, song?.id!)}
								className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'
							>
								<TrashIcon className='size-4 fill-white/30' />
								Delete
							</button>
						</MenuItem>
					</MenuItems>
				</Menu>
			)}
		</div>
	)
}

export default MobileSongItem
