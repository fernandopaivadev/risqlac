import { Method } from "axios"
import FormData from "form-data"

export namespace APIRequest {
	interface Options {
		method: Method
		route: string
		query?: { [key: string]: any }
		body?: {
			[key: string]: any
		}
		formData?: FormData
		store?: boolean
	}

	interface Response {
		status: number
		data?: {
			[key: string]: any
		} | null
	}
}

export namespace Models {
	interface User {
		id: string
		is_admin: boolean
		name: string
		password?: string
		email: string
		phone: string
		created_at: Date
		updated_at: Date
	}

	type NewUser = Omit<NewUser, "id", "created_at", "updated_at">

	interface Product {
		id: string
		name: string
		synonym: string
		symbols: string
		class: string
		subclass: string
		storage: string
		incompatibility: string
		precautions: string
		quantity?: string
		due_date?: string
		batch?: string
		location?: string
		created_at: Date
		updated_at: Date
	}

	type NewProduct = Omit<Product, "id" | "created_at" | "updated_at">
}

export namespace Components {
	interface Header {
		color?: string
		fontColor?: string
		backButton?: () => void
		optionsButton?: () => void
		title: string
	}

	interface Buttons {
		buttons: {
			name: string
			color: string
			fontColor?: string
			onClick: () => void
		}[]
		header: Header
	}

	interface Modal {
		message: string | ReactElement
		ok?: {
			text: string
			onClick: () => void
		}
		cancel: {
			onClick: () => void
			text: string
		}
	}

	interface Symbols {
		taskOnCancel: () => void
		storeSymbolId: (symbolId: string) => void
	}
}

export namespace Storage {
	export type key = "user" | "loggedUser" | "unit" | "token"
}
