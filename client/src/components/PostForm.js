import { gql, useMutation } from "@apollo/react-hooks";
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from "../utils/graphql";

import { useForm } from '../utils/hooks';

function PostForm() {

    const createPostCallback = () => {
        createPost();
    };

    const { onSubmit, onChange, values } = useForm(createPostCallback, {
        body: ''
    });
    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: values,
        update: (store, result) => {
            const data = store.readQuery({
                query: FETCH_POSTS_QUERY
            });
            store.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    ...data,
                    fetchPosts: [...data.fetchPosts, result.data.createPost]
                }
            });
            console.log({ store, data, result });
            values.body = '';
        }
    });


    return (
        <div>
            {JSON.stringify(error)}
            <Form onSubmit={onSubmit}>
                <h2>Create a post</h2>
                <Form.Field>
                    <Form.Input placeholder="Label" name="body" value={values.body} onChange={onChange} />
                    <Button type="submit" color="purple">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
        </div>
    );
}

const CREATE_POST = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;
