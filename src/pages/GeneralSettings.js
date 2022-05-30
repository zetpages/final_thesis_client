import React from "react";
import { Col, Row, Nav, Tab } from 'react-bootstrap';
import InnerTopBar from "./components/InnerTopBar";
import BranchElement from "./components/BranchElement";
import RoomElement from "./components/RoomElement";
import BillingElement from "./components/BillingElement";
import SubscriptionElement from "./components/SubscriptionElement";
import DiscountTypeElement from "./components/DiscountTypeElement";
import DiscountElement from "./components/DiscountElement";
import CourseTypeElement from "./components/CourseTypeElement";
import CourseElement from "./components/CourseElement";
import LevelElement from "./components/LevelElement";
import GroupStatusElement from "./components/GroupStatusElement";
import StudentStatusElement from "./components/StudentStatusElement";


export default () => {

  return (
    <>
    <InnerTopBar/>
      <Tab.Container id="left-tabs-example" defaultActiveKey="branch">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column no-right_p">
              <Nav.Item>
                <Nav.Link eventKey="branch">Филлиалы</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="room">Аудитории</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="billing">Счета</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="subs">Абонементы</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="discount">Скидки</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disType">Типы скидок</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="course">Курсы</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="courseType">Типы занятий</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="levels">Уровни</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="groupStatus">Статусы групп</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="studentStatus">Статусы учеников</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="branch">
                <div>
                  <BranchElement/>
                 </div>
              </Tab.Pane>
              <Tab.Pane eventKey="room">
                <RoomElement />
              </Tab.Pane>
              <Tab.Pane eventKey="billing">
                <BillingElement />
              </Tab.Pane>
              <Tab.Pane eventKey="subs">
                <SubscriptionElement />
              </Tab.Pane>
              <Tab.Pane eventKey="discount">
                <DiscountElement />
              </Tab.Pane>
              <Tab.Pane eventKey="disType">
                <DiscountTypeElement />
              </Tab.Pane>
              <Tab.Pane eventKey="course">
                <CourseElement />
              </Tab.Pane>
              <Tab.Pane eventKey="courseType">
                <CourseTypeElement />
              </Tab.Pane>
              <Tab.Pane eventKey="levels">
                <LevelElement />
              </Tab.Pane>
              <Tab.Pane eventKey="groupStatus">
                <GroupStatusElement />
              </Tab.Pane>
              <Tab.Pane eventKey="studentStatus">
                <StudentStatusElement />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};