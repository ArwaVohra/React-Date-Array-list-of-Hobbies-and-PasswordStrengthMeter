import { red } from '@mui/material/colors';
import React from 'react';
import zxcvbn from 'zxcvbn';
const PasswordStrengthMeter = ({ password }) => {
    const testResult = zxcvbn(password);
    const num = testResult.score * 100 / 4;

    const funcProgressColor = () => {
        switch (testResult.score) {
            case 0:
                return '#828282';
            case 1:
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9bc158';
            case 4:
                return '#00b500';
            default:
                return 'none';

        }
    }

    const createPasswordLabel = () => {
        switch (testResult.score) {
            case 0:
                return 'very week';
            case 1:
                return 'Week';
            case 2:
                return 'Fear';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return '';

        }
    }

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(),
        height: '5px'
    })

    return (
        <div>
            <div className='progress' style={{ height: '5px' }} >
                <div className='progress-bar' style={changePasswordColor()} ></div>
            </div>
            <p style={{color: funcProgressColor() , textAlign:'right'}} >{createPasswordLabel()}</p>
        </div>
    )
}

export default PasswordStrengthMeter;