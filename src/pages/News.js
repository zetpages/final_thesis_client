import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import InnerTopBar from "./components/InnerTopBar";
const news = [
    {
        "title":"Newmarket Nights",
        "details":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "month": "Май",
        "day":20,
        "author":"Meerbek Akimzhanov"
    },
    {
        "title":"Page when looking at its layout",
        "details":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
        "month": "Май",
        "day":15,
        "author":"Meerbek Akimzhanov"
    },
    {
        "title":"Reader will be distracted",
        "details":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
        "month": "Апр",
        "day":24,
        "author":"Meerbek Akimzhanov"
    },
    {
        "title":"Newmarket Nights",
        "details":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
        "month": "Апр",
        "day":3,
        "author":"Meerbek Akimzhanov"
    }
]

const SingleNews = (props) => {
    const {singleNews} = props
    return (
        <div className="align-items-center d-block d-sm-flex border-bottom pb-4 mb-4 row">
            <div className="mb-3 mb-sm-0 col-auto">
                <div className="calendar d-flex"><span className="calendar-month">{singleNews.month}</span><span className="calendar-day py-2">{singleNews.day}</span></div>
            </div>
            <div className="col">
                <a className="mb-1 card-link" href="#/calendar">
                    <h5 className="mb-1">{singleNews.title}</h5>
                </a>
                <div className="fw-bold">{singleNews.details}</div>
                <span  className="small">Author: <a className="card-link" href="#">{singleNews.author}</a></span>

            </div>
        </div>
    )
}

export default () => {
  return (
    <>
      <InnerTopBar />
        <div className="shadow card border-0">
            <div className="border-bottom card-header">
                <h2 className="fs-5 fw-bold mb-1">Новости</h2>
            </div>
            <div className="card-body">
                {news.map(singleNews=>{
                    return <SingleNews singleNews={singleNews} />
                })}
            </div>

        </div>

    </>
  );
};