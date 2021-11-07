import Image, { ImageLoader } from 'next/image'
import { BsPersonCircle } from 'react-icons/bs'

const myLoader: ImageLoader = ({ src, width, quality }) => {
	return `${src}?w=${width}&q=${quality || 25}`
}

export const ImageFillFetch = ({ src, alt }) => {
	if (src == undefined) {
		return (
			<BsPersonCircle />
		)
	} else {
		return (
			<Image
				loader={myLoader}
				alt={alt}
				src={`${src}`}
				layout="fill"
				objectFit="cover"
			/>
		)
	}
}
