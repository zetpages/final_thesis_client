import React, {useContext, useState } from "react";
import InnerTopBar from "./components/InnerTopBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {CenterContext} from "../App";
import {
    Button,
    ButtonGroup,
    Card,
    Dropdown,
    Image,
    Nav,
    OverlayTrigger,
    Pagination,
    Popover,
    Table
} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Routes} from "../routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faEllipsisH,
    faEye,
    faTrashAlt,
    faU,
    faEnvelope,
    faPhone,
    faGrip,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import StudentModal from "../components/Modals/StudentModal";
import {fetchAdmin, fetchStudent, removeOneGroup, removeOneStudent} from "../http/boardAPI";

const Groups = observer(() => {
    const {board, user} = useContext(Context);
    const {center, loggedUser} = useContext(CenterContext);
    const totalGroups = center.groups?.length;
    const [studentVisible, setStudentVisible] = useState(false);

    console.log(center);


    const GroupRow = (group) => {

        const statusName = group.groupStatusId === 1 ? "Обучается"
            : group.groupStatusId === 2 ? "Пауза" :  "Завершили";

        const statusVariant = statusName === "Обучается" ? "success"
            : statusName === "Пауза" ? "warning"
                : statusName === "Завершили" ? "danger" : "primary";

        const schedulePop = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">Расписание</Popover.Header>
                <Popover.Body>
                    {
                        group.regular_classes.map((k) =>
                            <span key={k.id}>
                                <span className="fw-normal">
                                    {k.scheduleStart.substring(0,5)}-{k.scheduleEnd.substring(0,5)}
                                </span>
                                <br/>
                                <span>
                                    {k.weekDays.map((l, i) =>
                                        <span className="fw-normal inner__week-day" key={i}>
                                            {l}
                                        </span>
                                    )}
                                </span>
                            </span>
                        )
                    }
                </Popover.Body>
            </Popover>
        );

        const coursesPop = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">Расписание</Popover.Header>
                <Popover.Body>
                    {
                        group.regular_classes?.map((k, i) =>
                            <div className="fw-normal" key={i}>
                                {k.course?.name}
                            </div>
                        )
                    }
                </Popover.Body>
            </Popover>
        );

        const roomPop = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">Расписание</Popover.Header>
                <Popover.Body>
                    {
                        group.regular_classes?.map((k,i) =>
                            <span className="fw-normal" key={i}>
                                {k.room?.name}
                            </span>
                        )
                    }
                </Popover.Body>
            </Popover>
        );

        const studentPop = (
            <Popover id="popover-basic">
                <Popover.Header as="h3">Ученики</Popover.Header>
                <Popover.Body>
                    {
                        group.students?.map((k) =>
                            <div key={k.id}>
                                <span className="fw-normal">
                                {k?.name}
                            </span>
                            </div>
                        )
                    }
                </Popover.Body>
            </Popover>
        );


        const bgStyle = {
            background: group?.color,
            width: 29,
            height: 29
        }




        const removeSingleGroup = () => {
            console.log(group);
            removeOneGroup(group.id);
            fetchAdmin().then(data => board.setAdmins(data));
        }

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
                            <Dropdown.Item as={Link} to={Routes.Groups.path + '/' + group.id}>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> Детали
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Изменить
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger" as={Button}  onClick={removeSingleGroup}>
                                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Удалить
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
                <td>
                    <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
                        {group.id}
                    </Card.Link>
                </td>
                <td className="teacher_photo_td">
                    <span className="rounded-circle" style={bgStyle}></span>
                </td>
                <td>
                  <span className="fw-normal">
                    {group.name}
                  </span>
                </td>
                <td>
                    <OverlayTrigger trigger="click" placement="left" overlay={schedulePop} >
                        <Button className="py-0 px-1 bg-none"><FontAwesomeIcon icon={faGrip} className="text__orange me-0 p-0"/></Button>
                    </OverlayTrigger>
                </td>
                <td>
                  <span className={`fw-normal text-${statusVariant}`}>
                    {statusName}
                  </span>
                </td>

                <td>
                    <span className="fw-normal">{group.teacher?.name}</span>
                </td>

                <td>
                    <OverlayTrigger trigger="click" placement="left" overlay={coursesPop} >
                        <Button className="py-0 px-1 bg-none"><FontAwesomeIcon icon={faGrip} className="text-dark me-0 p-0"/></Button>
                    </OverlayTrigger>
                </td>
                <td>
                    <OverlayTrigger trigger="click" placement="left" overlay={studentPop} >
                        <Button className="py-0 px-1 bg-none"><FontAwesomeIcon icon={faGrip} className="text-dark me-0 p-0"/></Button>
                    </OverlayTrigger>
                </td>
                <td>
                    <OverlayTrigger trigger="click" placement="left" overlay={roomPop} >
                        <Button className="py-0 px-1 bg-none"><FontAwesomeIcon icon={faGrip} className="text-secondary me-0 p-0"/></Button>
                    </OverlayTrigger>
                </td>
                <td>
                    <span className="fw-normal">
                        {group.createdAt.substring(0, 10)}
                    </span>
                </td>
            </tr>

        );
    };

    return (
        <>
            <InnerTopBar />
            <Card border="light" className="table-wrapper table-responsive shadow-sm student__table-wrapper">
                <Card.Body className="pt-0 position-relative pb-6   ">
                    <Table hover className="user-table align-items-center">
                        <thead>
                        <tr>
                            {/*<th className="border-bottom"><FontAwesomeIcon icon={faU} className="icon-dark ml__5px" /></th>*/}
                            <th className="border-bottom">
                                <Button
                                    variant={"danger"}
                                    className="mt-0 mb-0 px-1 py-0"
                                    onClick={() => setStudentVisible(true)}
                                >
                                    <FontAwesomeIcon icon={faPlus} className="icon-dark" />
                                </Button>
                            </th>
                            <th className="border-bottom">ID</th>
                            <th className="border-bottom">Цвет</th>
                            <th className="border-bottom">Имя</th>
                            <th className="border-bottom">Расписание</th>
                            <th className="border-bottom">Статус</th>
                            <th className="border-bottom">Отв.Педагог</th>
                            <th className="border-bottom">Предметы</th>
                            <th className="border-bottom">Ученики</th>
                            <th className="border-bottom">Аудитории</th>
                            <th className="border-bottom">Начало.Обуч</th>
                        </tr>
                        </thead>
                        <tbody>
                        {center.groups?.map((t, i) => <GroupRow key={i} {...t} />)}
                        </tbody>
                    </Table>
                    <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between position-absolute bottom-0">
                        <Nav>
                            <Pagination className="mb-2 mb-lg-0">
                                <Pagination.Prev>
                                    Назад
                                </Pagination.Prev>
                                <Pagination.Item active>1</Pagination.Item>
                                <Pagination.Item>2</Pagination.Item>
                                <Pagination.Item>3</Pagination.Item>
                                <Pagination.Item>4</Pagination.Item>
                                <Pagination.Item>5</Pagination.Item>
                                <Pagination.Next>
                                    Вперед
                                </Pagination.Next>
                            </Pagination>
                        </Nav>
                        <small className="fw-bold">
                            Показано <b>{totalGroups}</b> из <b>{totalGroups}</b> строк
                        </small>
                    </Card.Footer>
                </Card.Body>
            </Card>
            <StudentModal show={studentVisible} onHide={() => setStudentVisible(false)}/>
        </>
    );
});

export default Groups;