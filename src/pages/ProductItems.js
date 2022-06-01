import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from 'react-bootstrap';


export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Oku</Breadcrumb.Item>
            <Breadcrumb.Item active>Товары</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
        </div>
      </div>
    </>
  );
};