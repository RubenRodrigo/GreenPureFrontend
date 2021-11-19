import { ReactElement } from "react"

interface Props {
	quality: number | null
	children: ReactElement
}

export const ColorContainer = ({ quality, children }: Props) => {

	if (quality === null) {
		return (
			<div className="border-l-8 border-gray-400 bg-gradient-to-r from-gray-50 to-white">
				{children}
			</div>
		)
	}

	if (quality <= 30) {
		return (
			<div className="border-l-8 border-textGreen bg-gradient-to-r from-green-50 to-white">
				{children}
			</div>
		)
	} else if (quality <= 50) {
		return (

			<div className="border-l-8 border-yellow-300 bg-gradient-to-r from-yellow-50 to-white">
				{children}
			</div>
		)
	} else if (quality <= 70) {
		return (
			<div className="border-l-8 border-yellow-600 bg-gradient-to-r from-yellow-50 to-white">
				{children}
			</div>
		)
	} else {
		return (
			<div className="border-l-8 border-red-700 bg-gradient-to-r from-red-50 to-white">
				{children}
			</div>
		)
	}
}
