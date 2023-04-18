export default (path: string): void => {
	const baseUrl = location.origin

	const url = `${baseUrl}/#${path}`

	location.replace(url)
}
