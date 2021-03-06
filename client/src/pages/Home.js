import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import {
	Grid,
	GridRow,
	Transition,
	Container,
	Loader,
} from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import style from '../App.module.scss';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const Home = () => {
	const user = useContext(AuthContext);
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);
	const [allPosts, setAllPosts] = useState([]);

	useEffect(() => {
		if (data) {
			setAllPosts(data.getPosts);
		}
	}, [data]);

	return (
		<Container>
			<div className={style.wrapper}>
				<GridRow className={style.page_title}>
					<h1>Recent Posts</h1>
				</GridRow>
				<GridRow>
					{user && (
						<div className={style.post_form}>
							<PostForm />
						</div>
					)}
				</GridRow>
				<GridRow className={style.post_card}>
					{loading ? (
						<Loader content='Loading' />
					) : (
						<Transition.Group>
							{data &&
								allPosts.map(post => (
									<Grid.Column key={post.id} className={style.cards}>
										<PostCard post={post} />
									</Grid.Column>
								))}
						</Transition.Group>
					)}
				</GridRow>
			</div>
		</Container>
	);
};

export default Home;
