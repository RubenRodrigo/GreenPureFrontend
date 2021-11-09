import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { MdDeviceThermostat } from 'react-icons/md'
import { axiosInstanceFetch, axiosInstanceServerSide } from 'src/helpers/axiosInstance'
import { Device } from 'src/interfaces/Device'

interface Props {
	searchButton: Boolean
}

const API_ENDPOINT = process.env.NEXT_PUBLIC_URL_API

const SearchResult = ({ searchButton }: Props) => {

	const [state, setstate] = useState<Device[]>([])
	const { data: session, status } = useSession()

	const getDevicesResume = async () => {
		if (status !== 'authenticated') {
			throw new Error(status)
		}
		try {
			const res = await axiosInstanceFetch(session).get('/device/resume?filter_by=720');
			return res.data
		} catch (e) {
			console.log("error");
			return e
		}
	}

	useEffect(() => {
		if (searchButton) {
			getDevicesResume()
				.then((data: Device[]) => {
					setstate(data)
				})
				.catch((e) => {
					console.log(e);
				})
		}
	}, [searchButton])


	return (
		<div className="flex flex-col gap-5">
			{state && state.map((item) => (
				<div
					key={item.id}
					className="w-full px-4 py-1 border-l-8 border-textGreen flex bg-gradient-to-r from-green-50 to-white"
				>
					<MdDeviceThermostat className="block text-2xl self-center" />
					<p className="font-medium text-lg self-center">Dispositivo {item.device} - {item.averages.quality__avg}%</p>
				</div>
			))}
			{/* <div className="w-full px-4 py-1 border-l-8 border-yellow-500 flex bg-gradient-to-r from-yellow-50 to-white">
				<MdDeviceThermostat className="block text-2xl self-center" />
				<p className="font-medium text-lg self-center">Dispositivo 2 - 49%</p>
			</div>
			<div className="w-full px-4 py-1 border-l-8 border-textGreen flex bg-gradient-to-r from-green-50 to-white">
				<MdDeviceThermostat className="block text-2xl self-center" />
				<p className="font-medium text-lg self-center">Dispositivo 3 - 49%</p>
			</div>
			<div className="w-full px-4 py-1 border-l-8 border-yellow-500 flex bg-gradient-to-r from-yellow-50 to-white">
				<MdDeviceThermostat className="block text-2xl self-center" />
				<p className="font-medium text-lg self-center">Dispositivo 3 - 49%</p>
			</div> */}
		</div>
	)
}

export default SearchResult
