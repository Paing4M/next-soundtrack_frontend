import { create } from 'zustand'

interface AddSongModalStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const useAddSongModal = create<AddSongModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))

export default useAddSongModal
