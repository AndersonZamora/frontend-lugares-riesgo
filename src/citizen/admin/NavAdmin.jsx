import { NavLink } from 'react-router-dom';
import { LayoutNav } from '../../layout';
import { useAuthStore } from '../../hooks/';

export const NavAdmin = () => {

    const { user } = useAuthStore()

    const handleRemoveMenu = () => {
        const nav = document.querySelector('#navbarSupportedContent');
        nav.classList.remove('show');
    }

    return (
        <LayoutNav>
            <>
                <NavLink
                    to="/"
                    className="navbar-brand"
                >
                    Vigilantes Online
                </NavLink >
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" onClick={handleRemoveMenu}>
                            <NavLink
                                to="/"
                                className="nav-link"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item" onClick={handleRemoveMenu}>
                            <NavLink
                                to="/users"
                                className="nav-link"
                            >
                                Usuarios
                            </NavLink>
                        </li>
                        <li className="nav-item" onClick={handleRemoveMenu}>
                            <NavLink
                                to="/serene"
                                className="nav-link"
                            >
                                Serenos
                            </NavLink>
                        </li>
                        <li className="nav-item" onClick={handleRemoveMenu}>
                            <NavLink
                                to="/info"
                                className="nav-link"
                            >
                                Publicaciones
                            </NavLink>
                        </li>
                        <li className="nav-item" onClick={handleRemoveMenu}>
                            <NavLink
                                to="/place"
                                className="nav-link"
                            >
                                Zonas
                            </NavLink>
                        </li>
                    </ul>
                    <li className="nav-item dropdown no-arrow" onClick={handleRemoveMenu}>
                        <NavLink
                            to="/perfil"
                            className="navbar-brand"
                            style={{ fontSize: '13px' }}
                        >
                            {user.name}
                        </NavLink >
                    </li>
                </div>
            </>
        </LayoutNav>
    )
}
