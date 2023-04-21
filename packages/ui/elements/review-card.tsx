import { initials } from '@barely/lib/utils/edge/name';

import { Avatar } from './avatar';
import { RatingDisplay } from './rating';

const Review = (props: {
	rating: number;
	review?: string;
	reviewer?: {
		imageUrl?: string;
		displayName: string;
	};
	key?: string;
}) => {
	return (
		<div className='flex flex-row gap-5 items-start pb-3'>
			<Avatar
				imageUrl={props.reviewer?.imageUrl}
				initials={initials(props.reviewer?.displayName ?? 'U')}
			/>
			<div className='flex flex-col space-y-2'>
				<RatingDisplay rating={props.rating} by={props.reviewer?.displayName} />
				<div>{props.review}</div>
			</div>
		</div>
	);
};

export { Review };
