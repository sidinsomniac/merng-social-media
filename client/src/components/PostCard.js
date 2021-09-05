import moment from "moment";
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

import "../App.css";
import DeleteButton from "./DeleteButton";

function PostCard({ post: { id, body, createdAt, username, likeCount, commentCount, comments, likes } }) {

    const { user } = useContext(AuthContext);

    return (
        <Card fluid className="post-card">
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button as={Link} to={`/posts/${id}`} labelPosition='right'>
                    <Button color='olive' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='olive' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    // <Button as="div" color='red' floated="right" basic onClick={removePost}>
                    //     <Icon style={{ margin: 0 }} name='trash' />
                    // </Button>
                    <DeleteButton postId={id} />
                )}
            </Card.Content>
        </Card>
    );
}

export default PostCard;
