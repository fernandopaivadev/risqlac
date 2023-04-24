import styled from "styled-components"

const main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	min-height: 100vh;
	background-color: var(--white);
`

const loading = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 5rem;
	height: 5.5rem;
	margin: 2rem auto 0 auto;
`

export default {
	main,
	loading,
}
