import styled from "styled-components"

const main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 90vh;
	width: 100vw;
	background-color: var(--white);
`

const logo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 12rem;

	img {
		width: 13.5rem;
	}
`

const title = styled.p`
	font-size: 3.5rem;
	font-weight: 400;
	letter-spacing: 0.3rem;
	color: var(--black);
`

const buttons = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 1rem 1rem 1rem;

	button {
		width: 35rem;
		height: 7rem;
		margin: 1.5rem;
		border: none;
		background: var(--gray);
		border-radius: 0.5rem;
		font-size: 2rem;
		font-weight: 600;
		letter-spacing: 0.2rem;
		box-shadow: 0.5rem 0.3rem 0.6rem var(--transparent-black);
	}
`

export default {
	main,
	logo,
	title,
	buttons,
}
