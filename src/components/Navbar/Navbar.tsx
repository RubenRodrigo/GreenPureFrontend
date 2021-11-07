import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

export const Navbar = () => {
	const router = useRouter()
	const handleSignOut = async () => {
		const session = await getSession()
		if (session) {
			const res = await axios({
				method: 'post',
				url: process.env.NEXT_PUBLIC_URL_API + '/auth/revoke-token',
				data: {
					client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
					client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
					token: session.refreshToken
				}
			})
		}

		const data = await signOut({ redirect: false, callbackUrl: "/" })
		router.push(data.url)
	}

	return (
		<div className="pl-72">
			<button
				onClick={handleSignOut}
				className="rounded-md border px-4 py-2"
			>
				Cerrar Sesión
			</button>
		</div>
	)
}

