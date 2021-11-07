import { ReactElement } from "react";
import Layout1 from "@/components/Layout1";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Dashboard = () => {
	return (
		<div>
			Dashboard
		</div>
	)
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
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

export default Dashboard