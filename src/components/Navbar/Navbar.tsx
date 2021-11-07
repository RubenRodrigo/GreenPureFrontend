import { useRouter } from 'next/router'
import Link from 'next/link';
import { getSession, signOut, useSession } from 'next-auth/react'
import { Fragment, useEffect, useRef, useState } from 'react'

import { Popover, Transition } from '@headlessui/react'
import axios from 'axios'
import { BsPersonCircle, BsPersonFill, BsSearch } from 'react-icons/bs'
import { MdDeviceThermostat, MdHome } from 'react-icons/md';

export const Navbar = () => {
	const router = useRouter()
	const ref = useRef(null)
	const [searchButton, setSearchButton] = useState(false)

	const { data: session, status } = useSession()
	const handleSignOut = async () => {
		const session = await getSession()
		if (session) {
			const res = await axios({
				method: 'post',
				url: process.env.NEXT_PUBLIC_URL_API + '/auth/revoke-token',
				data: {
					client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
					client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
					token: session.refreshToken
				}
			})
		}

		const data = await signOut({ redirect: false, callbackUrl: "/" })
		router.push(data.url)
	}

	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setSearchButton(false)
			}
		}

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	return (
		<div className="pl-72 fixed top-0 w-full bg-white bg-opacity-60">
			<div className="flex p-4 relative">
				<div
					className="flex-1"
					ref={ref}
					onClick={() => setSearchButton(true)}
				>
					<button
						className={`px-4 py-2 w-full h-full ${searchButton ? 'invisible' : 'visible'}`}
					>
						<div className="flex gap-5 text-gray-500">
							<div className={`flex-initial self-center p-3 rounded-full hover:bg-gray-100 ${searchButton && 'bg-gray-100'}`}>
								<BsSearch className="text-xl" />
							</div>
							<div className="flex-1 text-left self-center">
								<span className="text-lg">
									Dispositivos
								</span>
							</div>
						</div>
					</button>
					<div className={`absolute left-0 top-0 right-0 bg-white z-10 bg-opacity-80 p-4 shadow-lg ${searchButton ? 'visible' : 'invisible'}`}>
						<div className="px-4 py-2">
							<div className="flex gap-5 text-gray-500">
								<div className={`flex-initial self-center p-3 rounded-full`}>
									<BsSearch className="text-xl" />
								</div>
								<div className="flex-1 text-left self-center w-full">
									<input className="text-lg w-full bg-transparent outline-none" type="text" placeholder="Dispositivos" />
								</div>
								<div className="flex-initial self-center pr-3">
									<button className="text-white shadow-greenShadow bg-textGreen rounded-lg px-4 py-2 font-semibold hover:bg-green-700">Buscar</button>
								</div>
							</div>
						</div>
						<div className="p-8 flex flex-col gap-5">
							<div className="w-full px-4 py-1 border-l-8 border-textGreen flex bg-gradient-to-r from-green-50 to-white">
								<MdDeviceThermostat className="block text-2xl self-center" />
								<p className="font-medium text-lg self-center">Dispositivo 1 - 49%</p>
							</div>
							<div className="w-full px-4 py-1 border-l-8 border-yellow-500 flex bg-gradient-to-r from-yellow-50 to-white">
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
							</div>
						</div>
					</div>
				</div>
				<div className="flex-initial relative ">
					<Popover className="relative">
						{({ open }) => (
							<>
								<Popover.Button>
									{
										status === 'authenticated' && (
											session.provider === 'credentials' ?
												<BsPersonCircle className={`w-10 h-10 ${open && 'bg-black'} bg-opacity-50 rounded-full`} />
												:
												<div className={`rounded-full border-2 border-transparent ${open && 'border-gray-500 bg-black bg-opacity-80'}`}>
													<img
														className="rounded-full"
														src={session.user.image}
														alt={session.user.name}
													/>
												</div>
										)
									}
								</Popover.Button>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-200"
									enterFrom="opacity-0 translate-y-1"
									enterTo="opacity-100 translate-y-0"
									leave="transition ease-in duration-150"
									leaveFrom="opacity-100 translate-y-0"
									leaveTo="opacity-0 translate-y-1"
								>
									<Popover.Panel className="absolute z-10 w-auto right-0">
										<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
											<div className="p-5 border-b">
												{
													status === 'authenticated' && <div>
														<p className="text-black font-medium">
															{session.user.name || `${session.user.first_name} ${session.user.last_name}`}
														</p>
														<p className="text-gray-500 text-xs">{session.user.email}</p>
													</div>
												}
											</div>
											<div className="pt-2">
												<ul>
													<li>
														<Link href="/dashboard">
															<a className="px-5 py-3 hover:bg-gray-100 flex font-medium gap-5">
																<div className="self-center">
																	<MdHome className="text-2xl" />
																</div>
																<span className="self-center">
																	Dashboard
																</span>
															</a>
														</Link>
													</li>
													<li>
														<Link href="/profile">
															<a className="px-5 py-3 hover:bg-gray-100 flex font-medium gap-5">
																<div className="self-center">
																	<BsPersonFill className="text-2xl" />
																</div>
																<span className="self-center">
																	Perfil
																</span>
															</a>
														</Link>
													</li>
												</ul>
											</div>
											<div className="px-5 pb-5 pt-2">
												<button
													onClick={handleSignOut}
													className="rounded-md border px-4 py-2 w-48"
												>
													Cerrar Sesión
												</button>
											</div>
										</div>
									</Popover.Panel>
								</Transition>
							</>
						)}
					</Popover>
				</div>
			</div>
		</div>
	)
}