import React, { useContext } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { Grid, Header } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function Home() {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY) || {};

    return (
        <Grid columns='three' divided>
            <Grid.Row className="page-title">
                <Header as="h2">
                    Recent Posts
                </Header>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
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

export default Home;
