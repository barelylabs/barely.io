// 'use client';

// import { useWebEventStatFilters } from '@barely/lib/hooks/use-web-event-stat-filters';
// import { cn } from '@barely/lib/utils/cn';
// import { api } from '@barely/server/api/react';

// import { AreaChart } from '@barely/ui/charts/area-chart';
// import { Card } from '@barely/ui/elements/card';
// import { Icon } from '@barely/ui/elements/icon';
// import { H, Text } from '@barely/ui/elements/typography';

// import { nFormatter } from '@barely/utils/number';

// import { WebEventFilterBadges } from '~/app/[handle]/_components/filter-badges';

// export function LinkTimeseries() {
// 	const { filtersWithHandle, formatTimestamp, badgeFilters } = useWebEventStatFilters();

// 	const [timeseries] = api.stat.linkTimeseries.useSuspenseQuery(
// 		{ ...filtersWithHandle },
// 		{
// 			select: data =>
// 				data.map(row => ({
// 					...row,
// 					date: formatTimestamp(row.date),
// 				})),
// 		},
// 	);

// 	const totalClicks = timeseries.reduce((acc, row) => acc + row.clicks, 0);

// 	return (
// 		<Card className='p-6'>
// 			<div className='flex flex-row items-center justify-between'>
// 				<div className='flex flex-col gap-1'>
// 					<div className='flex flex-row'>
// 						<button
// 							type='button'
// 							className={cn(
// 								'flex flex-col gap-1 rounded-t-md py-3 pl-4 pr-8',
// 								'border-b-3 border-blue-500 bg-blue-100',
// 							)}
// 							disabled
// 							// onClick={() => setShowClicks(!showClicks)}
// 						>
// 							<div className='flex flex-row items-center gap-1'>
// 								<div className='m-auto rounded-sm bg-blue p-0.5'>
// 									<Icon.click className='mb-[1px] h-3.5 w-3.5 text-white' />
// 								</div>
// 								<Text variant='sm/medium' className='uppercase '>
// 									CLICKS
// 								</Text>
// 							</div>
// 							<div className='flex flex-row items-baseline gap-1'>
// 								<H size='4'>{totalClicks}</H>
// 							</div>
// 						</button>
// 					</div>
// 				</div>
// 				<div className='flex flex-row justify-between gap-2'>
// 					<WebEventFilterBadges filters={badgeFilters} />
// 				</div>
// 			</div>
// 			<AreaChart
// 				className='mt-4 h-72 '
// 				data={timeseries}
// 				index='date'
// 				categories={['clicks']}
// 				colors={['blue']}
// 				showXAxis={true}
// 				showLegend={false}
// 				curveType='linear'
// 				yAxisWidth={30}
// 				valueFormatter={v => nFormatter(v)}
// 			/>
// 		</Card>
// 	);
// }
