'use client';

import type { AppRouterOutputs } from '@barely/lib/server/api/router';

import { GridListSkeleton } from '@barely/ui/components/grid-list-skeleton';
import { NoResultsPlaceholder } from '@barely/ui/components/no-results-placeholder';
import { GridList, GridListCard } from '@barely/ui/elements/grid-list';

import { CreateFmPageButton } from '~/app/[handle]/fm/_components/create-fm-page-button';
import { useFmContext } from '~/app/[handle]/fm/_components/fm-context';

export function AllFmPages() {
	const {
		items,
		selection,
		lastSelectedItemId,
		setSelection,
		gridListRef,
		setShowUpdateModal,
		isFetching,
	} = useFmContext();

	return (
		<>
			<GridList
				glRef={gridListRef}
				className='flex flex-col gap-2'
				aria-label='Fm Pages'
				selectionMode='multiple'
				selectionBehavior='replace'
				onAction={() => {
					if (!lastSelectedItemId) return;
					setShowUpdateModal(true);
				}}
				items={items}
				selectedKeys={selection}
				setSelectedKeys={setSelection}
				renderEmptyState={() => (
					<>
						{isFetching ?
							<GridListSkeleton />
						:	<NoResultsPlaceholder
								icon='fm'
								title='No FM Pages'
								subtitle='Create a new fm page to get started.'
								button={<CreateFmPageButton />}
							/>
						}
					</>
				)}
			>
				{item => <FmPageCard fmPage={item} />}
			</GridList>
		</>
	);
}

function FmPageCard({
	fmPage,
}: {
	fmPage: AppRouterOutputs['fm']['byWorkspace']['fmPages'][0];
}) {
	const { setShowUpdateModal, setShowArchiveModal, setShowDeleteModal } = useFmContext();

	const { coverArt } = fmPage;

	const href = `https://barely.fm/${fmPage.handle}/${fmPage.key}`;

	return (
		<GridListCard
			id={fmPage.id}
			key={fmPage.id}
			textValue={fmPage.title}
			setShowUpdateModal={setShowUpdateModal}
			setShowArchiveModal={setShowArchiveModal}
			setShowDeleteModal={setShowDeleteModal}
			img={{ ...coverArt, alt: `${fmPage.title} cover art` }}
			title={fmPage.title}
			subtitle={`${fmPage.clicks} clicks`}
			quickActions={{
				goToHref: href,
				copyText: href,
			}}
			stats={[
				{
					icon: 'spotify',
					name: 'Spotify',
					value: fmPage.spotifyClicks,
				},
				{
					icon: 'appleMusic',
					name: 'Apple Music',
					value: fmPage.appleMusicClicks,
				},
				{
					icon: 'youtube',
					name: 'YouTube',
					value: fmPage.youtubeClicks,
				},
				{
					icon: 'amazonMusic',
					name: 'Amazon Music',
					value: fmPage.amazonMusicClicks,
				},
			]}
			statsHref={`/${fmPage.handle}/fm/stats?assetId=${fmPage.id}`}
		/>
	);
}
