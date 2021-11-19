import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Layout1 from '@/components/Layout1'
import { getSession } from 'next-auth/react'
import React, { ReactElement } from 'react'
import { axiosInstanceFetch } from 'src/helpers/axiosInstance'
import { Device } from '@/interfaces/Device';
import { TableRow } from '@/components/Table/TableRow';

type PageProps = {
	devices: Device[]
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
	const session = await getSession(context)

	if (!session || session.error) {
		return {
			redirect: {
				destination: '/', // some destination '/dashboard' Ex,
				permanent: false,
			},
		}
	}

	const res = await axiosInstanceFetch(session).get('/device/resume?filter_by=720');
	const devices: Device[] = res.data

	return {
		props: { devices },
	}
}

const History = ({ devices }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<div className="px-8 py-4 max-w-screen-xl mx-auto">
			<div className="flex">
				<div className="flex-1">
					<h2 className="font-semibold text-2xl pb-8">Hola, revisa el Historial de tus mediciones!</h2>
				</div>
				<div className="flex-initial">
					<Link href="/devices/new">
						<a className="text-white shadow-greenShadow bg-textGreen rounded-lg px-4 py-2 font-semibold hover:bg-green-700">
							Nuevo Dispositivo
						</a>
					</Link>
				</div>
			</div>
			<div className="rounded-xl p-4 border shadow-lg">
				<table className="w-full">
					<thead>
						<tr>
							<th className="bg-gray-100 text-gray-600 p-3 text-left rounded-tl-lg rounded-bl-lg"></th>
							<th className="bg-gray-100 text-gray-600 p-3 text-left">Dispositivo</th>
							<th className="bg-gray-100 text-gray-600 p-3 text-left">Fecha de activación</th>
							<th className="bg-gray-100 text-gray-600 p-3 text-left">Estado</th>
							<th className="bg-gray-100 text-gray-600 p-3 text-center">Calidad Promedio</th>
							<th className="bg-gray-100 text-gray-600 p-3 text-center rounded-tr-lg rounded-br-lg"></th>
						</tr>
					</thead>
					<tbody>
						{
							devices.map(item => (
								<TableRow key={item.id} device={item} />
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

History.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout1>
			{page}
		</Layout1>
	)
};


export default History
