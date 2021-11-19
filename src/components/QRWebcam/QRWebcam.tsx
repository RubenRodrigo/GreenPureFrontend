import React, { useState } from 'react'
import QrReader from 'react-qr-reader';

// TODO: Add types to props
interface Props {

}

const QRWebcam = ({ activateDevice, setActivateWebCam }) => {

	const handleErrorWebCam = (error) => {
		console.log(error);
	}
	const handleScanWebCam = (result: string) => {
		if (result) {
			activateDevice(result)
			setActivateWebCam(prev => !prev)
		}
	}

	return (
		<div>
			<QrReader
				delay={300}
				style={{ width: '100%', borderRadius: '10px' }}
				onError={handleErrorWebCam}
				onScan={handleScanWebCam}
			/>
		</div>
	)
}

export default QRWebcam