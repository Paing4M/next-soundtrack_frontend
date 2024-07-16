'use client'

import useAuthModal from '@/hooks/useAuthModal'

const NavBtns = () => {
	const { onOpen } = useAuthModal()

	return (
		<div className='flex gap-6 items-center '>
			{/* <button
				onClick={onOpen}
				className='hidden sm:block text-neutral-200 hover:text-white transition'
			>
				Sign Up
			</button> */}
			<button
				onClick={onOpen}
				className='px-3 py-1 bg-white text-black rounded-full'
			>
				Login
			</button>
		</div>
	)
}

export default NavBtns
