import gql from "graphql-tag";

export const CONTENT_FEED = gql`
query Contentfeed($cursor: String) {
  postsContentfeed(first: 50, after: $cursor) {
    edges {
      post {
        id
        metadata  {
          title
          revisionContentHash
          revisionContentURL
          canonicalURL
          slug
          description
          contributors {
            contributor
          }
          images {
            image
          }
          tags {
            tag
          }
          primaryTag
          revisionDate
          originalPublishDate
          opinion
          civilSchemaVersion
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;

export const CONTENT_DETAILS = gql`
  query ContentDetails($id: String!) {
    postsGet(id: $id) {
      id
      metadata  {
        title
        revisionContentHash
        revisionContentURL
        canonicalURL
        slug
        description
        contributors {
          contributor
        }
        images {
          image
        }
        tags {
          tag
        }
        primaryTag
        revisionDate
        originalPublishDate
        opinion
        civilSchemaVersion
      }
      pricing {
        ...
      }
    }
  }
`;
