import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import type { ReactNode } from 'react';
import React from 'react';
import { Button, Heading, Link, Text } from '@react-email/components';
// import { MDXRemote } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote/rsc';

// import { serialize } from 'next-mdx-remote/serialize';

import type { EmailVariableName } from './email.constants';

export async function renderMarkdownToReactEmail(props: {
	subject: string;
	body: string;
	variables: Record<EmailVariableName, string>;
}) {
	const { subject, body, variables } = props;

	console.log('body', body);
	// Replace variables with values or empty string if not found
	// const subjectWithVars = subject.replace(/\{([A-Za-z_]+)\}/g, (match, p1) => {
	// 	const variableName = p1 as EmailVariableName;
	// 	return variables[variableName] || '';
	// });
	const subjectWithVars = subject
		.replaceAll('{firstName}', variables.firstName)
		.replaceAll('{lastName}', variables.lastName);

	// const bodyWithVars = body.replace(/\{([A-Za-z_]+)\}/g, (match, p1) => {
	// 	const variableName = p1 as EmailVariableName;
	// 	return variables[variableName] || '';
	// });
	const bodyWithVars = body
		.replaceAll('\\{firstName}', variables.firstName)
		.replaceAll('\\{lastName}', variables.lastName);

	console.log('bodyWithVars', bodyWithVars);

	const components: MDXRemoteProps['components'] = {
		p: ({ children }: { children?: ReactNode }) => <Text>{children}</Text>,
		h1: ({ children }: { children?: ReactNode }) => <Heading as='h1'>{children}</Heading>,
		h2: ({ children }: { children?: ReactNode }) => <Heading as='h2'>{children}</Heading>,
		h3: ({ children }: { children?: ReactNode }) => <Heading as='h3'>{children}</Heading>,
		h4: ({ children }: { children?: ReactNode }) => <Heading as='h4'>{children}</Heading>,
		h5: ({ children }: { children?: ReactNode }) => <Heading as='h5'>{children}</Heading>,
		h6: ({ children }: { children?: ReactNode }) => <Heading as='h6'>{children}</Heading>,
		a: ({ href, children }: { href?: string; children?: ReactNode }) => (
			<Link href={href ?? ''}>{children}</Link>
		),
		LinkButton: ({ href, label }: { href: string; label: string }) => (
			<Button href={href}>{label}</Button>
		),
	};

	// const mdxSource = await serialize(bodyWithVars);
	const awaitedBody = await MDXRemote({
		source: bodyWithVars,
		components,
	});

	return {
		subject: subjectWithVars,
		// reactBody: <MDXRemote {...mdxSource} components={components} />,
		// reactBody: <MDXRemote source={bodyWithVars} components={components} />,
		reactBody: awaitedBody,
	};
}
