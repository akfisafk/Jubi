import React from 'react'
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        color: 'black',
        backgroundColor: 'white',
        height: '46px',
        margin: '0 0 20px 0'
    }
})

const FormInput = ({ name, handleChange, label, type }) => {
    const classes = useStyles();
    return (
        <Input className={classes.root}
            disableUnderline={true}
            name={name}
            onChange={handleChange}
            required
            fullWidth
            label={label}
            type={type}
            placeholder={label}
        />
    )
}

export default FormInput
