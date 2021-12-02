import { Device } from '@/interfaces/Device';
import { Line } from 'react-chartjs-2';

// TODO: LineChart -> Eduardo
interface Props {
	devices: Device[]
	device: Device
	selectDevice: (newDevice: Device) => void
}

function getCurrentDate(distance) {

	let newDate = new Date()
	let date = newDate.getDate();
	let month = newDate.getMonth() + 1;
	let year = newDate.getFullYear();
	let hour = newDate.getHours();
	let time = newDate.getMinutes();

	return `${hour - distance}:00`
}

export const LinearChart = ({ devices, device, selectDevice }: Props) => {
	console.log(devices)
	var cont = 1;
	var colors = ['rgba(253, 230, 138)', 'rgba(191, 219, 254)', 'rgba(254, 202, 202)', 'rgba(167, 243, 208)']
	var chartsData = devices.map(function (value, index) {
		var qualities = value.data_item.map(function (item) {
			return item.quality
		})
		var indicators = value.data_item.map(function (item) {
			let time = String(item.date_time).substring(11, 19)
			return time
		})
		return {
			label: 'Device ' + (index + 1),
			data: qualities,
			fill: false,
			tension: 0.5,
			backgroundColor: colors[index],
			borderColor: colors[index],
			labels: indicators,
			customID: value.id
		}
	})

	const data = {
		labels: chartsData[0].labels,
		datasets: chartsData
	};

	const onClickLabel = (event, legendItem, legend) => {
		const deviceId = legend.chart.data.datasets[legendItem.datasetIndex].customID
		selectDevice(devices.find(item => item.id === deviceId))
	}

	return (
		<>
			<Line data={data} options={{
				scales: {
					y: {
						beginAtZero: true
					}
				},
				plugins: {
					legend: {
						onClick: onClickLabel
					}
				}
			}} />
		</>
	)
}
