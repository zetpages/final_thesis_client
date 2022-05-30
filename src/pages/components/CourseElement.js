import React, {useContext} from 'react';
import {CenterContext} from "../../App";
import {Button, ButtonGroup, Card, Dropdown, OverlayTrigger, Popover, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Routes} from "../../routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEllipsisH, faTrashAlt, faPlus, faGrip} from "@fortawesome/free-solid-svg-icons";

const CourseElement = () => {

    const {center} = useContext(CenterContext);

    const CourseRow = (course) => {

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
                            <Dropdown.Item className="text-danger">
                                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Удалить
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
                <td>
                    <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
                        {course.id}
                    </Card.Link>
                </td>
                <td>
                  <span className="fw-normal">
                    {course.name}
                  </span>
                </td>
                <td>
                  <span className="fw-normal">
                    {course.course_type?.name}
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
                                    // variant={"outline-dark"}
                                    className="mt-0 mb-0 px-1 py-0"
                                >
                                    <FontAwesomeIcon icon={faPlus} className="icon-dark" />
                                </Button>
                            </th>
                            <th className="border-bottom">ID</th>
                            <th className="border-bottom">Название</th>
                            <th className="border-bottom">Тип урока</th>
                        </tr>
                        </thead>
                        <tbody>
                        {center.courses?.map(t => <CourseRow key={t.id} {...t} />)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
};

export default CourseElement;