import moment from "moment";
import React from 'react';
import { Link } from "react-router-dom";
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';

function PostCard({ post: { id, body, createdAt, username, likeCount, commentCount, comments } }) {
    return (
        <Card fluid>
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
                <Button as='div' labelPosition='right'>
                    <Button color='purple' basic>
                        <Icon name='heart' />
                    </Button>
                    <Label as='a' basic color='purple' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right'>
                    <Button color='olive' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label as='a' basic color='olive' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    );
}

export default PostCard;
