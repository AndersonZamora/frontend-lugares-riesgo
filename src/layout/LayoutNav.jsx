export const LayoutNav = ({ children }) => {
    return (
        <nav className="navbar bg-dark sticky-bottom navbar-expand-lg">
            <div className='container-fluid'>
                {children}
            </div>
        </nav>
    )
}
