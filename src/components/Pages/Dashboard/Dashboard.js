import React, {useState, useLayoutEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {remote} from 'electron';
import fs from 'fs';
import path from 'path';
import './dashboard.scss'

import { devLog } from '../../../utils';
import settings from '../../../settings';

import Page from '../Page';
import Logo from '../../Logo/Logo';
import Button from '../../Button/Button';

const {prefix} = settings;

export default function Dashboard(props) {
    const profileFolder = props.match.params.id;
    const history = useHistory();

    return (
        <Page>
            <Logo width={'100px'} height={'100px'}/>
            {profileFolder}
            <Button onClick={() => {history.push('/')}}>Go Back</Button>
        </Page>
    );
}