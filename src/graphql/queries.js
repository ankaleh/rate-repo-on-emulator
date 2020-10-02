import { gql } from 'apollo-boost';

export const GET_ALL_REPOSITORIES_ORDER_BY_ORDER_DIRECTION = gql`
query getRepositoriesOrderByOrderDirection($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
   	edges {
      node {
      	id,
    	fullName,
    	description,
    	language,
    	forksCount,
    	stargazersCount,
    	ratingAverage,
    	reviewCount,
    	ownerAvatarUrl
    
      }
    }
  }
}
`;

export const GET_ALL_REPOSITORIES = gql`
query getRepositories($orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
  repositories(orderBy: $orderBy, searchKeyword: $searchKeyword) {
   	edges {
      node {
      	id,
    	fullName,
    	description,
    	language,
    	forksCount,
    	stargazersCount,
    	ratingAverage,
    	reviewCount,
    	ownerAvatarUrl
    
      }
    }
  }
}
`;

export const GET_ALL_REPOSITORIES_SEARCH_KEYWORD = gql`
	query getRepositoriesSearchKeyword($searchKeyword: String) {
		repositories(searchKeyword: $searchKeyword) {
			edges {
				node {
				  id
				  fullName
				  description,
    			  language,
    			  forksCount,
    			  stargazersCount,
    			  ratingAverage,
    			  reviewCount,
    			  ownerAvatarUrl
				}
			}
		}

	}
`;


export const GET_AUTHORIZED_USER = gql`
query getAuthorizedUser($includeReviews: Boolean=false) {
  authorizedUser {
	id
    username
	reviews @include(if: $includeReviews) {
	  edges {
		node {
			id
			text
			rating
			createdAt
			user {
			  id
			  username
			}
			repository {
				fullName
				id
			}
		}
		cursor
	  }
	}
  }
}
`;

export const GET_REPOSITORY = gql`
query getRepository($id: ID!, $after: String) {
	repository(id: $id) {
		id
		fullName
		stargazersCount
		forksCount
		ownerAvatarUrl
		description
		language
		reviewCount
		ratingAverage
		url
		reviews(first: 8, after: $after) {
			edges {
			  node {
				id
				text
				rating
				createdAt
				repositoryId
				user {
				  id
				  username
				}
			  }
			  cursor
			}
			pageInfo {
			  endCursor
			  startCursor
			  totalCount
			  hasNextPage
			}
		  
		}
	}
}
`;


