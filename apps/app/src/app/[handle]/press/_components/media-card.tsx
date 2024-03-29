'use client';

import type { FileRecord } from '@barely/lib/server/file.schema';

import BackgroundImage from '@barely/ui/elements/background-image';
import { Button } from '@barely/ui/elements/button';
import { GridItemCheckbox } from '@barely/ui/elements/grid-list';
import { Tooltip } from '@barely/ui/elements/tooltip';

export interface MediaCardProps {
	file: FileRecord;
	previewImage?: string;
	removeFile?: () => void;
	isSelectable?: boolean;
}

export function MediaCard({ file, removeFile, isSelectable }: MediaCardProps) {
	return (
		<Tooltip content={file.name} side='bottom' delayDuration={700}>
			<div className='group relative z-[1] flex h-32 w-full flex-grow flex-col rounded-sm'>
				{isSelectable && (
					<GridItemCheckbox slot='selection' className='absolute left-2 top-2 z-10' />
				)}
				{file.type === 'image' && (
					<div className='relative inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md'>
						<BackgroundImage src={file.src} alt={file.name} />
					</div>
				)}
				{!!removeFile && (
					<Button
						startIcon='x'
						variant='icon'
						pill
						size='xs'
						look='muted'
						onClick={removeFile}
						className='absolute -right-[6px] -top-[6px] z-10 drop-shadow-md'
					/>
				)}
			</div>
		</Tooltip>
	);
}
