import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { MdDeviceThermostat } from 'react-icons/md'
import { axiosInstanceFetch, axiosInstanceServerSide } from 'src/helpers/axiosInstance'
import { Device } from 'src/interfaces/Device'
import { ColorContainer } from '../Cards/ColorContainer'

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
				<ColorContainer quality={item.averages.quality__avg} key={item.id}>
					<div
						className="w-full px-4 py-1 flex"
					>
						<div className="flex-initial">
							<MdDeviceThermostat className="block text-2xl self-center" />
						</div>
						<div className="flex-1 flex justify-between">
							<p className="font-medium text-lg self-center">{item.device === null ? item.unique_id : item.device}</p>
							<p>{item.averages.quality__avg === null ? 'Sin mediciones' : item.averages.quality__avg + '%'}</p>
						</div>
					</div>
				</ColorContainer>
			))}
		</div>
	)
}

export default SearchResult
