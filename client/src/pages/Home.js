import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Grid, GridRow, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import style from '../App.module.scss';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const Home = () => {
	const user = useContext(AuthContext);
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);

	return (
		<Grid columns={3}>
			<GridRow className={style.page_title}>
				<h1>Recent Posts</h1>
			</GridRow>
			<GridRow>
				{user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
			</GridRow>
			<GridRow>
				{loading ? (
					<h1>Loading posts...</h1>
				) : (
					<Transition.Group>
						{data &&
							data.getPosts.map(post => (
								<Grid.Column key={post.id} className={style.post}>
									<PostCard post={post} />
								</Grid.Column>
							))}
					</Transition.Group>
				)}
			</GridRow>
		</Grid>
	);
};

export default Home;
