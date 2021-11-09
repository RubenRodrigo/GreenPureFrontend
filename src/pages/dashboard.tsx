import { ReactElement } from "react";
import Layout1 from "@/components/Layout1";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { FaTemperatureLow } from "react-icons/fa";
import { LinearChart } from "@/components/Charts/LinearChart";

const Dashboard = () => {
	return (
		<div className="px-8 py-4 max-w-screen-2xl mx-auto">
			<h2 className="font-semibold text-2xl pb-8">Hola, revisa el estado de tus dispositivos!</h2>
			<div className="flex gap-5 w-full">
				<div className="flex-1">
					{/* CARDS */}
					<div className="py-10 rounded-xl bg-green-200 text-green-900">
						<div className="text-center flex justify-center pb-4">
							<div className="p-4 rounded-full bg-gradient-to-tr from-green-400 to-green-200">
								<FaTemperatureLow className="w-6 h-6 font-light" />
							</div>
						</div>
						<p className="text-center text-4xl font-bold pb-2">78.5ºC</p>
						<p className="text-center font-medium">Temperatura promedio</p>
					</div>
				</div>
				<div className="flex-1">
					<div className="py-10 rounded-xl bg-blue-200">
						<div className="text-center flex justify-center pb-4">
							<div className="p-4 rounded-full bg-gradient-to-tr from-blue-400 to-blue-200">
								<FaTemperatureLow className="w-6 h-6 font-light" />
							</div>
						</div>
						<p className="text-center text-4xl font-bold pb-2">78.5ºC</p>
						<p className="text-center font-medium">Temperatura promedio</p>
					</div>
				</div>
				<div className="flex-1">
					<div className="py-10 rounded-xl bg-yellow-200">
						<div className="text-center flex justify-center pb-4">
							<div className="p-4 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-200">
								<FaTemperatureLow className="w-6 h-6 font-light" />
							</div>
						</div>
						<p className="text-center text-4xl font-bold pb-2">78.5ºC</p>
						<p className="text-center font-medium">Temperatura promedio</p>
					</div>
				</div>
				<div className="flex-1">
					<div className="py-10 rounded-xl bg-red-200">

						<div className="text-center flex justify-center pb-4">
							<div className="p-4 rounded-full bg-gradient-to-tr from-red-400 to-red-200">
								<FaTemperatureLow className="w-6 h-6 font-light" />
							</div>
						</div>
						<p className="text-center text-4xl font-bold pb-2">78.5ºC</p>
						<p className="text-center font-medium">Temperatura promedio</p>
					</div>
				</div>
			</div>
			<div className="my-6 p-8 bg-white border shadow-lg rounded-xl">
				<h3 className="font-bold text-xl">Calidad del Aire</h3>
				<LinearChart />
			</div>
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

export default Dashboard
