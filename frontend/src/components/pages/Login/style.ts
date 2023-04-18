import styled from "styled-components"

const main = styled.div`
	width: 45rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 2rem;
	background: var(--yellow);
`

const form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 2.5rem;

	.icon {
		position: absolute;
		font-size: 4rem;
		margin-left: 35rem;
		cursor: pointer;
	}
`

const logo = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem auto 1.5rem auto;
	align-items: center;

	img {
		width: 30rem;
	}
`

const subtitle = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
	letter-spacing: 0.1rem;
	color: var(--black);
	width: 60%;
	text-align: center;
`

const label = styled.label`
	font-weight: 600;
	color: var(--red);
	width: 28rem;
	text-align: left;
	opacity: 0;
`

const input = styled.input`
	margin: 0.5rem 0 1.5rem 0;
	width: 32rem;
	height: 5.5rem;
	border-radius: 0.8rem;
	border: none;
	font-size: 2rem;
	padding: 1.5rem;
	background: var(--background-color);
	color: var(--black);

	::placeholder {
		color: var(--gray);
		font-size: 2rem;
	}
`
const password = styled.div`
	position: relative;
	height: 5.5rem;
	margin: 0.5rem 0 1.5rem 0;

	input {
		margin: 0;
	}

	.showPasswordIcon {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		color: var(--black);
		font-size: 2rem;
		z-index: 1;
		width: 5rem;
		cursor: pointer;
	}
`

const loading = styled.div`
	width: 5rem;
	height: 5.5rem;
	margin: 2rem auto 0 auto;
`

const link = styled.p`
	font-size: 2rem;
	font-weight: 600;
	color: var(--black);
	cursor: pointer;

	&:hover {
		color: var(--transparent-black);
	}
`

const error = styled.p`
	font-size: 2rem;
	font-weight: 600;
	color: var(--black);
	margin: 1rem;
	text-align: center;
`

const message = styled.p`
	color: var(--green);
	font-size: 2rem;
	font-weight: 600;
`

export default {
	main,
	form,
	logo,
	subtitle,
	label,
	input,
	password,
	loading,
	link,
	error,
	message,
}
