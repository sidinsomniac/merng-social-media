import { gql } from "@apollo/react-hooks";

export const FETCH_POSTS_QUERY = gql`
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