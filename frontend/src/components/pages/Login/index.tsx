import React, { useState } from 'react'

import api from '../../../services/api'
import storage from '../../../services/storage'

import { version } from '../../../../package.json'

import {
	FaEye as ShowPasswordIcon,
	FaEyeSlash as HidePasswordIcon,
	FaInfoCircle as InfoIcon
} from 'react-icons/fa'

import logo from '../../../assets/logo.png'
import styles from './style'
import util from '../../../utils/styles'
import navigate from '../../../functions/navigate'

const Login: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const submit = async () => {
		setError(false)
		setLoading(true)

		const result = await api.request({
			method: 'get',
			route: '/session/login',
			query: {
				email,
				password
			}
		})

		if (result?.status === 200) {
			const result = await api.request({
				method: 'get',
				route: '/user/list'
			})

			if (result?.status === 200) {
				storage.write('loggedUser', result.data?.users
					.filter((user: any) => user.email === email)[0]
				)
				navigate('/products')
			} else {
				setLoading(false)
				setErrorMessage('Não foi possível obter os dados')
				setError(true)
				setTimeout(() => {
					setError(false)
				}, 3000)
			}
		} else {
			setLoading(false)
			setErrorMessage('Usuário ou senha incorretos')
			setError(true)
			setTimeout(() => {
				setError(false)
			}, 3000)
		}
	}

	const togglePassword = () => {
		const passwordInput = document.querySelector<HTMLInputElement>('#password')

		if (passwordInput?.type === 'password') {
			passwordInput.type = 'text'
			setShowPassword(true)
		} else if (passwordInput?.type) {
			passwordInput.type = 'password'
			setShowPassword(false)
		}
	}

	return <>
		<styles.main>
			<styles.form>
				<styles.logo
					data-testid='logo'
				>
					<img
						src={logo}
						alt='Tech Amazon Logo'
					/>
					<styles.subtitle>
						SOFTWARE DE CADASTRO DE PRODUTOS QUÍMICOS
					</styles.subtitle>
					<styles.subtitle>
						v{version}
					</styles.subtitle>
				</styles.logo>

				<styles.label htmlFor='email'>
					E-mail ou nome de usuário
				</styles.label>
				<styles.input
					autoFocus
					id='email'
					data-testid='email'
					required
					onChange={event => {
						setEmail(event.target.value)
					}}
					placeholder='E-mail ou nome de usuário'
				/>
				<styles.label htmlFor='password'>
					Senha
				</styles.label>
				<styles.password>
					{showPassword ?
						<HidePasswordIcon
							id='hidePasswordIcon'
							className='showPasswordIcon'
							onClick={() => {
								togglePassword()
							}}
						/>
						:
						<ShowPasswordIcon
							id='ShowPasswordIcon'
							className='showPasswordIcon'
							onClick={() => {
								togglePassword()
							}}
						/>
					}
					<styles.input
						id='password'
						data-testid='password'
						type='password'
						required
						onChange={event => {
							setPassword(event.target.value)
						}}
						placeholder='Senha'
					/>
				</styles.password>

				<InfoIcon
					onClick={() => {
						navigate('/terms-of-use')
					}}
					className='icon'
				/>

				{loading ?
					<styles.loading
						data-testid='loading'
					>
						<util.circularProgress />
					</styles.loading>
					:
					<util.classicButton
						data-testid='button'
						type='submit'
						onClick={event => {
							event.preventDefault()
							submit()
						}}
					>
						Entrar
					</util.classicButton>
				}

				{loading ? null :
					<>
						{/* <styles.link
              data-testid='link'
              onClick={() => {
                navigate('/forgot-password')
              }}>
              Esqueci minha senha
            </styles.link> */}
						<styles.link
							data-testid='link'
							onClick={() => {
								navigate('/user')
							}}>
							Cadastre-se
						</styles.link>
					</>
				}

				{error ?
					<styles.error
						data-testid='error'
					>
						{errorMessage}
					</styles.error>
					: null
				}
			</styles.form>
		</styles.main>
	</>
}

export default Login
