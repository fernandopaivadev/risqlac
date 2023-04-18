import styled from "styled-components"

const main = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	background: linear-gradient(#3339, #3339);
	top: 0;
	left: 0;
	z-index: 1;
`

const window = styled.div`
	display: flex;
	width: 45rem;
	max-height: 70rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem 2rem 1rem 2rem;
	border-radius: 0.5rem;
	background: var(--background-color);

	select {
		margin: 2rem;
		padding: 1rem;
		border-radius: 0.5rem;
		font-size: 2rem;
		font-weight: 600;
	}

	.loading {
		display: flex;
		align-items: center;
		height: 8rem;
	}

	.buttons {
		display: flex;
	}

	.text {
		font-size: 2rem;
		font-weight: 600;
		color: var(--neutral-color);
		margin: 1rem;
	}

	.error-message {
		font-size: 2rem;
		font-weight: 600;
		color: var(--red);
		margin: 1rem auto 1.5rem auto;
	}

	img {
		max-width: 80%;
		max-height: 100%;
		border: solid;
		border-radius: 0.7rem;
	}
`

export default {
	main,
	window,
}
