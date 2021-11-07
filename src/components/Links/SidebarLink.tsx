import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';

export { SidebarLink };

SidebarLink.propTypes = {
	href: PropTypes.string.isRequired,
	exact: PropTypes.bool
};

SidebarLink.defaultProps = {
	exact: false
};

function SidebarLink({ href, exact, children, ...props }) {
	const { pathname } = useRouter();
	const isActive = exact ? pathname === href : pathname.startsWith(href);

	if (isActive) {
		props.className += ' bg-green-100 text-textGreen border-r-4 border-textGreen ';
	}

	return (
		<Link href={href}>
			<a {...props}>
				{children}
			</a>
		</Link>
	);
}