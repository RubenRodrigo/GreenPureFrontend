import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '@/public/logo.png'
import { useSession } from 'next-auth/react'
import { ImQrcode } from 'react-icons/im'
import { MdOutlinePowerSettingsNew } from 'react-icons/md'
import { BiDevices, BiHistory } from 'react-icons/bi'
import { SidebarLink } from '../Links/SidebarLink'
import { BsPersonCircle } from 'react-icons/bs'

export const Sidebar = () => {

	const { data: session, status } = useSession()

	return (
		<div className="w-72 border-r fixed top-0 h-screen bg-white">
			<div className="overflow-y-auto invisible h-full hover:visible">
				<div className="visible h-full flex flex-col justify-between">
					<div className="w-full p-4 flex flex-col gap-10 flex-initial">
						<div className="flex justify-between w-full">
							<div className="w-28">
								<Image
									src={Logo}
									alt="GreenPure"
									layout="responsive"
								/>
							</div>
							<div className="self-center">
								<button className="p-1 border border-black rounded-full">
									<span className="w-3 h-3 block rounded-full bg-black"></span>
								</button>
							</div>
						</div>
						<div className="w-full bg-gray-100 rounded-lg py-4 px-4 flex gap-5">
							<div className="flex-initial relative">
								{
									status === 'authenticated' && (
										session.provider === 'credentials' ?
											<BsPersonCircle className="w-10 h-10" />
											:
											<img
												className="rounded-full"
												src={session.user.image}
												alt={session.user.name}
											/>
									)
								}
							</div>
							<div className="flex-1 self-center">
								{
									status === 'authenticated' && <div>
										<p className="text-black font-medium">
											{session.user.name || `${session.user.first_name} ${session.user.last_name}`}
										</p>
										<p className="text-gray-500 text-xs">{session.user.email}</p>
									</div>
								}
							</div>
						</div>
					</div>
					<div className="flex-1">
						<h3 className="pl-10 py-4 font-semibold">Generales</h3>
						<ul>
							<li>
								<SidebarLink
									href="/dashboard"
									exact
									className="bg-opacity-40 text-gray-500 hover:bg-gray-100 w-full font-medium flex pl-10 py-4 gap-4"
								>
									<div className="self-center">
										<MdOutlinePowerSettingsNew className="text-2xl" />
									</div>
									<span className="self-center">
										Dashboard
									</span>
								</SidebarLink>
							</li>
							<li>
								<SidebarLink
									href="/devices"
									exact
									className="bg-opacity-40 text-gray-500 hover:bg-gray-100 w-full font-medium flex pl-10 py-4 gap-4"
								>
									<div className="self-center">
										<BiDevices className="text-2xl" />
									</div>
									<span className="self-center">
										Dispositivos
									</span>
								</SidebarLink>
							</li>
							<SidebarLink
								href="/Historial"
								exact
								className="bg-opacity-40 text-gray-500 hover:bg-gray-100 w-full font-medium flex pl-10 py-4 gap-4"
							>
								<div className="self-center">
									<BiHistory className="text-2xl" />
								</div>
								<span className="self-center">
									Historial de Mediciones
								</span>
							</SidebarLink>
						</ul>
					</div>
					<div className="w-full px-4 py-8 flex flex-col gap-10 flex-initial">
						<div className="flex justify-center">
							<ImQrcode className="w-36 h-36" />
						</div>
						<div>
							<p className="text-center">Nuevo Dispositivo</p>
							<p className="text-sm text-gray-500 text-center">Puedes añadir nuevos dispositivos</p>
						</div>
						<button className="text-white bg-textGreen rounded-lg p-3 shadow-2xl font-semibold hover:bg-green-700">Añadir Dispositivo</button>
					</div>
				</div>
			</div>
		</div>
	)
}
