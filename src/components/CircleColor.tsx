import React from 'react'

interface Props {
	quality: number | null
}

export const CircleColor = ({ quality }: Props) => {
	if (quality === null) {
		return (
			<div className="w-4 h-4 bg-gray-400 rounded-full"></div>
		)
	}
	if (quality <= 30) {
		return (
			<div className="w-4 h-4 bg-textGreen rounded-full"></div>
		)
	} else if (quality <= 50) {
		return (
			<div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
		)
	} else if (quality <= 70) {
		return (
			<div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
		)
	} else {
		return (
			<div className="w-4 h-4 bg-red-700 rounded-full"></div>
		)
	}
}
