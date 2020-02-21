import React, {Component} from "react";
import {Link} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseLine from '@material-ui/core/CssBaseLine';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import style from './style';
import firebase from 'firebase/app';
class LoginComponent extends Component
{
    constructor()
    {
        super();
        this.state={
            email:null,
            password:null,
            loginError:''
        }
    }
    render()
    {
        const {classes}=this.props;
        return(
<main className={classes.main}>
    <CssBaseLine></CssBaseLine>
    <Paper className={classes.Paper}>
        <Typography align="center" component='h1' variant='h5'> Log In !</Typography>
        <form onSubmit={(e)=>this.submitLogin(e)} className={classes.form}>
                        <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='login-email-input'>Enter Your Mail</InputLabel>
                        <Input autoComplete='email' onChange={(e)=>this.userTyping('email',e)} autoFocus id='login-email-input'></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='login-password-input'>Enter Your Password</InputLabel>
                        <Input type='password' onChange={(e)=>this.userTyping('password',e)} autoFocus id='login-password-input'></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Log In</Button>
                    </form>
                    {this.state.loginError?
                <Typography component='h5' variant='h6' className={classes.errorText}>
                    Incorrect Login Information
                </Typography>    
                :
                null
                }
                    <Typography align="center" component='h5' variant='h6' className={classes.noAccountHeader}>Dont have a account?  <Link className={classes.signUpLink} to='./signup'>Sign Up</Link></Typography>
    </Paper>
</main>
        );
    }
    submitLogin=(e)=>{
        e.preventDefault();
firebase
.auth()
.signInWithEmailAndPassword(this.state.email,this.state.password)
.then(()=>{
this.props.history.push('/dashboard');
},
err=>{
    this.setState({loginError:'Server Error'});
});
    }
    userTyping=(type,e)=>{
        switch (type) {
            case 'email':
                this.setState({email:e.target.value});
                break;
                case 'password':
                    this.setState({password:e.target.value});
                    break;
            default:
                break;
        }
    }
}

export default withStyles(style)(LoginComponent);