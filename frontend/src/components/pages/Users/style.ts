import styled from "styled-components"

const main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	min-height: 100vh;
	background-color: var(--white);
`

const list = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1.5rem;
	min-height: 100vh;
`

const container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;

	.icon {
		font-size: 2.5rem;
	}
`

const user = styled.div`
	display: grid;
	grid-template-columns: 25% 75%;
	align-items: center;
	min-height: 13rem;
	width: 37.8rem;
	border-radius: 0.5rem;
	box-shadow: 0.3rem 0.3rem 0.6rem var(--shadow);
	margin: 2rem;
	background: var(--yellow);
	word-break: break-word;

	.icon {
		height: 4.1rem;
		width: 4.5rem;
		margin: auto;
	}
`

const infos = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 1.5rem 0 1rem 0;

	p {
		color: var(--black);
		font-size: 1.8rem;
		font-weight: 500;
		letter-spacing: 0.2rem;
		margin: 0.5rem 3rem 0.5rem 0;
	}

	.name {
		font-weight: 600;
		font-size: 2.2rem;
	}

	.status {
		background: var(--black);
		font-weight: 600;
		text-align: center;
		color: var(--white);
		border-radius: 0.5rem;
		margin: 1rem 0 1rem 0;
		padding: 0.7rem 0.9rem 0.7rem 0.9rem;
		width: 80%;
	}
`
const noUser = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	width: 30rem;

	p {
		font-size: 2.5rem;
		font-weight: 600;
		color: var(--black);
	}
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
	list,
	container,
	user,
	infos,
	noUser,
	loading,
}
