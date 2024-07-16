'use client'

import { FC, createContext, useContext, useState } from 'react'

export type ContextData = {
	emit: (name: string, data: any) => void
	on: (name: string, callback: Function) => () => void
}

type EventBusProviderProps = {
	children: React.ReactNode
}

export const EventBusContext = createContext<ContextData | undefined>(undefined)
export const EventBusProvider: FC<EventBusProviderProps> = ({ children }) => {
	const [events, setEvents] = useState<Record<string, Function[]>>({})

	const emit = (name: string, data: any) => {
		if (events[name]) {
			for (let callback of events[name]) {
				callback(data)
			}
		}
	}

	const on = (name: string, callback: Function) => {
		if (!events[name]) {
			events[name] = []
		}
		events[name].push(callback)
		return () => {
			events[name] = events[name].filter((cb) => cb !== callback)
		}
	}

	return (
		<EventBusContext.Provider value={{ emit, on }}>
			{children}
		</EventBusContext.Provider>
	)
}
export const useEventBus = () => useContext(EventBusContext) as ContextData
