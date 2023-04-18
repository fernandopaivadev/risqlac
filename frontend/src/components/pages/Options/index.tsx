import React from 'react'
import navigate from '../../../functions/navigate'

import storage from '../../../services/storage'

import Buttons from '../../blocks/Buttons'

import styles from './styles'
import api from '../../../services/api'

const logout = async () => {
	const response = await api.request({
		method: 'DELETE',
		route: '/session/logout'
	})

	if (response?.status === 200) {
		navigate('/login')
		storage.clear('all')
	}
}

const Options: React.FC = () => {
	const isAdmin = storage.read('loggedUser')?.is_admin
	const colorButton = 'var(--yellow)'
	const colorButtonAdmin = 'var(--black)'

	return <styles.main>
		{isAdmin ?
			<Buttons
				header={
					{
						title: 'Opções',
						color: 'var(--black)',
						backButton: () => {
							navigate('/products')
						}
					}
				}
				buttons={[
					{
						name: 'Lista de usuários',
						color: colorButtonAdmin,
						fontColor: 'var(--white)',
						onClick: () => {
							navigate('/users')
						}
					},
					{
						name: 'Lista de produtos',
						color: colorButton,
						onClick: () => {
							navigate('/products')
						}
					},
					{
						name: 'Sobre o RisQLAC',
						color: colorButton,
						onClick: () => {
							navigate('/about')
						}
					},
					{
						name: 'Sair',
						color: colorButton,
						onClick: logout
					}
				]}
			/>
			:
			<Buttons
				header={
					{
						title: 'Opções',
						color: 'var(--black)',
						backButton: () => {
							navigate('/products')
						}
					}
				}
				buttons={[
					{
						name: 'Lista de produtos',
						color: colorButton,
						onClick: () => {
							navigate('/products')
						}
					},
					{
						name: 'Sobre o RisQLAC',
						color: colorButton,
						onClick: () => {
							navigate('/about')
						}
					},
					{
						name: 'Sair',
						color: colorButton,
						onClick: logout
					}
				]}
			/>
		}
	</styles.main>
}

export default Options
