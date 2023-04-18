const convert = {
	getOnlyNumbers: (input: string): string => input?.replace(/\D/g, ""),
	dateStringFromTimestamp: (
		timeStamp: string | Date | undefined | null
	): string => {
		if (timeStamp) {
			if (typeof timeStamp === "string") {
				const splitTimeStamp = timeStamp.split("T")[0].split("-")

				return `${splitTimeStamp[2]}/${splitTimeStamp[1]}/${splitTimeStamp[0]}`
			} else {
				const day = timeStamp.getDate()
				const month = timeStamp.getMonth()
				const year = timeStamp.getFullYear()

				return `${day + 1}/${month + 1}/${year}`
			}
		} else {
			return ""
		}
	},

	timeFromTimestamp: (timestamp: string | Date | undefined | null): string => {
		if (timestamp) {
			const dateTime = new Date(timestamp)

			return `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
		} else {
			return ""
		}
	},

	dateObjectFromDateString: (timestamp: string): Date => {
		const dateElements = timestamp.split("/")
		const date = new Date()
		date.setDate(Number(dateElements[0]))
		date.setMonth(Number(dateElements[1]) - 1)
		date.setFullYear(Number(dateElements[2]))

		return date
	},
}

const validate = {
	form: (selector: string): boolean => {
		const element = document.querySelector(`${selector}`)

		if (!element) {
			return false
		}

		let sum = 0
		let expected = 0

		const inputs = Array.from(element.children).filter(
			({ tagName }) => tagName === "INPUT" || tagName === "TEXTAREA"
		)

		inputs.forEach((input: any): void => {
			if (input.checkValidity()) {
				sum++
			}
			expected++
		})

		return sum === expected
	},

	setup: (element: string): void | boolean => {
		const elements = Array.from(document.querySelectorAll<HTMLElement>(element))

		if (!elements) {
			return false
		}

		const children: any[] = []

		elements
			.map((form) => Array.from(form.children))
			.map((formChildren) => {
				children.push(...formChildren)
			})

		const inputs = children.filter(
			(child) => child.tagName === "INPUT" || child.tagName === "TEXTAREA"
		)

		const errorMessages = children.filter(
			(child) => child.className === "error-message"
		)

		inputs.forEach((input, inputIndex) => {
			input.onblur = () => {
				try {
					if (inputs[inputIndex].checkValidity()) {
						inputs[inputIndex].style.borderColor = "var(--black)"
						errorMessages[inputIndex].style.display = "none"
					} else {
						inputs[inputIndex].style.borderColor = "var(--red)"
						errorMessages[inputIndex].style.display = "block"
					}
				} catch (err: any) {
					console.log(`VALIDATION ERROR MESSAGE: ${err.message}`)
				}
			}
		})
	},
}

const format = {
	deviceID: (input: string | undefined): string =>
		input ? input?.replace(/[\W_]/g, "").toUpperCase() : "",
	username: (input: string | undefined): string =>
		input ? input?.trim().replace(/[\W_]/g, "").toLowerCase() : "",
	phone: (phone: string | undefined): string =>
		phone
			? phone
					?.replace(/\D/g, "")
					.replace(/(\d{11})(\d)/, "$1")
					.replace(/(\d{2})(\d)/, "($1) $2")
					.replace(/(\d{5})(\d)/, "$1-$2")
			: "",
	cpf: (cpf: string | undefined): string =>
		cpf
			? cpf
					?.replace(/\D/g, "")
					.replace(/(\d{11})(\d)/, "$1")
					.replace(/(\d{3})(\d)/, "$1.$2")
					.replace(/(\d{3})(\d)/, "$1.$2")
					.replace(/(\d{3})(\d)/, "$1-$2")
			: "",
	cnpj: (cnpj: string | undefined): string =>
		cnpj
			? cnpj
					?.replace(/\D/g, "")
					.replace(/(\d{14})(\d)/, "$1")
					.replace(/(\d{2})(\d)/, "$1.$2")
					.replace(/(\d{3})(\d)/, "$1.$2")
					.replace(/(\d{3})(\d)/, "$1.$2")
					.replace(/(\d{4})(\d)/, "$1-$2")
			: "",
	cep: (cep: string | undefined): string =>
		cep
			? cep
					?.replace(/\D/g, "")
					.replace(/(\d{8})(\d)/, "$1")
					.replace(/(\d{5})(\d)/, "$1-$2")
			: "",
	date: (input: string | undefined): string =>
		input
			? input
					?.replace(/\D/g, "")
					.replace(/(\d{8})(\d)/, "$1")
					.replace(/(\d{2})(\d)/, "$1/$2")
					.replace(/(\d{2})(\d)/, "$1/$2")
			: "",
	integer: (input: string | undefined): string =>
		input ? input?.replace(/\D/g, "") : "",
	float: (input: string | undefined): string =>
		input
			? input
					?.replace(/\D/g, "")
					.replace(/(\d{5})(\d)/, "$1")
					.replace(/(\d{3})(\d)/, "$1.$2")
			: "",
}

export { format, validate, convert }
