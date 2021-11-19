import Link from 'next/link';
import Layout1 from '@/components/Layout1';
import { Device } from '@/interfaces/Device';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import React, { ReactElement, Fragment, useState, ChangeEvent } from 'react'
import { axiosInstanceFetch } from 'src/helpers/axiosInstance';
import { MeasureCard } from '@/components/Cards/MeasureCard';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { Dialog, Transition } from '@headlessui/react'

type PageProps = {
	data: Device | null
	error: null | number
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
	const session = await getSession(context)
	const { query } = context

	if (!session || session.error) {
		return {
			redirect: {
				destination: '/', // some destination '/dashboard' Ex,
				permanent: false,
			},
		}
	}

	try {
		const res = await axiosInstanceFetch(session).get(`/device/${query.id}?filter_by=720`);
		const data: Device = res.data

		return {
			props: { data, error: null },
		}
	} catch (e) {
		console.log("ERROR", e.response.data);
		console.log("ERROR", e.response.status);
		return {
			props: { data: null, error: e.response.status },
		}
	}
}

type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const Index = ({ data, error }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

	const [isOpen, setIsOpen] = useState(false)
	const [device, setDevice] = useState(data)
	const [deviceName, setDeviceName] = useState("")

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	const handleOnChange = ({ target: { name, value } }: HandleInputChange) => {
		setDeviceName(value)
	}

	return (
		<div className="px-8 py-4 max-w-screen-2xl mx-auto">
			{error &&
				<div>
					<h3 className="font-medium">
						Este dispositivo no existe o no estas autorizado para verlo...
					</h3>
				</div>
			}
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30"
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Cambiar nombre del dispositivo
								</Dialog.Title>
								<div className="mt-2 py-2">
									<input
										className="w-full focus:outline-none border rounded-lg p-2"
										placeholder="Dispositivo..."
										type="text"
										value={deviceName}
										onChange={handleOnChange}
									/>
								</div>

								<div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={closeModal}
									>
										Guardar!
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
			<div className="flex">
				<div className="flex-1 self-center flex gap-5 pb-8 ">
					<h2 className="font-medium text-2xl self-center">
						Dispositivo {device.device === null ? device.unique_id : device.device}
					</h2>
					<button
						onClick={openModal}
					>
						<HiOutlinePencil className="w-5 h-5 self-center text-gray-500" />
					</button>
				</div>
				<div className="flex-initial">
					<Link href="/devices/new">
						<a className="text-white shadow-greenShadow bg-textGreen rounded-lg px-4 py-2 font-semibold hover:bg-green-700">
							Nuevo Dispositivo
						</a>
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-10">
				<div className="col-span-1">
					<div className="p-2 border rounded-lg h-96 mb-8">
						<h3>Calidad</h3>
					</div>
					<h3 className="font-medium text-lg">Últimos Registros</h3>
					<hr className="mb-6 mt-2" />
					{
						device.data_item.map((data, index) => {
							if (index < 8) {
								return (
									<MeasureCard key={data.id} data={data} />
								)
							}
						})
					}
				</div>
				<div className="col-span-1 flex flex-col justify-between">
					<div className="flex-initial">
						<div className="border rounded-lg h-32 mb-8">
						</div>
						<div className="border rounded-lg h-32 mb-5">
						</div>
						<div className="border rounded-lg h-32 mb-5">
						</div>
					</div>
					<div className="flex-initial">
						<div className="border rounded-lg p-5">
							<h3 className="font-medium text-lg">Acciones del dispositivo</h3>
							<hr />
							<div className="py-8 flex justify-between">
								<button className="p-2 bg-blue-800 rounded-lg">
									<div className="flex text-xl text-white gap-2 px-4">
										<HiOutlinePencil className="self-center" />
										<span>Editar</span>
									</div>
								</button>
								<button className="p-2 bg-red-800 rounded-lg">
									<div className="flex text-xl text-white gap-2 px-4">
										<HiOutlineTrash className="self-center" />
										<span>Eliminar</span>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

Index.getLayout = function getLayout(page: ReactElement) {

	return (
		<Layout1>
			{page}
		</Layout1>
	)
};

export default Index;