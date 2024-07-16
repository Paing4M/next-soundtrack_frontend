import { PlayIcon } from '@heroicons/react/24/solid'
import { ButtonHTMLAttributes } from 'react'

interface PlayButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PlayButton: React.FC<PlayButtonProps> = ({ ...props }) => {
	return (
		<button
			{...props}
			className='p-2 opacity-0 rounded-full bg-green-500 transition hover:scale-110 group-hover:opacity-100  translate-y-1/4'
		>
			<PlayIcon className='w-6 translate-x-[2px] text-black' />
		</button>
	)
}

export default PlayButton
