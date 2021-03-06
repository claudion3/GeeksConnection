import React, { useContext, useState, useRef, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
	Button,
	Card,
	Form,
	Grid,
	Icon,
	Label,
	Container,
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';
import style from '../App.module.scss';

function SinglePost(props) {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);
	const commentInputRef = useRef(null);

	const [comment, setComment] = useState('');
	const [getPost, setGetPost] = useState('');
	const { data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});
	useEffect(() => {
		if (data) {
			setGetPost(data.getPost);
		}
	}, [data]);

	const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
		update() {
			setComment('');
			commentInputRef.current.blur();
		},
		variables: {
			postId,
			body: comment,
		},
	});
	//console.log('user', user);

	function deletePostCallback() {
		//window.location.reload();

		props.history.push('/');
	}

	let postMarkup;
	if (!getPost) {
		postMarkup = <p>Loading post..</p>;
	} else {
		const {
			id,
			body,
			createdAt,
			username,
			comments,
			likes,
			likeCount,
			commentCount,
		} = getPost;

		postMarkup = (
			<Container className={style.comment_wrapper}>
				<Grid.Row>
					<Grid.Column>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton user={user} post={{ id, likeCount, likes }} />
								<MyPopup content='Comment on post'>
									<Button
										as='div'
										labelPosition='right'
										onClick={() => console.log('Comment on post')}>
										<Button basic color='blue'>
											<Icon name='comments' />
										</Button>
										<Label basic color='blue' pointing='left'>
											{commentCount}
										</Label>
									</Button>
								</MyPopup>
								{user && user.username === username && (
									<DeleteButton postId={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									<p>Post a comment</p>
									<Form>
										<div className='ui action input fluid'>
											<input
												type='text'
												placeholder='Comment..'
												name='comment'
												value={comment}
												onChange={event => setComment(event.target.value)}
												ref={commentInputRef}
											/>
											<button
												type='submit'
												className='ui button teal'
												disabled={comment.trim() === ''}
												onClick={submitComment}>
												Submit
											</button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map(comment => (
							<Card fluid key={comment.id}>
								<Card.Content>
									{user && user.username === comment.username && (
										<DeleteButton postId={id} commentId={comment.id} />
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Container>
		);
	}
	return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
	mutation ($postId: String!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				body
				createdAt
				username
			}
			commentCount
		}
	}
`;
const FETCH_POST_QUERY = gql`
	query ($postId: ID!) {
		getPost(postId: $postId) {
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
				body
				createdAt
				username
			}
		}
	}
`;
export default SinglePost;
