import styled from "styled-components"

const main = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	width: 100vw;
	min-height: 100%;
	background: var(--white);

	.section-title {
		margin: 2rem;
		font-size: 3rem;
		font-weight: 600;
	}

	.text {
		margin: 2rem;
		font-size: 2rem;
		font-weight: 500;
		text-align: justify;
	}

	.title {
		margin: 2rem;
		font-size: 3rem;
		font-weight: 600;
	}

	ul {
		margin: 2rem;
	}

	img {
		width: 90%;
		margin: 2rem;
	}

	@media (orientation: landscape) {
		.container {
			width: 80%;
		}
		.container {
			img {
				width: 25%;
			}
		}
	}
`

export default {
	main,
}
