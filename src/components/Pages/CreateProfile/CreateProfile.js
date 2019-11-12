import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './createprofile.scss'

import { devLog } from '../../../utils';
import settings from '../../../settings';
import stateOptions from './states.json';

import Page from '../Page';
import Logo from '../../Logo/Logo';
import Button from '../../Button/Button';
import TextInput from '../../TextInput/TextInput';
import Dropdown from '../../Dropdown/Dropdown';

const {prefix} = settings;

export default function CreateProfile(props) {
    const history = useHistory();
    const [inputData, setInputData] = useState({
        'income_type': 'salary',
        'home_state': 'AL',
        'filing_status': 'single',
    });
    const [errorStatus, setErrorStatus] = useState({});

    const updateErrorStatus = (message, key) => {
        setErrorStatus({...errorStatus, [key]: message});
    }

    const updateInputData = (data, key) => {
        setInputData({...inputData, [key]: data})
    }

    const goBack = () => {
        history.push("/");
    }

    const validateInput = () => {
        let newErrorStatus = {}
        if (inputData.profile_name === undefined) {
            newErrorStatus.profile_name = 'This field must be filled out';
        }
        if (inputData.income_type === "salary") {
            if (inputData.annual_income !== undefined) {
                if (isNaN(inputData.annual_income)) {
                    newErrorStatus.annual_income = 'This field should be a number';
                }
            } else {
                newErrorStatus.annual_income = 'This field must be filled out';
            }
        } else {
            if (inputData.hourly_wage !== undefined) {
                if (isNaN(inputData.hourly_wage)) {
                    newErrorStatus.hourly_wage = 'This field should be a number';
                }
            } else {
                newErrorStatus.hourly_wage = 'This field must be filled out';
            }
            if (inputData.work_hours !== undefined) {
                if (isNaN(inputData.work_hours)) {
                    newErrorStatus.work_hours = 'This field should be a number';
                }
            } else {
                newErrorStatus.work_hours = 'This field must be filled out';
            }
        };
        return newErrorStatus === {} ? null : newErrorStatus;
    }

    const submit = () => {
        const inputErrors = validateInput();
        if (inputErrors === null) {
            //TODO: do things
        } else {
            devLog(inputErrors);
            setErrorStatus(inputErrors);
        }
    }

    const incomeTypeOptions = [
        {value: "salary", label: "Annual Salary"},
        {value: "hourly", label: "Hourly Wage"},
    ];

    const filingStatusOptions = [
        {value: "single", label: "Single"},
        {value: "married", label: "Married"},
        {value: "married separately", label: "Married Separately"},
        {value: "head of household", label: "Head of Household"},
    ];

    const incomeInput = inputData.income_type === "salary" ? 
        <TextInput label="Annual Income" callback={updateInputData} id="annual_income"/>
        :
        <>
            <TextInput label="Hourly Wage" callback={updateInputData} id="hourly_wage"/>
            <TextInput label="Expected Hours per Week" callback={updateInputData} id="work_hours"/>
        </>;
    
    return (
        <Page>
            <Logo width={'100px'} height={'100px'}/>
            Create Profile
            <div className={`${prefix}-pc-form-container`}>
                <div className={`${prefix}-pc-input-container`}>
                    <TextInput label="Profile Name" callback={updateInputData} id="profile_name"/>
                    <Dropdown label="Home State" options={stateOptions} callback={updateInputData} id="home_state"/>
                    <Dropdown label="Tax Filing Status" options={filingStatusOptions} callback={updateInputData} id="filing_status"/>
                </div>
                <div className={`${prefix}-pc-input-container`}>
                    <Dropdown label="Income Type" options={incomeTypeOptions} callback={updateInputData} id="income_type"/>
                    {incomeInput}
                    <TextInput label="Expected Additional Income" callback={updateInputData} id="additional_income"/>
                </div>
            </div>
            <div className={`${prefix}-pc-button-container`}>
                <Button onClick={goBack}>Go Back</Button>
                <Button onClick={submit}>Submit</Button>
            </div>
        </Page>
    );
}