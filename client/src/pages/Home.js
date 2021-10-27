import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, GridRow } from 'semantic-ui-react';
import PostCard from '../component/PostCard';
import style from './Home.module.scss';

const Home = () => {
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);

	return (
		<Grid columns={3}>
			<GridRow className={style.page_title}>
				<h1>Recent Posts</h1>
			</GridRow>
			<GridRow>
				{loading ? (
					<h1>Loading posts...</h1>
				) : (
					data &&
					data.getPosts.map(post => (
						<Grid.Column key={post.id} className={style.post}>
							<PostCard post={post} />
						</Grid.Column>
					))
				)}
			</GridRow>
		</Grid>
	);
};

const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;
export default Home;
