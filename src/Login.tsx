import React, {ChangeEvent, useState} from "react";
import {Button, Container, Grid, Paper, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {authorizeTC} from "./reducer";

type OwnPropsType = {
    authorizeTC: (email: string, password: string)=>void
}

const Login = (props: OwnPropsType) => {

    const [email, setEmail] = useState<string>('free@samuraijs.com');
    const [password, setPassword] = useState<string>('free');



    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    };
    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    };
    const send = () =>{
        props.authorizeTC(email,password)
    };

    return (


        <Container fixed maxWidth={"sm"} style={{height: '100vh'}}>
            <Grid container justify='center' alignItems='center' style={{width: '100%', height: '100vh'}}>

                <Paper elevation={5}
                       style={{
                           padding: '50px',
                           minWidth: '200px',
                           maxWidth: '240px'
                       }}>
                    <h3>Login</h3>
                    <TextField placeholder='email' value={email} onChange={changeEmail}/>
                    <TextField placeholder='password' value={password} onChange={changePassword} style={{padding: '10px 0px'}}/>
                    <Button variant='contained' color='primary' onClick={send}>Send</Button>

                </Paper>

            </Grid>
        </Container>


    )

}

export default connect(null, {authorizeTC})(Login)