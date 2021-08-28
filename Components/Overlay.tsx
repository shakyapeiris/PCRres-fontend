import React, { ReactElement } from 'react'
import classes from '../styles/Overlay.module.css'

function Overlay(props: {children: ReactElement}) {
    return (
        <div className={classes.BackGround}>
            <div className={classes.Container}>
                {props.children}
            </div>
        </div>
    )
}

export default Overlay
