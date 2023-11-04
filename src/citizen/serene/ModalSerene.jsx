import { Modal } from 'react-bootstrap';
import { CardNotifi } from './CardNotifi';

export const ModalSerene = ({ aler, onHide, show, handle }) => {

    return (
        <Modal
            show={show} onHide={onHide}
            scrollable
            size='sm'
        >
            <Modal.Header
                closeButton
                style={{ backgroundColor: 'red', color: 'white' }}
            >
                <Modal.Title>Notifiaciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    aler.map(data => (
                        <CardNotifi
                            key={data.Id}
                            children={data}
                            handle={handle}
                        />
                    ))
                }

            </Modal.Body>
        </Modal>
    )
}
