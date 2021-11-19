import Layout1 from '@/components/Layout1';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import { axiosInstanceFetch } from 'src/helpers/axiosInstance';
import dynamic from 'next/dynamic'

const QRWebcamComponent = dynamic(
	() => import('@/components/QRWebcam/QRWebcam'),
	{ ssr: false }
)

interface CodeActivation {
	code: string
}
const New = () => {

	const [activateWebCam, setActivateWebCam] = useState<boolean>(false)
	const [codeActivation, setCodeActivation] = useState<CodeActivation>({
		code: ''
	})

	type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
	const handleChange = ({ target: { name, value } }: HandleInputChange) => {
		setCodeActivation({
			...codeActivation,
			[name]: value,
		})
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		activateDevice(codeActivation.code)
	}

	const activateDevice = async (code: string) => {
		const session = await getSession()
		const res = await axiosInstanceFetch(session).get(`/device/activate/${code.split(' ').join('')}`);
		if (res.status === 204) {
			console.log(res.data);
		}
	}

	return (
		<div className="px-8 py-4 max-w-screen-2xl mx-auto">
			<h2 className="font-semibold text-2xl pb-8">Añade un nuevo dispositivo!</h2>
			<div className="flex gap-10">
				<div className="p-5 border shadow-md rounded-lg flex-1">
					<div className="w-full p-4 text-center">
						<button
							onClick={() => setActivateWebCam((prev) => !prev)}
							className="text-white bg-textGreen rounded-lg p-3 shadow-greenShadow font-semibold hover:bg-green-700 text-center"
						>
							{activateWebCam ? 'Desactivar ' : 'Activar '}
							WebCam
						</button>
						<div className="pt-4">
							{
								activateWebCam &&
								<QRWebcamComponent activateDevice={activateDevice} setActivateWebCam={setActivateWebCam} />
							}
						</div>
					</div>
				</div>
				<div className="flex-1">
					<form onSubmit={onSubmit}>
						<h3 className="font-medium pb-10">O usa el código de activación!</h3>
						<input
							type="text"
							name="code"
							value={codeActivation.code}
							onChange={handleChange}
							placeholder="Ingresa el código"
							className="border w-full rounded-md p-3"
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

New.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout1>
			{page}
		</Layout1>
	)
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)

	if (!session || session.error) {
		return {
			redirect: {
				destination: '/', // some destination '/dashboard' Ex,
				permanent: false,
			},
		}
	}

	return {
		props: {},
	}
}

export default New