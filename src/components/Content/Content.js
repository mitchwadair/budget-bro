import React from 'react';

import './content.scss';

export default function Content({children}) {

    return (
        <div className={"bb-content"}>
            {children}
        </div>
    );
}