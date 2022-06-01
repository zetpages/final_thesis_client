import React from "react";
import InnerTopBar from "./components/InnerTopBar";
import FullCalendar, {formatDate} from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../components/event-utils'
import ruLocale from '@fullcalendar/core/locales/ru';
import axios from "axios";
import {Button, Form, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChalkboardUser, faUsers} from "@fortawesome/free-solid-svg-icons";


let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


class Courses extends React.Component {

    state = {
        data: [],
        weekendsVisible: true,
        currentEvents: [],
        nowEvents: [
            { title: "Event Now", start: new Date(), end: new Date(), teacher: 'Teacher'}
        ],
        showDefault:false,
        courseData:{}
    }
    
    // handleEventClick;
    componentDidMount() {
        this.getClasses();
    }

    getClasses = () => {
        axios
            .get("http://localhost:5000/api/regular-classes/")
            .then(res => {
                const tempData = [];
                res.data.map(el => {
                    el.single_classes.map(t => {
                        tempData.push(t)
                    })
                })
                console.log(res.data)
                const data = [
                    tempData.map(el => ({
                        id: el.id.toString(),
                        title: el.course.name,
                        start: el.dayDate+'T'+el.timeStart,
                        end: el.dayDate+'T'+el.timeEnd,
                        data: el
                    }))
                ];
                this.setState({data: data[0]});

            })
            .catch(error => {
                console.error(error);
            });
    };
    render() {
        return (
            <div className='demo-app'>
                <InnerTopBar/>
                {this.renderSidebar()}
                <div className='demo-app-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='timeGridWeek'
                        locale={ruLocale}
                        editable={true}
                        // selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        // events={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        events={this.state.data} // alternatively, use the `events` setting to fetch from a feed
                        // select={this.handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                        /* you can update a remote database when these fire:
                        eventAdd={function(){}}
                        eventChange={function(){}}
                        eventRemove={function(){}}
                        */
                    />
                </div>

                {
                    this.state.courseData!=null?
                        <Modal as={Modal.Dialog} centered show={this.state.showDefault} onHide={()=>this.setState({showDefault: false})}>
                            <Modal.Header>
                                <Modal.Title className="h6">
                                    <div className="d-flex justify-content-center align-items-center font__s-6">
                                        {this.state.courseData.courseTypeId === 1 ? <FontAwesomeIcon icon={faChalkboardUser} className="text-dark me-1" /> : <FontAwesomeIcon icon={faUsers} className="text-dark me-1" />}
                                        <span className="mx-2 font__s-3">{this.state.courseData.day}</span> <span className="ml-2 font__s-6">{this.state.courseData.dayDate}</span>
                                    </div>

                                </Modal.Title>
                                <Button variant="close" aria-label="Close" onClick={()=>this.setState({showDefault: false})} />
                            </Modal.Header>
                            <Modal.Body className="course_infos">
                                <div className="d-flex justify-content-between">
                                    <span>Тип:</span>
                                    <span>{this.state.courseData?.course_type?.name}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Время:</span>
                                    <span>{this.state.courseData?.timeStart}, {this.state.courseData?.durationLong}мин</span>
                                </div>


                                <div className="d-flex justify-content-between">
                                    <span>Предмет:</span>
                                    <span>{this.state.courseData?.course?.name}</span>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <span>Филиал:</span>
                                    <span>{this.state.courseData?.room?.branch?.name}</span>
                                </div>

                                <div className="d-flex justify-content-between ">
                                    <span>Аудитория:</span>
                                    <span>{this.state.courseData?.room?.name}</span>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <span>Адрес:</span>
                                    <span>{this.state.courseData?.room?.branch?.address}</span>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>

                                <Button variant="link" className="text-gray ms-auto" onClick={()=>this.setState({showDefault: false})}>
                                    Закрыть
                                </Button>
                            </Modal.Footer>
                        </Modal>:
                        <></>

                }
            </div>
        )
    }

    renderSidebar() {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    {/*<label>*/}
                    {/*    <input*/}
                    {/*        type='checkbox'*/}
                    {/*        checked={this.state.weekendsVisible}*/}
                    {/*        onChange={this.handleWeekendsToggle}*/}
                    {/*        className="me-2"*/}
                    {/*        />*/}
                    {/*    Без выходных*/}
                    {/*</label>*/}
                    <Form className="mb-2">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="С выходными"
                            checked={this.state.weekendsVisible}
                            onChange={this.handleWeekendsToggle}
                        >

                        </Form.Check>
                    </Form>
                </div>
                {/*<div className='demo-app-sidebar-section'>*/}
                {/*    <h2>All Events ({this.state.currentEvents.length})</h2>*/}
                {/*    <ul>*/}
                {/*        {this.state.currentEvents.map(renderSidebarEvent)}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        )
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }

    handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
        console.log(selectInfo)
    }

    handleEventClick = (info) => {
        this.setState({
            courseData:info.event.extendedProps.data,
            showDefault: true
        })
        console.log(info.event.extendedProps.data)
    }

    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        })
    }

}

function renderEventContent(eventInfo) {
    return (
        <>
            <div className="class__box bg-dark">
                <b>{eventInfo.timeText}</b>
            </div>
            {/*<b>{eventInfo.timeText}</b>*/}
            <br/>

            <i>{eventInfo.event.title}</i>
            <span>{eventInfo.event.teacher}</span>
        </>
    )
}

function renderSidebarEvent(event) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            <i>{event.title}</i>
            <span>{event.title}</span>
        </li>
    )
}

export default Courses;