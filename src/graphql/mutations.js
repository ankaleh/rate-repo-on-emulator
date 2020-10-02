import { gql } from 'apollo-boost';


export const AUTHORIZE = gql`
    mutation authorize($credentials: AuthorizeInput) {
        authorize(credentials: $credentials) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation createReview($review: CreateReviewInput) {
        createReview(review: $review) {
            id
            userId
            repositoryId
            rating
            createdAt
            text
        }
    }       
`;

export const CREATE_USER = gql`
    mutation createUser($user: CreateUserInput) {
        createUser(user: $user) {
            id
            username
            createdAt
            
            reviewCount
        }
    }

`;
export const DELETE_REVIEW = gql`
mutation deleteReview($id: ID!) {
    deleteReview(id: $id) 
}

`;




