import { gql, useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";

function LikeButton({ user, post: { id, likes, likeCount } }) {
    const [liked, setLiked] = useState(false);

    const [liking] = useMutation(LIKE_POST, {
        variables: {
            postId: id
        }
    });

    const likePost = () => {
        if (!user) return;
        liking();
    };

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const likeButton = user ? (
        liked ? (
            <Button color='purple'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='purple' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color='purple' basic>
            <Icon name='heart' />
        </Button>
    );

    return (
        <Button as='div' onClick={likePost} labelPosition='right'>
            {likeButton}
            <Label as='a' basic color='purple' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    );
}

const LIKE_POST = gql`
    mutation likePost($postId: ID!) {
        likePost (postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeButton;
