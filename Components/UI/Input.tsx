import React from 'react'
import { InputInterface } from '../../Types/interfaces'

import classes from './Input.module.css'

const Input = (props: InputInterface) => {
    return (
        <input className={classes.Input} style={props.styles} placeholder={props.placeholder} value={props.value} onChange={props.onChange} onBlur={props.onBlur} type={props.type} />
    )
}

export default Input
