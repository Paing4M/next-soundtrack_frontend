import { create } from 'zustand'

interface MobilePlayerStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const useMobilePlayer = create<MobilePlayerStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))

export default useMobilePlayer
