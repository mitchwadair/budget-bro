import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import settings from '../../settings';

import './dropdown.scss';
import { devLog } from '../../utils';

const {prefix} = settings;

export default function Dropdown({options, label, callback, id}) {
    const [selected, setSelected] = useState(options[0]);
    const [menuVisible, setMenuVisible] = useState(false);
    const node = useRef();

    useEffect(() => {
        //componentDidMount:
        document.addEventListener('mousedown', handleClick);

        //componentWillUnmount:
        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    });

    const toggleMenu = ()  => {
        setMenuVisible(!menuVisible);
    }

    const changeSelected = (selected) => {
        setSelected(selected);
        callback(selected.value, id);
    }

    const handleClick = (event) => {
        if (!node.current.contains(event.target)) {
            setMenuVisible(false);
        }
    }
    
    const optionElements = options.map((option, i) => {
        return <div className={`${prefix}-dropdown-option`} key={i} value={option.value} onClick={() => {changeSelected(option)}}>{option.label}</div>
    })
    
    return (
        <div className={`${prefix}-dropdown-container`}>
            <div className={`${prefix}-dropdown-label`}>{label}</div>
            <div ref={node} className={`${prefix}-dropdown-select`} onClick={toggleMenu}>
                <div className={`${prefix}-dropdown-selected-container`}>
                    <div className={`${prefix}-dropdown-selected`}>{selected.label}</div>
                    <div className={`${prefix}-dropdown-chevron`}/>
                </div>
                <div className={`${prefix}-dropdown-menu${menuVisible ? '-active' : ''}`}>
                    {optionElements}
                </div>
            </div>
        </div>
    );
}