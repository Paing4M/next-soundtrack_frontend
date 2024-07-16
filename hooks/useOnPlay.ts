import usePlayer from './usePlayer'

const useOnPlay = (songs: MusicType[]) => {
	const { setId, setIds } = usePlayer()

	const onPlay = (id: string) => {
		if (!id) {
			return
		}

		const ids = songs?.map((song) => song.id) as string[]

		setId(id!)
		setIds(ids)
	}

	return onPlay
}

export default useOnPlay
