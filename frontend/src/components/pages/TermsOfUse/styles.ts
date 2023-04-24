import styled from "styled-components"

const main = styled.div`
	width: 100vw;
	min-height: 100%;
	background: var(--white);
	display: flex;
	flex-direction: column;
	align-items: center;

	h2 {
		margin: 2rem;
		font-size: 2.5rem;
	}

	p {
		margin: 2rem;
		width: 80%;
		font-size: 2.4rem;
		font-weight: 500;
		text-align: justify;
	}
`

export default {
	main,
}
