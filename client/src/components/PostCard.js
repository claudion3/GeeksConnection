import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function PostCard({
	post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
	const { user } = useContext(AuthContext);
	const disabled = user ? false : true;

	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://www.choicemedwaste.com/wp-content/uploads/default-user-avatar-dc6f2da9.gif'
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow(true)}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton
					user={user}
					post={{ id, likes, likeCount }}
					disabled={disabled}
				/>
				<MyPopup content='Comment on post'>
					<Button
						labelPosition='right'
						as={Link}
						to={`/posts/${id}`}
						disabled={disabled}>
						<Button color='blue' basic>
							<Icon name='comments' />
						</Button>
						<Label basic color='blue' pointing='left'>
							{commentCount}
						</Label>
					</Button>
				</MyPopup>
				{user && user.username === username && <DeleteButton postId={id} />}
			</Card.Content>
		</Card>
	);
}

export default PostCard;
