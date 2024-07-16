'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

const NavigationBtns = () => {
	const router = useRouter()

	return (
		<div className='hidden md:flex gap-4'>
			<button
				className='bg-bg-color group flex items-center justify-center p-[6px]  rounded-full'
				onClick={() => router.back()}
			>
				<ChevronLeftIcon className='text-neutral-300 transition w-5 group-hover:text-white translate-x-[-2px]' />
			</button>
			<button
				className='bg-bg-color group flex items-center justify-center p-[6px]  rounded-full'
				onClick={() => router.forward()}
			>
				<ChevronRightIcon className='text-neutral-300 transition w-5 group-hover:text-white translate-x-[2px]' />
			</button>
		</div>
	)
}

export default NavigationBtns
