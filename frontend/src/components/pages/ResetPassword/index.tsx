import React, { useState } from 'react'

import api from '../../../services/api'
import logo from '../../../assets/logo.png'

import styles from './style'
import util from '../../../utils/styles'
import navigate from '../../../functions/navigate'
import storage from '../../../services/storage'

const ResetPassword: React.FC = () => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [password, setPassword] = useState('')
	const [passwordChanged, setPasswordChanged] = useState(false)

	const submit = async () => {
		setLoading(true)
		setError(false)

		const token = window
			.location
			.href
			.split('?')[1]

		storage.write('token', token as any)

		const result = await api.request({
			method: 'patch',
			route: '/user/reset-password',
			query: {
				new_password: password
			}
		})

		if (result?.status === 200) {
			setLoading(false)
			setPasswordChanged(true)
			navigate('/login')
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

	return (
		<styles.main>
			<styles.form>
				<styles.logo>
					<img
						src={logo}
						alt='RisQLAC Logo'
					/>
				</styles.logo>

				{passwordChanged ?
					<styles.message>
						Senha alterada com sucesso
					</styles.message>
					:
					<>
						<styles.label>
							Digite a nova senha
						</styles.label>
						<styles.input
							required
							type='password'
							onChange={event => {
								setPassword(event.target.value)
							}}
							placeholder='Digite a nova senha'
						/>
					</>
				}

				{loading ?
					<styles.loading>
						<util.circularProgress />
					</styles.loading>
					: passwordChanged ?
						<util.classicButton
							className='classic-button'
							onClick={event => {
								event.preventDefault()
								navigate('/login')
							}}
						>
							Voltar ao login
						</util.classicButton>
						:
						<util.classicButton
							type='submit'
							className='classic-button'
							onClick={event => {
								event.preventDefault()
								submit()
							}}
						>
							Enviar
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
	)
}

export default ResetPassword
