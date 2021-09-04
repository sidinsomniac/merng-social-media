import { gql, useQuery } from "@apollo/react-hooks";
import { Grid, Header } from "semantic-ui-react";
import React from 'react';
import PostCard from "../components/PostCard";

function Home() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY) || {};

    return (
        <Grid columns='three' divided>
            <Grid.Row className="page-title">
                <Header as="h2">
                    Recent Posts
                </Header>
            </Grid.Row>
            <Grid.Row className="page-content">
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    data.fetchPosts && data.fetchPosts.map(post => (
                        <Grid.Column key={post.id}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POSTS_QUERY = gql`
    query {
        fetchPosts{
            id
            body
            createdAt
            username
            likeCount
            commentCount
            likes {
                username
            }
            comments {
                id
                body
                username
                createdAt
           }
        }
    }
`;

export default Home;
