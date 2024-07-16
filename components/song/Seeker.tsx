'use client'

import * as Slider from '@radix-ui/react-slider'

interface SeekerProps {
	handleValueChange: (value: number[]) => void
	currentTime: number
	duration: number
}

const Seeker: React.FC<SeekerProps> = ({
	handleValueChange,
	currentTime,
	duration,
}) => {
	return (
		<Slider.Root
			className='relative flex items-center select-none touch-none w-full cursor-pointer h-5'
			min={0}
			onValueChange={handleValueChange}
			value={[currentTime]}
			max={duration}
		>
			<Slider.Track className='bg-neutral-400 relative grow rounded-full h-[3px]'>
				<Slider.Range className='absolute bg-white rounded-full h-full' />
			</Slider.Track>
			<Slider.Thumb
				className='block w-3 h-3 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none'
				aria-label='Time'
			/>
		</Slider.Root>
	)
}

export default Seeker
