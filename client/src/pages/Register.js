import { gql, useMutation } from "@apollo/react-hooks";
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import "../App.css";
import { useForm } from "../utils/hooks";

function Register({ history }) {

    const initalState = {
        username: "",
        password: "",
        email: "",
        confirmPassword: ""
    };

    const { values, onChange, onSubmit } = useForm(registerUser, initalState);

    const [errors, setErrors] = useState({});

    const REGISTER_USER = gql`
        mutation register(
            $username: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
        ) {
            register(
                registerInput: {
                    username: $username
                    email: $email
                    password: $password
                    confirmPassword: $confirmPassword
                }
                
            ) {
                id
                email
                username
                createdAt
                token
            }
        }
    `;

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update() {
            history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input type="text" label="Username" onChange={onChange} placeholder="Username" error={errors.username} name="username" value={values.username} />
                <Form.Input type="text" label="Email" onChange={onChange} placeholder="Email" error={errors.email} name="email" value={values.email} />
                <Form.Input type="password" label="Password" onChange={onChange} placeholder="Password" error={errors.password} name="password" value={values.password} />
                <Form.Input type="password" label="Confirm Password" onChange={onChange} placeholder="Confirm Password" error={errors.confirmPassword} name="confirmPassword" value={values.confirmPassword} />
                <Button type="submit" primary>Register</Button>
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

export default Register;
