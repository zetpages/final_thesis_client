import React from "react";
import InnerTopBar from "./components/InnerTopBar";
import FullCalendar, {formatDate} from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../components/event-utils'
import ruLocale from '@fullcalendar/core/locales/ru';
import axios from "axios";
import {Form} from "react-bootstrap";


let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


class Courses extends React.Component {

    state = {
        data: [],
        weekendsVisible: true,
        currentEvents: [],
        nowEvents: [
            { title: "Event Now", start: new Date(), end: new Date(), teacher: 'Teacher'}
        ]
    }
    
    handleEventClick;
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
                const data = [
                    tempData.map(el => ({
                        id: el.id.toString(),
                        title: el.course.name,
                        start: el.dayDate+'T'+el.timeStart,
                        end: el.dayDate+'T'+el.timeEnd
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
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        // events={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        events={this.state.data} // alternatively, use the `events` setting to fetch from a feed
                        select={this.handleDateSelect}
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

    // handleEventClick = (clickInfo) => {
    //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //     clickInfo.event.remove()
    //   }
    // }

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