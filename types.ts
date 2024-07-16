type ApiResponseType<T> = {
	data: T
	links: LinkType
	meta: MetaType
}

type MusicType = {
	id?: string
	title?: string
	author?: string
	song?: string
	path?: string | null
	image?: string | null
	isInUserLibrary?: boolean
}

type LinkType = {
	first?: string | null
	last?: string | null
	prev?: string | null
	next?: string | null
}

type MetaType = {
	path?: string | null
	per_page?: number
	next_cursor?: string | null
	prev_cursor?: string | null
}

type MetaLink = {
	url: string
	label: string
	active: boolean
}
