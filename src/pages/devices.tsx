import Layout1 from '@/components/Layout1';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React, { ReactElement } from 'react'

const Devices = () => {
	return (
		<div>
			devices
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)

	if (!session) {
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

export default Devices
