import React, { useState } from 'react'

import api from '../../../services/api'
import logo from '../../../assets/logo.png'

import { BsArrowLeftShort as BackIcon } from 'react-icons/bs'

import styles from './style'
import util from '../../../utils/styles'
import navigate from '../../../functions/navigate'

const ForgotPassword: React.FC = () => {
	const [email, setEmail] = useState('')
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [emailSent, setEmailSent] = useState(false)

	const submit = async () => {
		setLoading(true)

		const result = await api.request({
			method: 'get',
			route: '/user/forgot-password',
			query: {
				email
			}
		})

		if (result?.status === 201) {
			setLoading(false)
			setEmailSent(true)
		} else if (result?.status === 404) {
			setErrorMessage('Usuário não encontrado')
			setLoading(false)
			setError(true)
		} else {
			setErrorMessage('Ocorreu um erro')
			setLoading(false)
			setError(true)
		}
	}

	return <styles.main>
		<styles.form>
			<styles.back>
				<BackIcon
					className='backIcon'
					onClick={() => {
						navigate('/login')
					}}
				/>
			</styles.back>
			<styles.logo>
				<img
					src={logo}
					alt='Tech Amazon Logo'
				/>
			</styles.logo>

			{emailSent ?
				<styles.message>
					Enviamos um link para o seu email
				</styles.message>
				:
				<>
					<styles.label>
						E-mail ou nome de usuário
					</styles.label>
					<styles.input
						required
						onChange={event => {
							setEmail(event.target.value)
						}}
					/>
				</>
			}

			{loading ?
				<styles.loading>
					<util.circularProgress />
				</styles.loading>
				: emailSent ?
					<util.classicButton
						onClick={event => {
							event.preventDefault()
							navigate('/login')
						}}
					>
						FAZER LOGIN
					</util.classicButton>
					:
					<util.classicButton
						onClick={event => {
							event.preventDefault()
							submit()
						}}
					>
						ENVIAR LINK
					</util.classicButton>
			}

			{error ?
				<styles.error>
					{errorMessage}
				</styles.error>
				: null
			}
		</styles.form>
	</styles.main>
}

export default ForgotPassword
