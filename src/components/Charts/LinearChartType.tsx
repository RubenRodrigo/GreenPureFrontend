import { Device } from '@/interfaces/Device';
import { Line } from 'react-chartjs-2';
import moment from 'moment'
import 'chartjs-adapter-moment';
import { start } from 'repl';
interface Props {
	labels: number[]
	dataset: string[]
	type: string
	borderColor: string
	backgroundColor: string
}
export const LinearChartType = ({ labels, dataset, type, borderColor, backgroundColor }: Props) => {

	const data = (canvas: HTMLCanvasElement) => {

		return {
			labels: labels,
			pointStyle: 'circle',
			datasets: [{
				label: type,
				pointStyle: "circle",
				borderColor: borderColor,
				data: dataset,
				fill: false,
				tension: 0.5,
				pointBorderColor: borderColor,
				pointBackgroundColor: borderColor,
				pointHoverBackgroundColor: borderColor,
				pointHoverBorderColor: backgroundColor,
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
