import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './createprofile.scss'
import fs from 'fs';
import path from 'path';
import {remote} from 'electron';
import axios from 'axios';

import { devLog } from '../../../utils';
import settings from '../../../settings';
import stateOptions from './states.json';
import {api_key} from '../../../api_key.json';

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
        'profile_name': 'default',
        'annual_income': 0,
        'hourly_wage': 0,
        'work_hours': 0,
        'additional_income': 0,
        'retirement_percent': 0,
        'hsa_cont': 0,
    });
    const [errorStatus, setErrorStatus] = useState({});

    const updateInputData = (data, key) => {
        setInputData({...inputData, [key]: data})
    }

    const goBack = () => {
        history.push("/");
    }

    const validateInput = () => {
        let newErrorStatus = {};
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
        }
        if (inputData.additional_income !== undefined) {
            if (isNaN(inputData.additional_income)) {
                newErrorStatus.additional_income = 'This field should be a number';
            }
        }
        if (inputData.retirement_percent !== undefined) {
            if (isNaN(inputData.retirement_percent)) {
                newErrorStatus.retirement_percent = 'This field should be a number';
            }
        }
        if (inputData.hsa_cont !== undefined) {
            if (isNaN(inputData.hsa_cont)) {
                newErrorStatus.hsa_cont = 'This field should be a number';
            }
        }

        return Object.keys(newErrorStatus).length === 0 ? null : newErrorStatus;
    }

    const createProfile = () => {
        const dataDir = path.join(remote.app.getAppPath(), "data");
        const newDirName = inputData.profile_name.toLowerCase().replace(new RegExp(' ', 'g'), '_');
        const profileDir = path.join(dataDir, newDirName);
        if (fs.existsSync(profileDir)) {
            devLog("profile directory already exists");
            setErrorStatus({'profile_create': "Profile with that name already exists, try something else"});
        } else {
            fs.mkdirSync(profileDir);
            let grossIncomeSalary = (inputData.income_type === 'salary' ? Number(inputData.annual_income) : (Number(inputData.hourly_wage) * Number(inputData.work_hours)) * 50);
            let grossIncome = inputData.additional_income !== undefined ? grossIncomeSalary + Number(inputData.additional_income) : grossIncomeSalary;
            grossIncome = inputData.retirement_percent !== undefined ? grossIncome - (grossIncomeSalary*(Number(inputData.retirement_percent)/100)): grossIncome;
            grossIncome = inputData.hsa_cont !== undefined ? grossIncome - Number(inputData.hsa_cont) : grossIncome;
            console.log(grossIncome);
            const headers = {
                'Authorization': api_key,
                'Content-Type': 'application/json',
            }
            const data = {
                'state': inputData.home_state,
                'filing_status': inputData.filing_status,
                'pay_rate': grossIncome
            }
            console.log(data);
            const year = new Date().getFullYear();
            axios.post(
                'https://taxee.io/api/v2/calculate/' + year,
                data,
                {headers: headers}
            ).then((response) => {
                console.log(response.data);
                const taxInfo = response.data.annual;
                const postTaxFunds = grossIncome - (taxInfo.fica.amount + taxInfo.federal.amount + taxInfo.state.amount);
                const postTaxFundsByMonth = postTaxFunds/12;
                const numberizedInputData = {};
                for (let key in inputData) {
                    numberizedInputData[key] = isNaN(inputData[key]) ? inputData[key] : Number(inputData[key]);
                }
                const profileData = {
                    ...numberizedInputData,
                    post_tax_funds: postTaxFunds,
                    post_tax_funds_monthly: postTaxFundsByMonth,
                }
                const filePath = path.join(profileDir, "profile_data.json");
                fs.writeFileSync(filePath, JSON.stringify(profileData, null, 4));
            }).catch((error) => {
                devLog(error);
            });
        }
    }

    const submit = () => {
        const inputErrors = validateInput();
        if (inputErrors === null) {
            createProfile();
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
        <TextInput label="Annual Income" onChange={updateInputData} defaultValue={0} id="annual_income"/>
        :
        <>
            <TextInput label="Hourly Wage" onChange={updateInputData} defaultValue={0} id="hourly_wage"/>
            <TextInput label="Expected Hours per Week" onChange={updateInputData} defaultValue={0} id="work_hours"/>
        </>;
    
    return (
        <Page>
            <Logo width={'100px'} height={'100px'}/>
            Create Profile
            <div className={`${prefix}-pc-form-container`}>
                <div className={`${prefix}-pc-input-container`}>
                    <TextInput label="Profile Name" defaultValue={"default"} onChange={updateInputData} id="profile_name"/>
                    <Dropdown label="Home State" options={stateOptions} onChange={updateInputData} id="home_state"/>
                    <Dropdown label="Tax Filing Status" options={filingStatusOptions} onChange={updateInputData} id="filing_status"/>
                    <Dropdown label="Income Type" options={incomeTypeOptions} onChange={updateInputData} id="income_type"/>
                </div>
                <div className={`${prefix}-pc-input-container`}>
                    {incomeInput}
                    <TextInput label="Expected Additional Income" defaultValue={0} onChange={updateInputData} id="additional_income"/>
                    <TextInput label="401k Contribution %" defaultValue={0} onChange={updateInputData} id="retirement_percent"/>
                    <TextInput label="HSA Contribution" defaultValue={0} onChange={updateInputData} id="hsa_cont"/>
                </div>
            </div>
            <div className={`${prefix}-pc-button-container`}>
                <Button onClick={goBack}>Go Back</Button>
                <Button onClick={submit}>Submit</Button>
            </div>
        </Page>
    );
}