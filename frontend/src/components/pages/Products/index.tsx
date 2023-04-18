import React, { useEffect, useState } from 'react'

import Header from '../../blocks/Header'
import Modal from '../../blocks/Modal'

import api from '../../../services/api'
import storage from '../../../services/storage'

import { FaTrashAlt as DeleteIcon } from 'react-icons/fa'
import { ImLab as ProductIcon } from 'react-icons/im'

import styles from './style'
import util from '../../../utils/styles'
import { Models } from '../../../@types'
import navigate from '../../../functions/navigate'

const Products: React.FC = () => {
	const [products, setProducts] = useState<Models.Product[]>([])
	const [loading, setLoading] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [productId, setProductId] = useState<string>()
	const [searchBy, setSearchBy] = useState('Nome')
	const [productsToShow, setProductsToShow] = useState<Models.Product[]>([])
	const isAdmin = storage.read('loggedUser')?.is_admin

	useEffect(() => {
		(async () => {
			const result = await api.request({
				method: 'get',
				route: '/product/list'
			})

			if (result?.status === 200) {
				setProducts(result?.data?.products)
				setProductsToShow(result?.data?.products)
				setLoading(false)
			} else {
				navigate('/login')
			}
		})()
	}, [])

	const remove = async () => {
		setShowModal(false)
		setLoading(true)

		const result = await api.request({
			method: 'delete',
			route: '/product/delete',
			query: {
				id: productId
			}
		})

		if (typeof result?.status === 'number') {
			window.location.reload()
		}
	}

	return <styles.main>
		{showModal ?
			<Modal
				message='Você tem certeza?'
				ok={{
					onClick: remove,
					text: 'Sim'
				}}
				cancel={{
					onClick: () => {
						setShowModal(false)
					},
					text: 'Não'
				}}
			/>
			: null
		}

		<Header
			title='Lista de produtos'
			optionsButton={() => {
				navigate('/options')
			}}
		/>

		{!loading ?
			products?.length ?
				<styles.list>
					<styles.searchContainer>
						<p>
							Buscar
						</p>

						<div>
							<input
								type='text'
								placeholder='Nome/Classe'
								onChange={event => {
									if (event.target.value === '') {
										setProductsToShow(products)
									} else {
										let _productsToShow: Models.Product[] = []

										if (searchBy === 'Nome') {
											_productsToShow = products.filter(product =>
												product.name.toLowerCase().includes(
													event.target.value.toLowerCase()
												)
											)
										} else if (searchBy === 'Classe') {
											_productsToShow = products.filter(product =>
												product.class.toLowerCase().includes(
													event.target.value.toLowerCase()
												)
											)
										}

										setProductsToShow(_productsToShow)
									}
								}}
							/>

							<select
								onChange={event => {
									setSearchBy(event.target.value)
								}}
							>
								<option>Nome</option>
								<option>Classe</option>
							</select>
						</div>
					</styles.searchContainer>

					{isAdmin ?
						<util.classicButton
							onClick={() => {
								navigate('/product')
							}}
						>
							Novo produto
						</util.classicButton>
						: null
					}

					{productsToShow.map((product, index) =>
						<styles.container
							key={index}
						>
							<styles.product
								onClick={() => {
									navigate(`/product?${product.id}`)
								}}
							>
								<ProductIcon
									className='icon'
								/>
								<styles.infos>
									<p
										className='name'
									>
										{product.name}
									</p>
									<p>{product.class}</p>
								</styles.infos>
							</styles.product>

							{isAdmin ?
								<DeleteIcon
									className='icon'
									onClick={() => {
										setProductId(product.id)
										setShowModal(true)
									}}
								/>
								: null
							}
						</styles.container>
					)}
				</styles.list>
				:
				<styles.noProduct>
					{isAdmin ?
						<util.classicButton
							onClick={() => {
								navigate('/product')
							}}
						>
							Novo produto
						</util.classicButton>
						: null
					}
					<p>Não há produtos cadastrados.</p>
				</styles.noProduct>
			:
			<styles.loading
				data-testid='loading'
			>
				<util.circularProgress />
			</styles.loading>
		}
	</styles.main>
}

export default Products
