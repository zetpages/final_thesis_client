import React, {useContext, useState} from 'react';
import {CenterContext} from "../../App";
import {Button, ButtonGroup, Card, Dropdown, OverlayTrigger, Popover, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Routes} from "../../routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEllipsisH, faTrashAlt, faPlus, faGrip} from "@fortawesome/free-solid-svg-icons";
import RoomModal from "../../components/Modals/RoomModal";
import {fetchRoom, fetchStudent, removeOneRoom, removeOneStudent} from "../../http/boardAPI";
import {Context} from "../../index";
import TempElement from "./TempElement";

const RoomElement = () => {

    const {center} = useContext(CenterContext);
    const {board} = useContext(Context);
    const [roomVisible, setRoomVisible] = useState(false);


    const RoomRow = (room) => {

        const removeSingleRoom = () => {
            removeOneRoom(room.id).then(data => board.setRooms(data));
        }

        const descriptionPop = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">Описание</Popover.Header>
                <Popover.Body>
                    {room.description}
                </Popover.Body>
            </Popover>
        );

        return (
            <tr>
                <td>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                          <span className="icon icon-sm">
                            <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                          </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Изменить
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger" as={Button}  onClick={removeSingleRoom}>
                                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Удалить
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
                <td>
                    <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
                        {room.id}
                    </Card.Link>
                </td>
                <td>
                  <span className="fw-normal">
                    {room.name}
                  </span>
                </td>
                <td>
                    <OverlayTrigger trigger="click" placement="left" overlay={descriptionPop} >
                        <Button className="py-0 px-1 bg-none"><FontAwesomeIcon icon={faGrip} className="text-dark me-0 p-0"/></Button>
                    </OverlayTrigger>
                </td>
                <td>
                  <span className="fw-normal">
                    {room.branch?.name}
                  </span>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm student__table-wrapper with-effect">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                        <tr>
                            <th className="border-bottom">
                                <Button
                                    variant={"danger"}
                                    className="mt-0 mb-0 px-1 py-0"
                                    onClick={() => setRoomVisible(true)}
                                >
                                    <FontAwesomeIcon icon={faPlus} className="icon-dark" />
                                </Button>
                            </th>
                            <th className="border-bottom">ID</th>
                            <th className="border-bottom">Название</th>
                            <th className="border-bottom">Описание</th>
                            <th className="border-bottom">Филиал</th>
                        </tr>
                        </thead>
                        <tbody>
                        {center.rooms?.map(t => <RoomRow key={t.id} {...t} />)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <RoomModal show={roomVisible} onHide={() => setRoomVisible(false)}/>
        </>
    );
};

export default RoomElement;