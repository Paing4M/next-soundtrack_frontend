'use client'

import Image from 'next/image'

import Link from 'next/link'
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { CustomUser } from '@/auth'
import useAuthModal from '@/hooks/useAuthModal'
import HeaderUserMenu from './HeaderUserMenu'
import NavigationBtns from '../nav/NavigationBtns'

const HeaderTop = ({ user }: { user: CustomUser }) => {
	const { onOpen } = useAuthModal()

	return (
		<div className='h-[80px] flex items-center w-full'>
			<div className='flex items-center justify-between w-full'>
				<div className='flex md:hidden items-center gap-3'>
					<Link href={'/'}>
						<div className='block md:hidden w-20 h-20'>
							<Image
								width={80}
								height={80}
								src='/assets/logo.png'
								priority
								className='object-cover'
								alt='logo'
							/>
						</div>
					</Link>

					<Link
						className='block md:hidden p-2 rounded-full bg-white'
						href={'/'}
					>
						<HomeIcon className='text-black w-5' />
					</Link>
					<Link
						className='block md:hidden p-2 rounded-full bg-white'
						href={'/search'}
					>
						<MagnifyingGlassIcon className='text-black w-5' />
					</Link>
				</div>
				<NavigationBtns />

				{user ? (
					<HeaderUserMenu user={user} />
				) : (
					<button
						onClick={onOpen}
						className='px-3 py-1 bg-white text-black rounded-full'
					>
						Login
					</button>
				)}
			</div>
		</div>
	)
}

export default HeaderTop
