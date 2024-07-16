'use client'

import useAddSongModal from '@/hooks/useAddSongModal'
import { PlusIcon } from '@heroicons/react/24/solid'

const AddSong = () => {
	const { onOpen } = useAddSongModal()

	return (
		<button
			onClick={onOpen}
			className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10 data-[focus]:bg-white/10'
		>
			<PlusIcon className='w-5 text-white' />
			Add Song
		</button>
	)
}

export default AddSong
