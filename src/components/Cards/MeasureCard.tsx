import { DataItem } from '@/interfaces/Device'
import React, { useState } from 'react'
import { FiThermometer } from 'react-icons/fi'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { ColorContainer } from './ColorContainer'

interface Props {
	data: DataItem | undefined
}

export const MeasureCard = ({ data }: Props) => {

	const date = new Date(data.date_time)
	return (
		<div className="mb-5">
			<ColorContainer quality={data.quality} >
				<div className="flex gap-5">
					<div className="flex-initial self-center">
						<FiThermometer className="w-7 h-7" />
					</div>
					<div className="flex-1 self-center">
						<h3 className="font-semibold">Calidad medida</h3>
						{
							data &&
							<h3 className="text-xl">
								{data.quality}
							</h3>
						}
					</div>
					<div className="flex-initial self-center flex gap-5">
						<div className="flex-initial">
							<h3 className="text-center">
								{date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()}
							</h3>
							<h3 className="text-center font-medium">
								{date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}
							</h3>
						</div>
						<div className="flex-initial flex flex-col">
							{
								data.difference_quality > 0 ?
									<AiOutlineArrowUp className="w-8 h-8 text-red-600" />
									:
									<AiOutlineArrowDown className="w-8 h-8 text-textGreen" />
							}
							<span className="text-center">{data.difference_quality}</span>
						</div>
					</div>
				</div>
			</ColorContainer>
		</div>
	)
}
