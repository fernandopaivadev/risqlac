import styled from "styled-components"

const main = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	min-height: 100vh;
	background-color: var(--white);
`

const form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 60%;
	padding: 3em;
	margin: 0 auto 0 auto;

	.error-message {
		display: none;
		text-align: center;
		font-size: 1.5rem;
		color: var(--red);
		margin: 0 0 1.3rem 0;
	}

	@media (max-width: 600px) {
		width: 90%;
	}
`

const label = styled.label`
	font-size: 2rem;
	font-weight: 600;
	color: var(--black);
	width: 100%;
	text-align: left;
	letter-spacing: 0.1rem;
`

const textarea = styled.textarea`
	margin: 0.5rem 0 3rem 0;
	width: 100%;
	height: 10rem;
	border-radius: 0.8rem;
	border: 2px solid var(--black);
	font-size: 2rem;
	padding: 1.5rem;
	color: var(--black);
	resize: vertical;
`

const select = styled.select`
	margin: 0.5rem 0 1.5rem 0;
	width: 100%;
	height: 6rem;
	border-radius: 0.8rem;
	border: 2px solid var(--black);
	font-size: 1.8rem;
	padding: 1rem;
	color: var(--black);
	font-weight: 600;
	background: var(--white);
`

const loading = styled.div`
	width: 5rem;
	height: 5.5rem;
	margin: 2rem auto 0 auto;
`

const loadingAll = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	background: var(--white);
`

const errorMessage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	margin: 0rem 1rem 1rem 1rem;
	font-weight: 600;
	color: var(--red);
`

const container = styled.div`
	width: 100%;
`

const imagePreview = styled.div`
	display: inline-block;
	margin-top: 1rem;
	margin-left: 1.2rem;
	vertical-align: middle;
	text-align: center;

	img {
		display: block;
		max-width: 20rem;
		border: 2px solid var(--black);
		border-radius: 4px;
	}

	.icon {
		margin: 2rem;
		font-size: 2rem;
	}
`

const imageContainer = styled.div`
	width: 100%;
	div {
		overflow-x: scroll;
		white-space: nowrap;
	}
`

export default {
	main,
	form,
	textarea,
	select,
	label,
	loading,
	loadingAll,
	errorMessage,
	container,
	imagePreview,
	imageContainer,
}
