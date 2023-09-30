import React, { useState, Fragment } from 'react'
import QuestionDialog from '../../components/Dialog'
import { useDispatch, useSelector } from 'react-redux';
import {SET_MENU} from "../../reducer/actions/setting";


const AboutDialog = ({ children }) => {
    const dispatch = useDispatch();
    const dialogOpen = useSelector((state) => state.customization.opened);
    const [isProcessing, setIsProcessing] = useState(false)

    const closeDialog = () => {
        dispatch({ type: SET_MENU, opened: !dialogOpen });
    }
    // console.log('I am CCCCCCCCC')
    return (
        <Fragment>
            {children}
            <QuestionDialog
                isOpen={dialogOpen}
                handleClose={closeDialog}
                isProcessing={isProcessing}
                title={'About us'}
                message={'Welcome to MIRAGE-mc project'}
            />
        </Fragment>
    )
}

export default AboutDialog