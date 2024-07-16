import * as RadixSlider from '@radix-ui/react-slider'

interface SliderProps {
	value: number
	onChange: (value: number) => void
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
	const handleOnChange = (newValue: number[]) => {
		onChange?.(newValue[0])
	}

	return (
		<RadixSlider.Root
			className='relative flex items-center select-none touch-none w-full h-10 cursor-pointer'
			defaultValue={[1]}
			onValueChange={handleOnChange}
			value={[value]}
			max={1}
			step={0.1}
			aria-label='Volume'
		>
			<RadixSlider.Track className='bg-neutral-400 relative grow rounded-full h-[3px]'>
				<RadixSlider.Range className='absolute bg-white rounded-full h-full'></RadixSlider.Range>
			</RadixSlider.Track>
			<RadixSlider.Thumb
				className='block w-3 h-3 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none'
				aria-label='Time'
			/>
		</RadixSlider.Root>
	)
}

export default Slider
