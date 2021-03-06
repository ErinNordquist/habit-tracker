import {TextField, Button} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router-dom";
import AuthActions from "../actions/AuthActions";
import '../css/App.css';

function LoginForm(props) {
    let history = useHistory();
    // useEffect(() =>{
    if (AuthActions.getCurrentUser() !== null) {
        history.push("/home");
    };
    // });
    const { handleSubmit, control, formState: { errors}, setError} = useForm();

    //console.log(props);
    const onSubmit= (data) => {
        axios.post(`http://localhost:5000/auth/login`, data).then((response) => {
            if (response.data.hasOwnProperty('error')){
                setError("username",{type:"validate",message:response.data.error})
            } else {
                //console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                //console.log('in local storage:')
               // console.log(localStorage.getItem('user'));
                props.logInUser();
                history.push("/home");
            }
        }).catch((error) => {
            console.log(error);
            //history.push('/');

        });
    }
    return (
        <div class="User-form-div">
            <h1>Login</h1>
            <form  onSubmit={e => e.preventDefault()}>
                <ul class="Form-element"><Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({ field }) => <TextField label="Username" value={field.value} inputRef={field.ref} onChange={field.onChange} />}
                /></ul>
                <ul class="Form-element"><Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({ field }) => <TextField label="Password" type="password" value={field.value} inputRef={field.ref} onChange={field.onChange} />}
                /></ul>
                {errors.username && <div>{errors.username.message}</div>}
                <ul class="Form-element"><Button type="submit" value="submit" onClick={handleSubmit(onSubmit)}>Submit</Button></ul>
            </form>
        </div>
    );
}
export default LoginForm;