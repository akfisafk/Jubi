import React from 'react'
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        color: 'black',
        backgroundColor: 'white',
        borderBottom: '1px solid #DF7620',
        padding: '0px 10px',
        height: '46px',
        margin: '0px 0px 20px 20px',
        width: '80%'
    }
})

const SignupInput = ({ name, handleChange, label, type }) => {
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

export default SignupInput