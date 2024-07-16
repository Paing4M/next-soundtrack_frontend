import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import Slider from './Slider'

interface VolumeControlProps {
	volume: number
	handleVolumeChange: (value: number) => void
}

const VolumeControl: React.FC<VolumeControlProps> = ({
	volume,
	handleVolumeChange,
}) => {
	const icon = volume ? (
		<SpeakerWaveIcon className='w-5 text-white' />
	) : (
		<SpeakerXMarkIcon className='w-5 text-white' />
	)

	return (
		<div className='flex w-[50%] items-center cursor-pointer gap-x-1'>
			{icon}

			<Slider onChange={handleVolumeChange} value={volume} />
		</div>
	)
}

export default VolumeControl
