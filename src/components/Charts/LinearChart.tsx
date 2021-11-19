import { Device } from '@/interfaces/Device';
import { Line } from 'react-chartjs-2';

// TODO: LineChart -> Eduardo
interface Props {
	devices: Device[]
	device: Device
	selectDevice: (newDevice: Device) => void
}

export const LinearChart = ({ devices, device, selectDevice }: Props) => {
	const data = {
		labels: ['1', '2', '3', '4', '5', '6', '7'],
		datasets: [
			{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true
			}
		}
	};

	return (
		<>
			<Line data={data} options={options} />
		</>
	)
}
