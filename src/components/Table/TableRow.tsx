import React, { Fragment, useEffect, useState } from 'react'
import { ApiResponse, DataItem, Device } from '@/interfaces/Device';
import { BsChevronDown } from 'react-icons/bs';
import { axiosInstanceFetch } from 'src/helpers/axiosInstance';
import { useSession } from 'next-auth/react';

interface Props {
	device: Device
}

interface DataItemApi extends ApiResponse {
	results: DataItem[]
}

export const TableRow = ({ device }: Props) => {
	const [state, setState] = useState(false)
	const [dataItem, setDataItem] = useState<DataItemApi>()
	const { data: session, status } = useSession()

	const getDataResume = async () => {
		if (status !== 'authenticated' || session.error) {
			throw new Error(status)
		}
		try {
			const res = await axiosInstanceFetch(session).get(`/data/all/?device=${device.id}`);
			console.log(res.data);
			return res.data
		} catch (e) {
			console.log("error");
			return e
		}
	}

	useEffect(() => {
		if (state && session) {
			getDataResume()
				.then((data: DataItemApi) => {
					setDataItem(data)
				})
				.catch((e) => {
					console.log(e);
				})
		}
	}, [state])

	return (
		<Fragment key={device.id} >
			<tr className={`hover:bg-gray-50 ${state && 'bg-gray-50'}`}>
				<td className="px-3 py-5 font-medium">{device.id}</td>
				<td className="px-3 py-5 font-medium">{device.device}</td>
				<td className="px-3 py-5">{device.activation_date}</td>
				<td className="px-3 py-5">{device.state ? 'Activado' : 'Desactivado'}</td>
				<td className="px-3 py-5 text-center">
					<span className="bg-green-100 text-textGreen font-medium rounded-lg px-4">
						{device.averages.quality__avg}
					</span>
				</td>
				<td>
					<button
						onClick={() => setState((prev) => !prev)}
						className="hover:bg-gray-200 p-2 rounded-full"
					>
						<BsChevronDown className={`text-lg transition transform ${state ? 'rotate-180' : ''}`} />
					</button>
				</td>
			</tr>
			<tr className={`${state ? 'visible' : 'hidden'}`}>
				<td className="px-5" colSpan={5}>
					<div className="w-full">
						<h3 className="font-medium text-sm">
							Historial
						</h3>
						<table className="w-full">
							<thead>
								<tr className="font-normal text-xs">
									<th className="text-left">Latitud</th>
									<th className="text-left">Longitud</th>
									<th className="text-center">Calidad</th>
									<th className="text-left">Fecha de medicion</th>
									<th className="text-center">Humedad</th>
									<th className="text-center">Tempertura</th>
									<th className="text-center">Calor</th>
									<th className="text-left">Humo</th>
									<th className="text-left">Metano</th>
									<th className="text-center">Diferencia</th>
								</tr>
							</thead>
							<tbody>
								{
									state && dataItem && dataItem.results.map(data => (
										<tr className="font-light text-sm" key={data.id}>
											<td>{data.latitude}</td>
											<td>{data.longitude}</td>
											<td className="text-center">{data.quality}</td>
											<td>{data.date_time}</td>
											<td className="text-center">{data.humidity}</td>
											<td className="text-center">{data.temperature}</td>
											<td className="text-center">{data.warm}</td>
											<td>{data.smoke_sensor ? 'Presencia' : 'No Presencia'}</td>
											<td>{data.methane_sensor ? 'Presencia' : 'No Presencia'}</td>
											<td className="text-center">{data.difference_quality}</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				</td>
			</tr>
		</Fragment>
	)
}
