import React from 'react'

import { Components } from '../../../@types'
import styles from './style'
import util from '../../../utils/styles'

const Modal: React.FC<Components.Modal> = ({ message, ok, cancel }) =>
	<styles.main>
		<styles.window
			data-testid='window'
		>
			<p data-testid='message'>
				{message}
			</p>
			<div>
				{ok ?
					<util.classicButton
						id='yes'
						data-testid='yes'
						onClick={ok.onClick}
					>
						{ok.text}
					</util.classicButton>
					: null
				}
				<util.criticalButton
					id='no'
					data-testid='no'
					onClick={cancel.onClick}
				>
					{cancel.text}
				</util.criticalButton>
			</div>
		</styles.window>
	</styles.main>

export default Modal
