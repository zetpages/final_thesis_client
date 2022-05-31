import React, {useContext, useState} from 'react';
import {Button, Form, Row, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {CenterContext} from "../../App";
import {createBranch} from "../../http/boardAPI";
import {observer} from "mobx-react-lite";

const BranchModal = observer(({show, onHide}) => {
    const {board} = useContext(Context);
    const {center} = useContext(CenterContext);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const addBranch = () => {
        const formData = new FormData()
        formData.append('name', name);
        formData.append('address', address);
        formData.append('centerId', center.id);

        createBranch(formData).then(data => board.setBranches(data));
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить филиал
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>

                    </Row>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Название"
                    />
                    <Form.Control
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="mt-3"
                        placeholder="Адрес"
                    />

                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addBranch}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default BranchModal;