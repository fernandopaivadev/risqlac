import axios, { AxiosError } from "axios"

import { APIRequest, Storage } from "../@types"
import navigate from "../functions/navigate"
import storage from "./storage"

const baseURL = "https://risqlac.com.br/api"

const Axios = axios.create({
	baseURL,
})

const request = async ({
	method,
	route,
	query,
	body,
	formData,
	store = true,
}: APIRequest.Options): Promise<APIRequest.Response | null> => {
	let statusError: APIRequest.Response["status"] | null = null

	const token = storage.read("token")

	const headers = formData
		? {
				Authorization: token ?? "",
				"Content-Type": "multipart/form-data",
		  }
		: {
				Authorization: token ?? "",
		  }

	const response: any = await Axios({
		method,
		url: route,
		params: query ? new URLSearchParams({ ...query }) : undefined,
		data: formData ? formData : body,
		headers,
	}).catch((err: AxiosError) => {
		statusError = err.response ? err.response.status : null

		if (statusError === 401) {
			storage.clear("all")
			window.location.pathname === "/login" ? null : navigate("/login")
		}
	})

	if (response?.data && store) {
		Object.keys(response.data).forEach((key) => {
			storage.write(key as Storage.key, response.data[key])
		})
	}

	return {
		status: response ? response?.status : statusError ? statusError : 500,
		data: response ? response?.data : null,
	}
}

export default {
	request,
}
