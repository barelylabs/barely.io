import type { ReactNode } from 'react';
import type { z } from 'zod';
import React from 'react';
import Link from 'next/link';
import {
	emailInUseMessage,
	newUserContactInfoSchemaWithRole,
	phoneNumberInUseMessage,
} from '@barely/lib/server/routes/user/user.schema';
import { debounce } from 'perfect-debounce';

import { useZodForm } from '@barely/hooks/use-zod-form';

import { Text } from '@barely/ui/elements/typography';
import { Form, SubmitButton } from '@barely/ui/forms';
import { PhoneField } from '@barely/ui/forms/phone-field';
import { TextField } from '@barely/ui/forms/text-field';

import { isRealEmail } from '@barely/utils/email';
import { onPromise } from '@barely/utils/on-promise';
import { isPossiblePhoneNumber } from '@barely/utils/phone-number';

interface UserContactInfoFormProps {
	onSubmit: (
		data: z.infer<typeof newUserContactInfoSchemaWithRole>,
	) => void | Promise<void>;
	submitLabel?: ReactNode;
	newUser?: boolean;
	phoneHint?: ReactNode;
}

export function PlaylistPitchContactInfoForm(props: UserContactInfoFormProps) {
	const form = useZodForm({
		schema: newUserContactInfoSchemaWithRole,
		defaultValues: {
			fullName: '',
			role: 'owner',
			email: '',
			phone: '',
		},
	});

	return (
		<Form form={form} onSubmit={props.onSubmit}>
			<div className='flex flex-col space-y-1'>
				<TextField
					control={form.control}
					name='fullName'
					label='Your Name'
					onChangeDebounced={e => console.log('changed ', e.target.value)}
				/>

				<TextField
					control={form.control}
					name='email'
					label='Email'
					type='email'
					autoCorrect='off'
					autoComplete='email'
					autoCapitalize='off'
					onChangeDebounced={async e => {
						if (isRealEmail(e.target.value)) await form.trigger('email');

						if (
							form.formState.isSubmitted ||
							form.formState.errors.email?.message === emailInUseMessage
						)
							await form.trigger('email');
					}}
				/>

				{/* <SelectField
					control={form.control}
					name='role'
					label='Role'
					placeholder='Artist'
					options={[
						{ label: 'Artist', value: 'artist' },
						{ label: 'Creator', value: 'creator' },
						{ label: 'Label', value: 'label' },
						{ label: 'Marketer', value: 'marketer' },
					]}
				/> */}

				<PhoneField
					control={form.control}
					name='phone'
					label='Phone (optional)'
					hint={
						props.phoneHint ?? 'We will only use this to contact you about your account.'
					}
					onChange={e => {
						const handleChange = onPromise(
							debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
								if (!e.target.value.length) return form.trigger('phone');

								const phoneIsReal = isPossiblePhoneNumber(e.target.value);

								if (phoneIsReal) await form.trigger('phone');

								if (
									!phoneIsReal &&
									(form.formState.errors.phone?.message === phoneNumberInUseMessage ||
										form.formState.isSubmitted)
								)
									await form.trigger('phone');
							}),
						);

						return handleChange(e);
					}}
				/>
			</div>

			<div className='flex flex-col space-y-4 py-4'>
				<SubmitButton fullWidth>{props.submitLabel ?? 'Submit'}</SubmitButton>
				{props.newUser && (
					<Text variant='sm/light' subtle className='text-center'>
						I already have an account.{' '}
						<span className='underline dark:text-slate-300'>
							<Link href='/login'>Login</Link>
						</span>
					</Text>
				)}
			</div>
		</Form>
	);
}
