import React, { useState } from 'react';
import './index.css';

function NewMusicPage() {
    const [active, setActive] = useState(0);

    const currentMonth = new Date().getMonth() + 1;

    const tabs = [
        {
            key: 'v_pop',
            values: `V-Pop tháng ${currentMonth}`,
        },
        {
            key: 'us_uk',
            values: `US-UK tháng ${currentMonth}`,
        },
        {
            key: 'k_pop',
            values: `K-Pop tháng ${currentMonth}`,
        },
        {
            key: 'c_pop',
            values: `C-Pop tháng ${currentMonth}`,
        },
        {
            key: 'c_pop',
            values: `C-Pop tháng ${currentMonth}`,
        },
        {
            key: 'c_pop',
            values: `C-Pop tháng ${currentMonth}`,
        },
        {
            key: 'c_pop',
            values: `C-Pop tháng ${currentMonth}`,
        },
        {
            key: 'c_pop',
            values: `C-Pop tháng ${currentMonth}`,
        },
    ];

    //functions
    const callApiGet = (item, index) => {
        setActive(index);
    };

    return (
        <div className='component-general'>
            <div className='tabs-new_music'>
                {tabs.map((item, index) => (
                    <div
                        className='tab-music'
                        key={index}
                        style={{
                            backgroundColor: active === index && "red"
                        }}
                        onClick={() => callApiGet(item, index)}
                    >
                        {item?.values}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default NewMusicPage;