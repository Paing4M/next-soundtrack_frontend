'use client'

import { PlusIcon } from '@heroicons/react/24/solid'
import { signIn } from 'next-auth/react'

const AddLibraryBtn = () => {
	return (
		<button onClick={() => {}} className='text-neutral-400'>
			<PlusIcon className='w-6' />
		</button>
	)
}

export default AddLibraryBtn
