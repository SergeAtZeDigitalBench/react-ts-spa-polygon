import React from 'react'
import classes from './Badge.module.css'

interface IProps { caption: string | number }

const Badge = ({ caption }: IProps) => <span className={classes.badge}>{caption}</span>;

export default Badge