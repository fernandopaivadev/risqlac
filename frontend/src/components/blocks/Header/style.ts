import styled from "styled-components"

const header = styled.div`
	display: grid;
	grid-template-columns: 25% 50% 25%;
	text-align: center;
	justify-content: center;
	align-items: center;
	background: var(--yellow);
	width: 100%;
	height: 10rem;

	.backIcon {
		font-size: 4rem;
		color: var(--black);
		background: var(--white);
		border: none;
		border-radius: 50%;
		margin-left: 2rem;
		margin-left: auto;
		margin-right: auto;
		grid-column-start: 1;
		grid-column-end: 2;
	}

	p {
		color: var(--black);
		font-size: 2.4rem;
		font-weight: 600;
		letter-spacing: 0.2rem;
		margin-left: auto;
		margin-right: auto;
		grid-column-start: 2;
		grid-column-end: 3;
	}

	.optionsIcon {
		font-size: 4rem;
		color: var(--black);
		background: var(--white);
		border: none;
		border-radius: 50%;
		margin-left: 2rem;
		margin-left: auto;
		margin-right: auto;
		grid-column-start: 3;
		grid-column-end: 4;
	}

	img {
		width: 7rem;
		height: 7rem;
		margin-left: auto;
		margin-right: auto;
		background: var(--white);
		border-radius: 50%;
	}
`

export default {
	header,
}
