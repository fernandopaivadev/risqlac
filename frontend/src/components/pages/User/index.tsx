import React, { useState, useEffect } from 'react'

import Header from '../../blocks/Header'

import api from '../../../services/api'

import {
	convert,
	format,
	validate,
} from '../../../services/validation'

import styles from './style'
import util from '../../../utils/styles'
import { Models } from '../../../@types'
import navigate from '../../../functions/navigate'

const User: React.FC = () => {
	const [user, setUser] = useState<Models.User | Models.NewUser>()
	const [loading, setLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<string | null>()
	const [userId] = useState(window.location.href.split('?')[1])

	const getUserData = async () => {
		const result = await api.request({
			method: 'get',
			route: '/user/list',
			query: {
				id: userId
			}
		})

		if (result?.status === 200) {
			console.log(result?.data?.users)
			setUser(result?.data?.users
				.filter((user: any) => user.id === Number(userId))[0]
			)
		}
	}

	useEffect(() => {
		(async () => {
			if (userId) {
				setLoading(true)
				await getUserData()
				setLoading(false)
			} else {
				const _user = {
					name: '',
					email: '',
					phone: '',
					password: '',
					is_admin: false
				}

				setUser(_user)
				setLoading(false)
			}
		})()
	}, [])

	const submit = async (user: Models.User | Models.NewUser | undefined) => {
		setLoading(true)
		setErrorMessage(null)

		if (user && validate.form('#user-form')) {
			if (userId) {
				const result = await api.request({
					route: '/user/update',
					method: 'put',
					body: user
				})

				if (result?.status === 200) {
					navigate('/users')
				} else {
					setErrorMessage('Preencha os campos corretamente')
					setLoading(false)
				}
			} else {
				const result = await api.request({
					route: '/user/create',
					method: 'post',
					body: user
				})

				if (result?.status === 201) {
					navigate('/users')
				} else {
					setErrorMessage('Erro ao criar usuário')
					setLoading(false)
				}
			}
		} else {
			setErrorMessage('Preecha os campos obrigatórios')
			setLoading(false)
		}
	}

	return <styles.main>
		<Header
			title='Usuário'
			backButton={() => {
				navigate('/users')
			}}
		/>

		{!loading ?
			<styles.form id='user-form'>
				<styles.label htmlFor='person-name'>
					Nome
				</styles.label>
				<styles.input
					id='person-name'
					minLength={3}
					maxLength={64}
					required
					defaultValue={user?.name}
					onChange={event => {
						const _user = user
						typeof _user?.name === 'string' ?
							_user.name = event.target.value
							: null
						setUser(_user)
					}}
				/>
				<p className='error-message'>
					Digite no mínimo 3 caracteres.
				</p>

				<styles.label htmlFor='email'>
					Email*
				</styles.label>
				<styles.input
					id='email'
					required
					minLength={6}
					maxLength={32}
					defaultValue={user?.email}
					onChange={event => {
						const _user = user
						typeof _user?.email === 'string' ?
							_user.email = event.target.value
							: null
						setUser(_user)
					}}
				/>
				<p className='error-message'>
					Digite no mínimo 6 caracteres.
				</p>

				<styles.label htmlFor='phone'>
					Telefone*
				</styles.label>
				<styles.input
					id='phone'
					minLength={9}
					maxLength={15}
					required
					defaultValue={format.phone(user?.phone)}
					onChange={event => {
						const _user = user
						typeof _user?.phone === 'string' ?
							_user.phone = convert.getOnlyNumbers(event.target.value)
							: null
						event.target.value = format.phone(event.target.value)
						setUser(_user)
					}}
				/>
				<p className='error-message'>
					Digite um número de telefone válido.
				</p>

				{userId ?
					null
					:
					<>
						<styles.label htmlFor='password'>
							Senha*
						</styles.label>
						<styles.input
							id='password'
							type='password'
							required
							minLength={6}
							maxLength={32}
							defaultValue={user?.password}
							onChange={event => {
								const _user = user
								typeof _user?.password === 'string' ?
									_user.password = event.target.value
									: null
								setUser(_user)
							}}
						/>
						<p className='error-message'>
							Digite no mínimo 6 caracteres.
						</p>
					</>
				}

				<styles.select
					defaultValue={
						userId ?
							user?.is_admin ? 'admin' : 'student'
							: 'student'
					}
					onChange={event => {
						user ?
							user.is_admin = event.target.value === 'admin'
							: null
					}}
				>
					<option></option>
					<option value='student' defaultChecked>Aluno</option>
					<option value='admin'>Professor/Técnico</option>
				</styles.select>

				<p className='error-message'>
					Digite no mínimo 3 caracteres.
				</p>

				{!loading ?
					<util.classicButton
						onClick={event => {
							event.preventDefault()
							submit(user)
						}}
					>
						Salvar
					</util.classicButton>
					:
					<styles.loading>
						<util.circularProgress />
					</styles.loading>
				}

				{errorMessage ?
					<styles.errorMessage>
						<p>{errorMessage}</p>
					</styles.errorMessage>
					: null
				}
			</styles.form>
			:
			<styles.loadingAll>
				<util.circularProgress />
			</styles.loadingAll>
		}
	</styles.main>
}

export default User
