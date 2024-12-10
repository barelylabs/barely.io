'use client';

import { useFmStatFilters } from '@barely/lib/hooks/use-fm-stat-filters';
import { usePlatformFilters } from '@barely/lib/hooks/use-platform-filters';
import { useWebEventStatFilters } from '@barely/lib/hooks/use-web-event-stat-filters';
import { cn } from '@barely/lib/utils/cn';
import { api } from '@barely/server/api/react';

import { AreaChart } from '@barely/ui/charts/area-chart';
import { Card } from '@barely/ui/elements/card';
import { Icon } from '@barely/ui/elements/icon';
import { H, Text } from '@barely/ui/elements/typography';

import { calcPercent, nFormatter } from '@barely/utils/number';

import { WebEventFilterBadges } from '~/app/[handle]/_components/filter-badges';

export function FmTimeseries() {
	const {
		filtersWithHandle,
		uiFilters,
		formatTimestamp,
		badgeFilters,
		toggleShowVisits,
		toggleShowClicks,
		toggleSpotify,
		toggleAppleMusic,
		toggleYoutube,
		toggleAmazonMusic,
		toggleYoutubeMusic,
	} = useFmStatFilters();

	const {
		showVisits,
		showClicks,
		showSpotify,
		showAppleMusic,
		showYoutube,
		showAmazonMusic,
		showYoutubeMusic,
	} = uiFilters;

	const { data: timeseries } = api.stat.fmTimeseries.useQuery(
		{ ...filtersWithHandle },
		{
			select: data =>
				data.map(row => ({
					...row,
					date: formatTimestamp(row.start),
				})),
		},
	);

	const totalVisits = timeseries?.reduce((acc, row) => acc + row.fm_views, 0);
	const totalClicks = timeseries?.reduce((acc, row) => acc + row.fm_linkClicks, 0);

	const totalSpotifyClicks = timeseries?.reduce(
		(acc, row) => acc + row.fm_spotifyClicks,
		0,
	);
	const totalAppleMusicClicks = timeseries?.reduce(
		(acc, row) => acc + row.fm_appleMusicClicks,
		0,
	);
	const totalYoutubeClicks = timeseries?.reduce(
		(acc, row) => acc + row.fm_youtubeClicks,
		0,
	);
	const totalAmazonMusicClicks = timeseries?.reduce(
		(acc, row) => acc + row.fm_amazonMusicClicks,
		0,
	);
	const totalYoutubeMusicClicks = timeseries?.reduce(
		(acc, row) => acc + row.fm_youtubeMusicClicks,
		0,
	);

	// const [showVisits, setShowVisits] = useState(true);
	// const [showClicks, setShowClicks] = useState(true);
	// const [showSpotify, setShowSpotify] = useState(false);
	// const [showAppleMusic, setShowAppleMusic] = useState(false);
	// const [showYoutube, setShowYoutube] = useState(false);
	// const [showAmazonMusic, setShowAmazonMusic] = useState(false);
	// const [showYoutubeMusic, setShowYoutubeMusic] = useState(false);

	// const { showVisits, showClicks } = filtersWithHandle;

	const chartData = (timeseries ?? [])?.map(row => ({
		...row,
		visits: showVisits ? row.fm_views : undefined,
		clicks: showClicks ? row.fm_linkClicks : undefined,
		spotify: showSpotify && totalSpotifyClicks ? row.fm_spotifyClicks : undefined,
		appleMusic:
			showAppleMusic && totalAppleMusicClicks ? row.fm_appleMusicClicks : undefined,
		youtube: showYoutube && totalYoutubeClicks ? row.fm_youtubeClicks : undefined,
		amazonMusic:
			showAmazonMusic && totalAmazonMusicClicks ? row.fm_amazonMusicClicks : undefined,
		youtubeMusic:
			showYoutubeMusic && totalYoutubeMusicClicks ? row.fm_youtubeMusicClicks : undefined,
	}));

	return (
		<Card className='p-6'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row'>
					<button
						type='button'
						className={cn(
							'flex flex-col gap-1 rounded-tl-md py-3 pl-3 pr-8',
							showVisits && 'border-b-3 border-slate-500 bg-slate-100',
						)}
						onClick={toggleShowVisits}
					>
						<div className='flex flex-row items-center gap-1'>
							<div className='m-auto mb-0.5 rounded-sm bg-slate-500 p-[3px]'>
								<Icon.view className='h-3.5 w-3.5 text-white' />
							</div>
							<Text variant='sm/medium' className='uppercase'>
								VISITS
							</Text>
						</div>
						<H size='4'>{totalVisits}</H>
					</button>

					<button
						type='button'
						className={cn(
							'flex flex-col gap-1 py-3 pl-4 pr-8',
							showClicks && 'border-b-3 border-blue-500 bg-blue-100',
						)}
						onClick={toggleShowClicks}
					>
						<div className='flex flex-row items-center gap-1'>
							<div className='m-auto rounded-sm bg-blue p-0.5'>
								<Icon.click className='mb-[1px] h-3.5 w-3.5 text-white' />
							</div>
							<Text variant='sm/medium' className='uppercase '>
								CLICKS
							</Text>
						</div>
						<div className='flex flex-row items-baseline gap-1'>
							<H size='4'>{totalClicks}</H>
							<Text
								variant='sm/medium'
								className='uppercase tracking-[-.05em] text-muted-foreground'
							>
								({calcPercent(totalClicks ?? 0, totalVisits ?? 0)})
							</Text>
						</div>
					</button>
					<div
						className={cn(
							'flex flex-col gap-1 rounded-tr-md border-slate-300 bg-slate-50 py-3 pl-4 pr-8',
						)}
					>
						<PlatformClicks
							totalSpotify={totalSpotifyClicks ?? 0}
							totalAppleMusic={totalAppleMusicClicks ?? 0}
							totalYoutube={totalYoutubeClicks ?? 0}
							totalAmazonMusic={totalAmazonMusicClicks ?? 0}
							totalYoutubeMusic={totalYoutubeMusicClicks ?? 0}
							showSpotify={showSpotify}
							showAppleMusic={showAppleMusic}
							showYoutube={showYoutube}
							showAmazonMusic={showAmazonMusic}
							showYoutubeMusic={showYoutubeMusic}
							toggleSpotify={toggleSpotify}
							toggleAppleMusic={toggleAppleMusic}
							toggleYoutube={toggleYoutube}
							toggleAmazonMusic={toggleAmazonMusic}
							toggleYoutubeMusic={toggleYoutubeMusic}
						/>
					</div>
				</div>

				<div className='flex flex-row justify-between gap-2'>
					<WebEventFilterBadges filters={badgeFilters} />
				</div>
			</div>

			{/* <pre>{JSON.stringify(chartData, null, 2)}</pre> */}

			<AreaChart
				className='mt-4 h-72 '
				data={chartData}
				index='date'
				categories={[
					'visits',
					'clicks',
					'spotify',
					'appleMusic',
					'youtube',
					'amazonMusic',
					'youtubeMusic',
				]}
				colors={['slate', 'blue', 'green', 'red', 'yellow', 'purple', 'pink']}
				showXAxis={true}
				showLegend={false}
				// curveType={filtersWithHandle.dateRange === '1d' ? 'linear' : 'natural'}
				curveType='linear'
				yAxisWidth={30}
				valueFormatter={v => nFormatter(v)}
			/>
		</Card>
	);
}

const PlatformClicks = ({
	totalSpotify,
	totalAppleMusic,
	totalYoutube,
	totalAmazonMusic,
	totalYoutubeMusic,
	showSpotify,
	showAppleMusic,
	showYoutube,
	showAmazonMusic,
	showYoutubeMusic,
	toggleSpotify,
	toggleAppleMusic,
	toggleYoutube,
	toggleAmazonMusic,
	toggleYoutubeMusic,
}: {
	totalSpotify: number;
	totalAppleMusic: number;
	totalYoutube: number;
	totalAmazonMusic: number;
	totalYoutubeMusic: number;
	showSpotify?: boolean;
	showAppleMusic?: boolean;
	showYoutube?: boolean;
	showAmazonMusic?: boolean;
	showYoutubeMusic?: boolean;
	toggleSpotify: () => void;
	toggleAppleMusic: () => void;
	toggleYoutube: () => void;
	toggleAmazonMusic: () => void;
	toggleYoutubeMusic: () => void;
}) => {
	return (
		<div className='h-max-full grid auto-cols-max grid-flow-col grid-rows-3 gap-x-4 gap-y-1'>
			<button
				type='button'
				className={cn(
					'bg-slate flex flex-row items-center gap-x-1 gap-y-0.5 rounded-sm p-0.5',
				)}
				onClick={toggleSpotify}
			>
				<Icon.spotify
					className={cn('mb-[1px] h-3 w-3 text-slate-500', showSpotify && 'text-spotify')}
				/>
				<Text
					variant='xs/medium'
					className={showSpotify ? 'text-spotify' : 'text-slate-500'}
				>
					Spotify: {totalSpotify}
				</Text>
			</button>

			<button
				type='button'
				className={cn('bg-slate flex flex-row items-center gap-1 rounded-sm p-0.5')}
				onClick={toggleAppleMusic}
			>
				<Icon.appleMusic
					className={cn(
						'mb-[1px] h-3 w-3 text-slate-500',
						showAppleMusic && 'text-appleMusic',
					)}
				/>
				<Text
					variant='xs/medium'
					className={showAppleMusic ? 'text-appleMusic' : 'text-slate-500'}
				>
					Apple Music: {totalAppleMusic}
				</Text>
			</button>

			<button
				type='button'
				className={cn('bg-slate flex flex-row items-center gap-1 rounded-sm p-0.5')}
				onClick={toggleYoutube}
			>
				<Icon.youtube
					className={cn('mb-[1px] h-3 w-3 text-slate-500', showYoutube && 'text-youtube')}
				/>
				<Text
					variant='xs/medium'
					className={showYoutube ? 'text-youtube' : 'text-slate-500'}
				>
					YouTube: {totalYoutube}
				</Text>
			</button>

			<button
				type='button'
				className={cn('bg-slate flex flex-row items-center gap-1 rounded-sm p-0.5')}
				onClick={toggleAmazonMusic}
			>
				<Icon.amazonMusic
					className={cn(
						'mb-[1px] h-3 w-3 text-slate-500',
						showAmazonMusic && 'text-amazon-music',
					)}
				/>
				<Text
					variant='xs/medium'
					className={showAmazonMusic ? 'text-amazon-music' : 'text-slate-500'}
				>
					Amazon Music: {totalAmazonMusic}
				</Text>
			</button>

			<button
				type='button'
				className={cn('bg-slate flex flex-row items-center gap-1 rounded-sm p-0.5')}
				onClick={toggleYoutubeMusic}
			>
				<Icon.youtubeMusic
					className={cn(
						'mb-[1px] h-3 w-3 text-slate-500',
						showYoutubeMusic && 'text-youtube',
					)}
				/>
				<Text
					variant='xs/medium'
					className={showYoutubeMusic ? 'text-youtube' : 'text-slate-500'}
				>
					YouTube Music: {totalYoutubeMusic}
				</Text>
			</button>
		</div>
	);
};
