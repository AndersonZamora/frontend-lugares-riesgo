import { Button, Form } from 'react-bootstrap';
import { useAuthStore, useFormr } from '../hooks';
import { useVLogin } from '../validator';
import { LayoutAuth } from '../layout';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

    const navigate = useNavigate();
    const { email, password, formStata, onInputChange } = useFormr({ email: '', password: '' });
    const { valEmail, valPass, state } = useVLogin(formStata);
    const { startLogin, authState, loadindAuth } = useAuthStore();

    const loginSubmit = (event) => {
        event.preventDefault();
        if (state) {
            startLogin({ email, password });
        }
    }

    const handlePage = () => {
        navigate('/signup')
    }

    return (
        <LayoutAuth title={'¡Bienvenido de nuevo!'}>
            <Form className="user" onSubmit={loginSubmit}>
                <Form.Group>
                    <Form.Control
                        type="tex"
                        value={email}
                        autoComplete="off"
                        onChange={onInputChange}
                        className={`${valEmail}`}
                        name="email"
                        placeholder="Email"
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Control
                        type="password"
                        value={password}
                        autoComplete="off"
                        onChange={onInputChange}
                        className={`${valPass}`}
                        name="password"
                        placeholder="Contraseña"
                    />
                </Form.Group>
                <br />
                {
                    (loadindAuth) ?
                        (
                            <div className='text-center'>
                                <span className="loader"></span>
                            </div>
                        ) : (
                            <div className='text-center'>
                                <Button disabled={!state} type='onSumit' variant="primary" size="sm">
                                    Ingresar
                                </Button>
                            </div>
                        )
                }
            </Form>
            <hr />
            {
                (authState === 'citizen') && (
                    <div className="text-center">
                        <a type='button' onClick={handlePage} className="small">¡Crea una cuenta!</a>
                    </div>
                )
            }
        </LayoutAuth>
    )
}
