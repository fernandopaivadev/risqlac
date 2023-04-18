import React from 'react'

import { Components } from '../../../@types'
import Header from '../Header'
import styles from './styles'
import logo from '../../../assets/logo.png'

const Buttons: React.FC<Components.Buttons> = ({ buttons, header }) =>
	<styles.main>
		<Header
			{...header}
		/>
		<styles.logo
			data-testid='logo'
		>
			<img
				src={logo}
				alt='Tech Amazon Logo'
			/>
		</styles.logo>

		<styles.buttons>
			{buttons.map((button, index) =>
				<button
					key={index}
					style={{
						backgroundColor: button.color,
						color: button.fontColor ?? 'var(--black)'
					}}
					onClick={button.onClick}
				>
					{button.name}
				</button>
			)}
		</styles.buttons>
	</styles.main>

export default Buttons
