import Image from 'next/image';
import Link from 'next/link';

import logo from '@public/static/logo.png';

import { Icon } from '@barely/ui/elements/icon';
import { H3 } from '@barely/ui/elements/typography';

import LoginForm from './login-form';

const SignInPage = ({ searchParams }: { searchParams?: { error: string } }) => {
	const { error } = searchParams ?? {};

	if (error) {
		console.error(error);
	}

	return (
		<div className='container flex h-screen w-screen flex-col items-center justify-center'>
			<Link
				href='/'
				className='absolute top-4 left-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent py-2 px-3 text-center text-sm  font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:left-8'
			>
				<>
					<Icon.chevronLeft className='mr-2 h-4 w-4' />
					Back
				</>
			</Link>
			<div className='mx-auto flex w-full flex-col justify-center space-y-4 text-center sm:w-[350px]'>
				<div className='flex flex-col space-y-1 text-center'>
					<div className='relative mx-auto mb-2 h-12 w-12'>
						<Image src={logo} alt='barely.io' fill priority />
					</div>
					<H3 className='font-bold'>Welcome back</H3>
				</div>

				<LoginForm />
				{/* <UserAuthForm {...{ token, emailAddressId: email_address_id, redirect }} /> */}
			</div>
		</div>
	);
};

export default SignInPage;
