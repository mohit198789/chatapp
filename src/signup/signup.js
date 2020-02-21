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
class SignupComponent extends Component
{
constructor(){
    super();
    this.state={
        email:null,
        password:null,
        passwordConfirmation:null,
        signupError:''
    };
}
    render(){
        //destructuring the style.js class in classes variable
        const {classes}=this.props;
        return(
        <main className={classes.main}>
            <CssBaseLine></CssBaseLine>
                <Paper className={classes.Paper}>
                    <Typography align="center" component='h1' variant='h5'>
                        Sign Up!
                    </Typography>
                    <form onSubmit={(e)=>this.submitSignup(e)} className={classes.form}>
                        <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='signup-email-input'>Enter Your Mail</InputLabel>
                        <Input autoComplete='email' onChange={(e)=>this.userTyping('email',e)} autoFocus id='signup-email-input'></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='signup-password-input'>Enter Your Password</InputLabel>
                        <Input type='password' onChange={(e)=>this.userTyping('password',e)} autoFocus id='signup-password-input'></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='signup-password-verification-input'>Enter Confirm Password</InputLabel>
                        <Input type='password' onChange={(e)=>this.userTyping('passwordConfirmation',e)} autoFocus id='signup-password-verification-input'></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
                        <Typography component='h5' variant='h6' className={classes.hasAccountHeader}>Alredy Having a account?  <Link className={classes.logInLink} to='./login'>Log In!</Link></Typography>
                       
                    </form>
                    {this.state.signupError?
                <Typography component='h5' variant='h6' className={classes.errorText}>
                    {this.state.signupError}
                </Typography>    
                :
                null
                }
                </Paper>
</main>
        );
    }
    isFormvalid=()=>this.state.password===this.state.passwordConfirmation;
    userTyping=(type,e)=>{
switch (type) {
    case 'email':
        this.setState({
            email: e.target.value
        })
        break;
        case 'password':
            this.setState({
                password: e.target.value
            })
            break;
            case 'passwordConfirmation':
                this.setState({
                    passwordConfirmation: e.target.value
                })
                break;
        
    default:
        break;
}
    }
    submitSignup=(e)=>{
        e.preventDefault();
        if(!this.isFormvalid())
        {
            this.setState({ signupError:'Password mismatched'});
        }
        //sending data to firebase database
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(authRes=>{
            const userObj={
                email:authRes.user.email
            };
            firebase
            .firestore()
            .collection('users')
            .doc(this.state.email)
            .set(userObj)
            .then(()=>{
                this.props.history.push('/dashboard')
            },
            dbError=>{
                    console.log(dbError);
                    this.setState({signupError:'Failed To Add User'});
            },
            dbError=>{
                console.log(dbError);
                this.setState({signupError:'Failed To Add User'});
        })
        },
        authError=>{
            console.log(authError);
            this.setState({signupError:'Failed To Add User'});
    })
    }
}

//using withStyle material ui as property for each component
export default withStyles(style)(SignupComponent);