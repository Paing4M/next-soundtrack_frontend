'use client'

import { useFormStatus } from 'react-dom'

const SubmitBtn = ({ children }: { children: React.ReactNode }) => {
	const { pending } = useFormStatus()

	return (
		<button
			disabled={pending}
			type='submit'
			className={`flex w-full mt-6 justify-center rounded-md bg-neutral-200 hover:bg-white transition px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm ${
				pending ? 'opacity-80' : ''
			}`}
		>
			{pending ? 'Processing ...' : children}
		</button>
	)
}

export default SubmitBtn
