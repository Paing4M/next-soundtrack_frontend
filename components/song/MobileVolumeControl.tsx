import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import Slider from './Slider'

interface MobileVolumeControlProps {
	value: number
	handleVolumeChange: (value: number) => void
}

const MobileVolumeControl: React.FC<MobileVolumeControlProps> = ({
	value,
	handleVolumeChange,
}) => {
	return (
		<div className='flex gap-2'>
			<SpeakerXMarkIcon className='text-neutral-400 w-5' />

			<Slider value={value} onChange={handleVolumeChange} />

			<SpeakerWaveIcon className='text-neutral-400 w-5' />
		</div>
	)
}

export default MobileVolumeControl
