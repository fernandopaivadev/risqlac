import styled from "styled-components"

const main = styled.div`
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 0.5rem;
	background: var(--transparent);
`

const back = styled.button`
	background: var(--transparent);
	margin-left: 2rem;
	border: none;
	z-index: 1;

	.backIcon {
		font-size: 4rem;
		color: var(--black);
		border: 2px solid var(--black);
		border-radius: 50%;
		margin-left: 2rem;
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
	color: var(--gray);
	width: 28rem;
	text-align: left;
	opacity: 0;
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

const container = styled.div`
	width: 28rem;
	display: flex;
	justify-content: stretch;

	p {
		background: none;
		border: none;
		border-radius: 0.5rem;
		width: 7rem;
		font-size: 1.6rem;
		padding: 0.2rem;
		text-decoration: none;
		color: var(--black);
	}
`

const loading = styled.div`
	width: 5rem;
	height: 5.5rem;
	margin: 2rem auto 0 auto;
`

const link = styled.p`
	font-size: 1.8rem;
	font-weight: 600;
	color: var(--gray);
`

const error = styled.p`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--yellow);
	margin: 1rem;
	text-align: center;
`

const message = styled.p`
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
	container,
	loading,
	link,
	error,
	message,
}
