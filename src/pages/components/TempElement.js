import React, {useContext} from 'react';
import {CenterContext} from "../../App";

const TempElement = () => {

    const {center} = useContext(CenterContext);
    return (
        <div>
            {
                center.rooms?.map((el) =>
                    <div key={el.id}>{el.id}</div>
                )
            }
        </div>
    );
};

export default TempElement;