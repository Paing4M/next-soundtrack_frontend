'use client'

import Image from 'next/image'
import {
	HomeIcon,
	MagnifyingGlassIcon,
	MusicalNoteIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Box from './Box'
import LibrarySongList from '../library/LibrarySongList'
import { useState } from 'react'

const Sidebar = () => {
	const pathname = usePathname()

	const links = [
		{
			name: 'Home',
			icon: HomeIcon,
			href: '/',
			active: !pathname.includes('search'),
		},
		{
			name: 'Search',
			icon: MagnifyingGlassIcon,
			href: '/search',
			active: pathname.includes('search'),
		},
	]

	return (
		<div className='hidden md:flex flex-col gap-y-2'>
			<Box>
				<Link href={'/'}>
					<div className='h-[80px] flex items-center gap-3'>
						<Image
							width={70}
							height={70}
							src='/assets/logo.png'
							alt='logo'
							// placeholder='blur'
							// blurDataURL='/assets/logo.png'
						/>
						<h1>Next Soundtrack</h1>
					</div>
				</Link>

				<div className='mt-6'>
					<ul>
						{links.map(({ name, icon: Icon, href, active }) => (
							<li key={name}>
								<Link
									className={`flex  rounded px-2 items-center py-2 mb-2 hover:text-white transition ${
										active ? 'text-white' : 'text-neutral-400'
									}`}
									href={href}
								>
									<Icon className='w-6' />
									<span className='inline-block ml-4'>{name}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</Box>

			<Box className='h-[calc(100vh-288px)] py-4 flex flex-col'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-x-4 text-neutral-400 mb-4'>
						<MusicalNoteIcon className='w-6' />
						<span>Your Library</span>
					</div>
				</div>

				<div className='flex-1 overflow-hidden overflow-y-auto  scrollbar-hide'>
					<LibrarySongList />
				</div>
			</Box>
		</div>
	)
}

export default Sidebar
