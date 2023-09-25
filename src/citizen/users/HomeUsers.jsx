import { useNavigate } from 'react-router-dom';
import { listOpcion } from '../../helpers';
import { LayoutContainer } from '../../layout';
import { CardHome } from './CardHome';

export const HomeUsers = () => {

    const navigate = useNavigate();

    const handleNav = (cat) => {
        navigate(`/${cat}`)
    }

    return (
        <LayoutContainer>
            <div className="row">
                {
                    listOpcion.map(car => (
                        <CardHome
                            children={car}
                            key={car.id}
                            eve={handleNav}
                        />
                    ))
                }
            </div>
        </LayoutContainer>
    )
}
