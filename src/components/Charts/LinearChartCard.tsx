import { Device } from '@/interfaces/Device';
import { Line } from 'react-chartjs-2';
import moment from 'moment'
import 'chartjs-adapter-moment';
import { start } from 'repl';
interface Props {
	device: Device
}

type ColorTypes = {
	backgroundColor: string;
	backgroundColorGradient: string;
	borderColor: string;
}

const getColor = (quality: number): ColorTypes => {

	if (quality === null) {
		return {
			backgroundColor: 'rgba(137, 137, 138, 0)',
			backgroundColorGradient: '#ffffff',
			borderColor: 'rgb(156, 163, 175)'
		}
	}
	if (quality <= 30) {
		return {
			backgroundColor: 'rgba(0, 171, 85, 0.3)',
			backgroundColorGradient: 'rgb(0, 171, 85, 0.01)',
			borderColor: 'rgb(0, 171, 85)'
		}
	} else if (quality <= 50) {
		return {
			backgroundColor: 'rgba(211, 177, 65, 0.3)',
			backgroundColorGradient: 'rgba(211, 177, 65, 0.01)',
			borderColor: 'rgb(252, 211, 77)'
		}
	} else if (quality <= 70) {
		return {
			backgroundColor: 'rgba(217, 119, 6, 0.3)',
			backgroundColorGradient: 'rgba(217, 119, 6, 0.01)',
			borderColor: 'rgba(217, 119, 6, 1)'
		}
	} else {
		return {
			backgroundColor: 'rgb(185, 28, 28, 0.3)',
			backgroundColorGradient: 'rgba(185, 28, 0.01)',
			borderColor: 'rgb(185, 28, 28)'
		}
	}
}

export const LinearChartCard = ({ device }: Props) => {

	const [labels, dataset] = device.data_item.reduce(([a, b], { date_time, quality }) => {
		a.push(date_time);
		b.push(quality);
		return [a, b];
	}, [[], []]);

	const colors = getColor(device.averages.quality__avg)

	const data = (canvas: HTMLCanvasElement) => {
		// const ctx = canvas.getContext("2d");
		// const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height - 10);
		// gradient.addColorStop(0, colors.backgroundColor);
		// gradient.addColorStop(1, colors.backgroundColorGradient);

		return {
			labels: labels,
			pointStyle: 'circle',
			datasets: [{
				label: device.device,
				pointStyle: "circle",
				// backgroundColor: gradient,
				borderColor: colors.borderColor,
				data: dataset,
				fill: false,
				tension: 0.5,
				pointBorderColor: colors.borderColor,
				pointBackgroundColor: colors.borderColor,
				pointHoverBackgroundColor: colors.borderColor,
				pointHoverBorderColor: colors.backgroundColor,
			}],
		}
	};

	return (
		<>
			<Line data={data} options={{
				scales: {
					xAxes:
					{
						type: 'time',
						time: {
							unit: 'hour',
							displayFormats: {
								'hour': 'DD HH:MM',
							},
						},
						display: false,
						max: labels[0],
						min: labels[labels.length - 1],
					},
					yAxes: {
						grid: {
							borderWidth: 0,
							lineWidth: 1,
							borderDash: [5]
						},
						ticks: {
							color: '#979797'
						}
					}
				},
				plugins: {
					legend: {
						align: "end",
						labels: {
							usePointStyle: true,
							color: '#000',
						},
					},
				},
				elements: {
					line: {
						borderWidth: 2,
						fill: true,
					},
					point: {
						radius: 3,
						borderWidth: 1,
						hoverRadius: 6,
						hoverBorderWidth: 3,
					}
				},
				hover: {
					intersect: false
				}
			}}
				className="p-2"
			/>
		</>
	)
}
