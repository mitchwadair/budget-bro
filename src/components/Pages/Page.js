import React, {useState} from 'react';
import './page.scss'

export default function Page({children}) {
    return (
        <div className={"bb-page"}>
            <div className={"bb-page-spacing"}/>
            {children}
            <div className={"bb-page-spacing"}/>
        </div>
    );
}