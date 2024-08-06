import { z } from 'zod';

import { zGet } from '../../utils/zod-fetch';

export async function getSpotifyArtist(props: {
	accessToken: string;
	spotifyId: string;
}) {
	const endpoint = `https://api.spotify.com/v1/artists/${props.spotifyId}`;

	const auth = `Bearer ${props.accessToken}`;

	const res = await zGet(endpoint, spotifyArtistResponseSchema, { auth });

	if (!res.success || !res.parsed) return null;

	return res.data;
}

const spotifyArtistResponseSchema = z.object({
	external_urls: z.object({
		spotify: z.string(),
	}),
	followers: z.object({
		href: z.string().nullable(),
		total: z.number(),
	}),
	genres: z.array(z.string()),
	href: z.string(),
	id: z.string(),
	images: z.array(
		z.object({
			url: z.string(),
			height: z.number().nullable(),
			width: z.number().nullable(),
		}),
	),
	name: z.string(),
	popularity: z.number(),
	type: z.string(),
	uri: z.string(),
});

export { spotifyArtistResponseSchema };
