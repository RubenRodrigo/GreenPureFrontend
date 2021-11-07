import { Navbar } from './Navbar/Navbar'
import { Sidebar } from './Sidebar/Sidebar'

const Layout1 = ({ children }) => {
	return (
		<div>
			<Navbar />
			<Sidebar />
			<div className="pl-72 pt-28">
				{children}
			</div>
		</div>
	)
}

export default Layout1
