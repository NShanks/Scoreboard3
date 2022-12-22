import { Link, useMatch, useResolvedPath } from "react-router-dom"


export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Site Name
            </Link>
            <ul>
                <CustomLink to="/active">Active</CustomLink>
                <CustomLink to="/tournaments">Tournaments</CustomLink>
                <CustomLink to="/create">Create</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({to, children, ...props }: any) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}