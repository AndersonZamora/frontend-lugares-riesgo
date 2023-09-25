import { Modal } from 'react-bootstrap';
import { CardNotifi } from './CardNotifi';

export const ModalSerene = ({ aler, onHide, show }) => {

    return (
        <Modal
            show={show} onHide={onHide}
            scrollable
            size='sm'
        >
            <Modal.Header
                closeButton
                style={{ backgroundColor: '#4e73df', color: 'white' }}
            >
                <Modal.Title>Notifiaciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    aler.map(data => (
                        <CardNotifi
                            key={data.Id}
                            children={data}
                        />
                    ))
                }

            </Modal.Body>
        </Modal>
    )
}
