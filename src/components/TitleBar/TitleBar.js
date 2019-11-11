import React,  {useState} from 'react';
import settings from '../../settings';
import './titlebar.scss';

import {remote} from 'electron'

import TitleBarButton from './TitleBarButton/TitleBarButton';
import TitleBarIcon from './TitleBarIcon/TitleBarIcon';

import closeIcon from '../../assets/icons/close.svg';
import minimizeIcon from '../../assets/icons/minimize.svg';
import themeDarkIcon from '../../assets/icons/theme-dark.svg';
import themeLightIcon from '../../assets/icons/theme-light.svg'
import iconIcon from '../../assets/icons/money.svg'

const {prefix} = settings;

export default function TitleBar({themeChange, theme}) {
    const [themeIcon, setThemeIcon] = useState(themeDarkIcon)

    const close = () => {
        remote.getCurrentWindow().close();
    }

    const minimize = () => {
        remote.getCurrentWindow().minimize();
    }

    const changeTheme = () => {
        themeChange();
        setThemeIcon(themeIcon === themeDarkIcon ? themeLightIcon : themeDarkIcon);
    }

    return (
        <div id='titlebar' className={`${prefix}-title-bar`}>
            <div className={`${prefix}-title-bar-icon-container`}>
                <TitleBarIcon icon={iconIcon}/>
            </div>
            <div className={`${prefix}-title-bar-title`}>Budget Bro</div>
            <div className={`${prefix}-title-bar-buttons-container`}>
                <div className={`${prefix}-title-bar-buttons`}>
                    <TitleBarButton func={changeTheme} icon={themeIcon}/>
                    <TitleBarButton func={minimize} icon={minimizeIcon}/>
                    <TitleBarButton func={close} icon={closeIcon}/>
                </div>
            </div>
        </div>
    );
}