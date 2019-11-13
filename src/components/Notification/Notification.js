import React, {useState, useEffect} from 'react';
import settings from '../../settings';

import './notification.scss';

const {prefix} = settings;

export default function Notification({type="generic", closable=true, isVisible=true, children}) {
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    const closeSelf = () => {
        setVisible(false);
    }

    return (
        <div className={`${prefix}-notification-container ${type} ${(visible ? "visible" : "")}`}>
            <div className={`${prefix}-notification-icon-container`}>
                <div className={`${prefix}-notification-icon`}/>
            </div>
            <div className={`${prefix}-notification-content`}>
                {children}
            </div>
            <div className={`${prefix}-notification-close${(closable ? " closable" : "")}`} onClick={closeSelf}/>
        </div>
    );
}