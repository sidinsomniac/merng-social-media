import { gql, useMutation } from "@apollo/react-hooks";
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import "../App.css";
import { useForm } from "../utils/hooks";

function Login({ history }) {

    const initialState = {
        username: '',
        password: ''
    };

    const LOGIN_USER = gql`
        mutation login(
            $username: String!
            $password: String!
        ) {
            login(
                    username: $username
                    password: $password
            ) {
                id
                email
                username
                createdAt
                token
            }
        }
    `;

    const { values, onChange, onSubmit } = useForm(loginUser, initialState);

    const [login, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            console.log(result.data);
            history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function loginUser() {
        login();
    };

    const [errors, setErrors] = useState({});


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input type="text" label="Username" onChange={onChange} placeholder="Username" error={errors.username} name="username" value={values.username} />
                <Form.Input type="password" label="Password" onChange={onChange} placeholder="Password" error={errors.password} name="password" value={values.password} />
                <Button type="submit" primary>Login</Button>
            </Form>
            {
                Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map(error => <li key={error}>{error}</li>)}
                        </ul>
                    </div>
                )
            }
        </div>
    );
}

export default Login;
