import React, { useState } from "react"
import navigate from "../../../functions/navigate"

import storage from "../../../services/storage"

import Buttons from "../../blocks/Buttons"

import util from "../../../utils/styles"
import styles from "./styles"
import api from "../../../services/api"

const Options: React.FC = () => {
	const isAdmin = storage.read("loggedUser")?.is_admin
	const colorButton = "var(--yellow)"
	const colorButtonAdmin = "var(--black)"
	const [loading, setLoading] = useState(false)

	const logout = async () => {
		setLoading(true)
		const response = await api.request({
			method: "DELETE",
			route: "/session/logout",
		})

		if (response?.status === 200) {
			navigate("/login")
			storage.clear("all")
		}
	}

	const defaultOptions = [
		{
			name: "Lista de produtos",
			color: colorButton,
			onClick: () => {
				navigate("/products")
			},
		},
		{
			name: "Sobre o RisQLAC",
			color: colorButton,
			onClick: () => {
				navigate("/about")
			},
		},
		{
			name: "Termos de uso",
			color: colorButton,
			onClick: () => {
				navigate("/terms-of-use")
			},
		},
		{
			name: "Sair",
			color: colorButton,
			onClick: logout,
		},
	]

	return (
		<styles.main>
			{!loading ? (
				isAdmin ? (
					<Buttons
						header={{
							title: "Opções",
							color: "var(--black)",
							backButton: () => {
								navigate("/products")
							},
						}}
						buttons={[
							{
								name: "Lista de usuários",
								color: colorButtonAdmin,
								fontColor: "var(--white)",
								onClick: () => {
									navigate("/users")
								},
							},
							...defaultOptions,
						]}
					/>
				) : (
					<Buttons
						header={{
							title: "Opções",
							color: "var(--black)",
							backButton: () => {
								navigate("/products")
							},
						}}
						buttons={defaultOptions}
					/>
				)
			) : (
				<styles.loading>
					<util.circularProgress />
				</styles.loading>
			)}
		</styles.main>
	)
}

export default Options
