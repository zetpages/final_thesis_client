import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Row, Col, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {CenterContext} from "../../App";
import {createRoom, fetchRoom, fetchBranch} from "../../http/boardAPI";
import {observer} from "mobx-react-lite";

const RoomModal = observer(({show, onHide}) => {
    const {board} = useContext(Context);
    const {center} = useContext(CenterContext);
    const centerId = center.id;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // useEffect(() => {
    //     fetchRoom().then(data => board.setRooms(data));
    //     fetchBranch().then(data => board.setBranches(data));
    // }, []);


    const addRoom = () => {
        const formData = new FormData()
        formData.append('name', name);
        formData.append('description', description);
        formData.append('cebterId', centerId);
        formData.append('branchId', board.selectedBranch.id);

        createRoom(formData).then(data => board.setRooms(data));
        onHide()
    }

    // const addRoom = () => {
    //     const formData = new FormData()
    //     formData.append('name', "asdfasdsdffasdf");
    //     formData.append('description', "asdfasdfasdf");
    //     formData.append('centerId', "5");
    //     formData.append('branchId', "1");
    //
    //     createRoom(formData).then(data => board.setRooms(data));
    //     onHide()
    // }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить аудиторий
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Dropdown as={Col} className="mt-2 mb-2">
                            <Dropdown.Toggle >{board.selectedBranch.name || "Филиал"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {board.branches.map(branch =>
                                    <Dropdown.Item
                                        onClick={() => board.setSelectedBranch(branch)}
                                        key={branch.id}
                                    >
                                        {branch.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                    </Row>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="ФИО"
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Description"
                    />

                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addRoom}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default RoomModal;