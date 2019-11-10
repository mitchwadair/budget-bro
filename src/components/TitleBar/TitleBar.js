import React from 'react';
import './titlebar.scss';

import {remote} from 'electron'

import TitleBarButton from './TitleBarButton/TitleBarButton';

import closeIcon from '../../assets/icons/close.svg';
import minimizeIcon from '../../assets/icons/minimize.svg';

export default function TitleBar() {
    const close = () => {
        remote.getCurrentWindow().close();
    }

    const minimize = () => {
        remote.getCurrentWindow().minimize();
    }

    return (
        <div id='titlebar' className={"bb-title-bar"}>
            <div className={"bb-title-bar-title"}>Budget Bro</div>
            <div className={"bb-title-bar-buttons"}>
                <TitleBarButton func={minimize} icon={minimizeIcon}/>
                <TitleBarButton func={close} icon={closeIcon}/>
            </div>
        </div>
    );
}