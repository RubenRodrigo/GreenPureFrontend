import Link from 'next/link';
import Layout1 from '@/components/Layout1';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import React, { ReactElement } from 'react'
import { Device } from '@/interfaces/Device';
import { axiosInstanceFetch } from 'src/helpers/axiosInstance';
import { CircleColor } from '@/components/CircleColor';
import { LinearChartCard } from '@/components/Charts/LinearChartCard';

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

	const res = await axiosInstanceFetch(session).get('/device?filter_by=720');
	const devices: Device[] = res.data
	return {
		props: { devices },
	}
}


function Devices({ devices, }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<div className="px-8 py-4 max-w-screen-xl mx-auto">
			<div className="flex">
				<div className="flex-1 self-center">
					<h2 className="font-semibold text-2xl pb-8">Dispositivos!</h2>
				</div>
				<div className="flex-initial">
					<Link href="/devices/new">
						<a className="text-white shadow-greenShadow bg-textGreen rounded-lg px-4 py-2 font-semibold hover:bg-green-700">
							Nuevo Dispositivo
						</a>
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-10">
				{
					devices.map(device => (
						<div key={device.id} className="col-span-1 shadow-md rounded-lg">
							<Link href={`/devices/${device.id}`}>
								<a>
									<div className="text-center">
										<LinearChartCard device={device} />
									</div>
									<div className="px-8">
										<h3 className="pb-4 font-medium">
											{device.device === null ? device.unique_id : device.device}
										</h3>
										<div className="flex justify-between">
											<div>
												<CircleColor quality={device.averages.quality__avg} />
											</div>
											<div>
												<p className="font-medium">
													{device.averages.quality__avg === null ? 'Sin mediciones' : device.averages.quality__avg + '%'}
												</p>
											</div>
										</div>
									</div>
								</a>
							</Link>
						</div>
					))
				}
			</div>
		</div>
	)
}

Devices.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout1>
			{page}
		</Layout1>
	)
};
export default Devices