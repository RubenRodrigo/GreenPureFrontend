import React, { useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import SearchResult from './SearchResult';

export const SearchBar = () => {
	const ref = useRef(null)
	const [searchButton, setSearchButton] = useState(false)

	// TODO: Make a custom hook
	useEffect(() => {
		/**
		 * searchButton true if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setSearchButton(false)
			}
		}

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
	return (
		<div
			className="w-full"
			ref={ref}
			onClick={() => setSearchButton(true)}
		>

			<button
				className={`px-4 py-2 w-full h-full ${searchButton ? 'invisible' : 'visible'}`}
			>
				<div className="flex gap-5 text-gray-500">
					<div className={`flex-initial self-center p-3 rounded-full hover:bg-gray-100 ${searchButton && 'bg-gray-100'}`}>
						<BsSearch className="text-xl" />
					</div>
					<div className="flex-1 text-left self-center">
						<span className="text-lg">
							Dispositivos
						</span>
					</div>
				</div>
			</button>
			<div className={`absolute left-0 top-0 right-0 bg-white z-10 bg-opacity-80 p-4 shadow-lg ${searchButton ? 'visible' : 'invisible'}`}>
				<div className="px-4 py-2">
					<div className="flex gap-5 text-gray-500">
						<div className={`flex-initial self-center p-3 rounded-full`}>
							<BsSearch className="text-xl" />
						</div>
						<div className="flex-1 text-left self-center w-full">
							<input className="text-lg w-full bg-transparent outline-none" type="text" placeholder="Dispositivos" />
						</div>
						<div className="flex-initial self-center pr-3">
							<button className="text-white shadow-greenShadow bg-textGreen rounded-lg px-4 py-2 font-semibold hover:bg-green-700">Buscar</button>
						</div>
					</div>
				</div>
				<div className="p-8">
					<SearchResult searchButton={searchButton} />
				</div>
			</div>
		</div>
	)
}
