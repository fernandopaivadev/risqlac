import styled from "styled-components"

const main = styled.div`
	width: 80%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 0.5rem;
	background: var(--yellow);
`

const back = styled.button`
	background: var(--transparent);
	margin: 2rem;
	border: none;
	z-index: 10;
	width: 100%;
	display: flex;

	.backIcon {
		font-size: 4rem;
		color: var(--black);
		border: 2px solid var(--black);
		border-radius: 50%;
	}
`

const form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 2.5rem;
`

const logo = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem auto 1.5rem auto;
	align-items: center;

	img {
		width: 16rem;
		margin: 0 1.5rem 0 0;
	}
`

const title = styled.p`
	font-size: 5.5rem;
	font-weight: 400;
	letter-spacing: 1rem;
	color: var(--black);
	margin-top: -4rem;
`

const subtitle = styled.p`
	font-size: 1.2rem;
	font-weight: 600;
	letter-spacing: 0.1rem;
	color: var(--black);
`

const label = styled.label`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--black);
	width: 28rem;
	text-align: left;
	opacity: 1;
`

const input = styled.input`
	margin: 0.5rem 0 1.5rem 0;
	width: 28rem;
	height: 5.5rem;
	border-radius: 0.8rem;
	border: none;
	font-size: 2rem;
	padding: 1.5rem;
	background: var(--background-color);
	color: var(--black);

	&:focus {
		border-color: var(--transparent-yellow);
	}

	::placeholder {
		color: var(--gray);
		font-size: 2rem;
	}
`

const loading = styled.div`
	width: 5rem;
	height: 5.5rem;
	margin: 2rem auto 0 auto;
`

const error = styled.p`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--yellow);
	margin: 1rem;
	text-align: center;
`

const message = styled.p`
	text-align: center;
	color: var(--yellow);
	font-size: 2rem;
	font-weight: 600;
`

export default {
	main,
	back,
	form,
	logo,
	title,
	subtitle,
	label,
	input,
	loading,
	error,
	message,
}
