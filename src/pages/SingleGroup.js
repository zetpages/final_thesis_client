import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchOneGroup, fetchOneStudent} from "../http/boardAPI";
import {
    Button,
    ButtonGroup,
    Col,
    Dropdown,
    Image,
    OverlayTrigger,
    Popover,
    Row,
    Tab,
    Tabs
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBookmark,
    faBookOpen,
    faBoxOpen,
    faChalkboardUser,
    faChartBar,
    faClock,
    faCommentDots,
    faEllipsisVertical,
    faFileAlt,
    faGraduationCap,
    faIdCard,
    faLocationDot,
    faPencil,
    faPercent,
    faPlus,
    faRocket,
    faTableList,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {Card} from "@themesberg/react-bootstrap";


const SingleGroup = () => {
    const [group, setGroup] = useState({});
    const [key, setKey] = useState(0);
    const [innerKey, setInnerKey] = useState(0);
    const {id} = useParams();


    useEffect(() => {
        fetchOneGroup(id).then(data => setGroup(data));
    },[]);

    console.log(group)



    const studentWidget = group.regular_classes?.map ((el) => {
        let tmpArray;
        const sortedSingleClasses = el.single_classes.sort((a, b) => {
            return Date.parse(a.dayDate) - Date.parse(b.dayDate);
        });
        tmpArray = [...sortedSingleClasses];

        return tmpArray;
    })



    const statusName = group.groupStatusId === 1 ? "Обучается"
        : group.groupStatusId === 2 ? "Пауза" :  "Завершили";

    const statusVariant = statusName === "Обучается" ? "success"
        : statusName === "Пауза" ? "warning"
            : statusName === "Завершили" ? "danger" : "primary";

    const bgColor = ['red', 'green','blue'];

    const bgStyle = {
        background: group?.color,
        width: 29,
        height: 29
    }



    return (
        <>
            <Row>
                <Col xs={12} xl={4}>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Dropdown className="float-end">
                                        <Dropdown.Toggle as={Button} variant="secondary" className="text-dark me-2">
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                                            <Dropdown.Item>
                                                <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Document
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <FontAwesomeIcon icon={faCommentDots} className="me-2" /> Message
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Product
                                            </Dropdown.Item>

                                            <Dropdown.Divider />

                                            <Dropdown.Item>
                                                <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Абонемент
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <div className="d-flex align-items-start">
                                        <span className="rounded-circle" style={bgStyle}></span>
                                        <div className="w-100 ms-3">
                                            <h5 className="my-0">{group.name}</h5>
                                            <p className="text-muted mb-0">{group.createdAt}</p>
                                            <p className={`text-muted mb-0 text-${statusVariant}`}>{statusName}</p>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="d-flex justify-content-between custom__prop-line mt-2">
                                            <span className="text-nowrap">Отв. педагог</span>
                                            <h6>{group.teacher?.name}</h6>
                                        </div>
                                        <div className="d-flex justify-content-between custom__prop-line mt-2">
                                            <span className="text-nowrap">Лимит уч.</span>
                                            <h6>{group.limit}</h6>
                                        </div>
                                        <div className="d-flex justify-content-between custom__prop-line mt-2">
                                            <span className="text-nowrap">Уровень</span>
                                            <h6>{group.level?.name}</h6>
                                        </div>
                                        <div className="d-flex justify-content-between custom__prop-line mt-2">
                                            <span className="text-nowrap">Филиал</span>
                                            <h6>{group.branch?.name}</h6>
                                        </div>
                                        <div className="d-flex justify-content-between custom__prop-line mt-2">
                                            <span className="text-nowrap">Заметки</span>
                                            <h6>{group.note}</h6>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Card>
                                <Card.Body className="p-2">
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-between align-items-center mb-4 me-2">
                                            <h5 className="m-0">
                                                <FontAwesomeIcon icon={faTableList} className="text-danger mx-2" />
                                                Регулярные занятия
                                            </h5>
                                            <Dropdown as={ButtonGroup}>
                                                <Dropdown.Toggle split as={Button} variant="link" className="text-dark p-0">
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                                                    <Dropdown.Item>
                                                        <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Update
                                                    </Dropdown.Item>

                                                    <Dropdown.Divider />

                                                    <Dropdown.Item>
                                                        <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Subscription Plan
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>

                                        {group.regular_classes?.map((t ,j)  =>
                                            <Card key={t.id} className="mt-2 border-0">
                                                <Card.Body className="pt-2 pb-4 px-0">
                                                    {t.weekDays?.map((f, k) =>
                                                        <div className="d-flex justify-content-between custom__prop-line mt-2 px-2" key={k}>
                                                            <h6 className="text-nowrap">{f}</h6>
                                                            <div className="regular__class">
                                                                <p>
                                                                    <FontAwesomeIcon icon={faClock} className="me-2 " />
                                                                    {t.scheduleStart.substring(0,5)}-{t.scheduleEnd.substring(0,5)} / {t.room?.name}
                                                                </p>
                                                                <p>
                                                                    <FontAwesomeIcon icon={faBookOpen} className="me-2 " />
                                                                    {t.room?.name} / {group.level?.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        )}
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12} xl={8}>
                    <Row className="mt-0 mb-2">
                        <Col>
                            <Card>
                                <Card.Body className="p-2 pb-4 attendance">
                                    <div className="d-flex justify-content-between align-items-center mb-2 mt-3 me-2">
                                        <h5 className="m-0">
                                            <FontAwesomeIcon icon={faChartBar} className="text-danger me-2" />
                                            Виджет занятий
                                        </h5>
                                        <Dropdown as={ButtonGroup}>
                                            <Dropdown.Toggle split as={Button} variant="link" className="text-dark p-0">
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                                                <Dropdown.Item>
                                                    <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Update
                                                </Dropdown.Item>

                                                <Dropdown.Divider />

                                                <Dropdown.Item>
                                                    <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Subscription Plan
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="custom__prop-line2"/>
                                    <div className="tabs__parent mt-2 mb-2">
                                        <div className="tabs__child pt-1">
                                            <Tabs
                                                activeKey={innerKey}
                                                onSelect={(c) => setInnerKey(c)}
                                                className="mb-2"
                                            >
                                                {group.regular_classes?.map((t, j) =>
                                                    <Tab eventKey={j} title={t.name} key={t.id}>
                                                        {t.single_classes?.map((s) =>
                                                            <OverlayTrigger
                                                                key={s.id}
                                                                trigger="click"
                                                                placement="auto"
                                                                shouldUpdatePosition={true}
                                                                overlay={(
                                                                    <Popover id="popover-basic">
                                                                        <Popover.Header as="h3">
                                                                            <div className="d-flex justify-content-between">
                                                                                <span className="me-2">{s.course_type?.name}</span>
                                                                                <span>{s?.classState}</span>
                                                                            </div>
                                                                        </Popover.Header>
                                                                        <Popover.Body>
                                                                            <div className="d-flex justify-content-between">
                                                                                <span>Тип:</span>
                                                                                <span>{s?.course_type?.name}</span>
                                                                            </div>
                                                                            <div className="d-flex justify-content-between">
                                                                                <span>Время:</span>
                                                                                <span>{s?.timeStart}, {s?.durationLong}мин</span>
                                                                            </div>
                                                                            <div className="d-flex justify-content-between">
                                                                                <span>Филиал:</span>
                                                                                <span className="text-end">{group.branch?.name}, <br/> {s?.room?.name}</span>
                                                                            </div>
                                                                            <div className="d-flex justify-content-between">
                                                                                <span>Педагог:</span>
                                                                                <span>{group.teacher?.name}</span>
                                                                            </div>
                                                                            <div className="d-flex justify-content-between custom__prop-line">
                                                                                <span>Предмет:</span>
                                                                                <span>{s?.course?.name}</span>
                                                                            </div>

                                                                        </Popover.Body>
                                                                    </Popover>
                                                                )} >
                                                                <div className={`bg-${s.classState === 'запланирован' ? 'light' : 'done'} cursor-pointer  d-flex m-1 flex-column text-center px-2 py-2 bg-light rounded-1 border border-1 border-light`} key={s.id}>
                                                                    <div className="d-flex justify-content-center align-items-center font__s-6">
                                                                        {s.courseTypeId === 1 ? <FontAwesomeIcon icon={faChalkboardUser} className="text-dark me-1" /> : <FontAwesomeIcon icon={faUsers} className="text-dark me-1" />}
                                                                        <span className="font__s-6">{s.day}</span>
                                                                    </div>
                                                                    <span className="font__s-6">{s.dayDate}</span>
                                                                </div>
                                                            </OverlayTrigger>
                                                        )}
                                                    </Tab>
                                                )}
                                            </Tabs>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default SingleGroup;