/** @type {import('tailwindcss').Config} */
const { join } = require('path');

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const lightText = '#F2F2F2';
const darkText = '#1A1A1A';

module.exports = {
	content: [
		// 'apps/link/src/app/**/*.{js,ts,jsx,tsx,astro,html}',
		// join(__dirname, 'src/app/**/*.{js,ts,jsx,tsx,astro,html}'),
		// join(__dirname, 'src/pages/**/*.{js,ts,jsx,tsx,astro,html}'),
		// join(__dirname, '../../packages/ui/src/**/*.{js,ts,jsx,tsx,astro,html}'),
		// join(__dirname, './public/**/*.html'),

		// './public/**/*.html',
		'./src/app/**/*.{astro,html,ts,tsx,js,jsx}',
		'./src/pages/**/*.{astro,html,ts,tsx,js,jsx}',
		'./src/components/**/*.{astro,html,ts,tsx,js,jsx}',
		'../../packages/ui/src/**/*.{ts,tsx,js,jsx}',
		// './src/app/**/*.ts',
		// './src/app/**/*.tsx',
	],
	theme: {
		extend: {
			animation: {
				text: 'text 5s ease infinite',
			},
			keyframes: {
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
					},
				},
			},
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				black: colors.black,
				white: colors.white,

				// apps
				'amazon-music': {
					DEFAULT: '#0077C1',
					50: '#E5F5FF',
					100: '#B8E4FF',
					200: '#8AD2FF',
					300: '#5CC0FF',
					400: '#2EAFFF',
					500: '#0077C1',
					600: '#007ECC',
					700: '#005E99',
					800: '#003F66',
					900: '#001F33',
				},

				'amazon-music-alt': {
					DEFAULT: '#0DBFF5',
					50: '#E7F9FE',
					100: '#BAEDFC',
					200: '#8EE1FA',
					300: '#62D6F9',
					400: '#36CAF7',
					500: '#0DBFF5',
					600: '#0898C4',
					700: '#067293',
					800: '#044C62',
					900: '#022631',
				},

				apple: {
					DEFAULT: '#555555',
					50: '#F2F2F2',
					100: '#DBDBDB',
					200: '#C4C4C4',
					300: '#ADADAD',
					400: '#969696',
					500: '#808080',
					600: '#666666',
					700: '#4D4D4D',
					800: '#333333',
					900: '#1A1A1A',
				},
				deezer: {
					DEFAULT: '#FF0092',
					50: '#FFE5F4',
					100: '#FFB8E0',
					200: '#FF8ACD',
					300: '#FF5CB9',
					400: '#FF2EA6',
					500: '#FF0092',
					600: '#CC0075',
					700: '#990058',
					800: '#66003A',
					900: '#33001D',
				},
				facebook: {
					DEFAULT: '#4267B2',
					blue: '#4267B2',
					50: '#ECF0F8',
					100: '#CBD6EC',
					200: '#A9BBDF',
					300: '#88A1D3',
					400: '#6686C6',
					500: '#456CBA',
					600: '#375695',
					700: '#294170',
					800: '#1C2B4A',
					900: '#0E1625',
				},
				instagram: {
					DEFAULT: '#8a3ab9',
					50: '#F4ECF9',
					100: '#E0C9EE',
					200: '#CCA6E3',
					300: '#B883D8',
					400: '#A560CD',
					500: '#913DC2',
					600: '#74319B',
					700: '#572574',
					800: '#3A184E',
					900: '#1D0C27',
				},
				meta: {
					DEFAULT: '#0668E1',
					50: '#E6F1FE',
					100: '#B9D8FD',
					200: '#8DBFFC',
					300: '#60A5FB',
					400: '#338CFA',
					500: '#0773F8',
					600: '#055CC7',
					700: '#044595',
					800: '#032E63',
					900: '#011732',
				},
				spotify: {
					DEFAULT: '#1DB954',
					50: '#E9FCF0',
					100: '#C1F5D4',
					200: '#9AEFB8',
					300: '#72E99C',
					400: '#4AE380',
					500: '#1DB954',
					600: '#1CB050',
					700: '#15843C',
					800: '#0E5828',
					900: '#072C14',
				},
				tiktok: {
					DEFAULT: '#FF0050',
					50: '#FFE5ED',
					100: '#FFB8CE',
					200: '#FF8AAE',
					300: '#FF5C8F',
					400: '#FF2E6F',
					500: '#FF0050',
					600: '#CC0040',
					700: '#990030',
					800: '#660020',
					900: '#330010',
				},
				twitch: {
					DEFAULT: '#6441A5',
					50: '#F1EDF8',
					100: '#D7CCEB',
					200: '#BDABDE',
					300: '#A38AD1',
					400: '#8969C4',
					500: '#6F48B7',
					600: '#593A92',
					700: '#432B6E',
					800: '#2C1D49',
					900: '#160E25',
				},
				twitter: {
					DEFAULT: '#1DA1F2',
					50: '#E7F5FE',
					100: '#BBE3FB',
					200: '#90D1F9',
					300: '#65BFF6',
					400: '#39ADF4',
					500: '#1DA1F2',
					600: '#0B7CC1',
					700: '#085D91',
					800: '#063E60',
					900: '#031F30',
				},
				youtube: {
					DEFAULT: '#FF0000',
					50: '#FFE5E5',
					100: '#FFB8B8',
					200: '#FF8A8A',
					300: '#FF5C5C',
					400: '#FF2E2E',
					500: '#FF0000',
					600: '#CC0000',
					700: '#990000',
					800: '#660000',
					900: '#330000',
				},

				yellow: {
					DEFAULT: '#FFC734',
					50: '#FFF8E5',
					100: '#FFEBB8',
					200: '#FFDF8A',
					300: '#FFD25C',
					400: '#FFC52E',
					500: '#FFB900',
					600: '#CC9400',
					700: '#996F00',
					800: '#664A00',
					900: '#332500',
				},
				orange: {
					DEFAULT: '#F89B49',
					50: '#FEF2E6',
					100: '#FCD9BA',
					200: '#FBC18E',
					300: '#F9A962',
					400: '#F79036',
					500: '#F67809',
					600: '#C46008',
					700: '#934806',
					800: '#623004',
					900: '#311802',
				},
				pink: {
					DEFAULT: '#EA0D80',
					50: '#FEE7F3',
					100: '#FBBBDD',
					200: '#F990C6',
					300: '#F664B0',
					400: '#F4399A',
					500: '#F20D84',
					600: '#C10B6A',
					700: '#91084F',
					800: '#610535',
					900: '#30031A',
				},
				purple: {
					DEFAULT: '#4b3d98',
					50: '#EEEDF8',
					100: '#D1CCEB',
					200: '#B3ABDD',
					300: '#958BD0',
					400: '#786AC3',
					500: '#5A49B6',
					600: '#483A92',
					700: '#362C6D',
					800: '#241D49',
					900: '#120F24',
				},
				blue: {
					DEFAULT: '#2b8fce',
					50: '#EAF4FB',
					100: '#C4E1F3',
					200: '#9ECDEB',
					300: '#78BAE3',
					400: '#52A6DB',
					500: '#2C92D3',
					600: '#2375A9',
					700: '#1A587F',
					800: '#123B54',
					900: '#091D2A',
				},
				gray: {
					50: '#F2F2F2',
					100: '#F6F6F6',
					200: '#DBDBDB',
					300: '#ADADAD',
					400: '#969696',
					500: '#808080',
					600: '#666666',
					700: '#4D4D4D',
					800: '#333333',
					900: '#1A1A1A',
				},
				red: {
					DEFAULT: '#EB1B3C',
					50: '#FDE8EB',
					100: '#F9BDC7',
					200: '#F693A3',
					300: '#F2697F',
					400: '#EE3F5B',
					500: '#EA1536',
					600: '#BC102C',
					700: '#8D0C21',
					800: '#5E0816',
					900: '#2F040B',
				},
				green: {
					DEFAULT: '#6CBD42',
					50: '#F0F8EC',
					100: '#D6EDCA',
					200: '#BCE1A8',
					300: '#A1D586',
					400: '#87C964',
					500: '#6CBD42',
					600: '#579735',
					700: '#417227',
					800: '#2B4C1A',
					900: '#16260D',
				},
				limeGreen: {
					DEFAULT: '#BAD532',
					50: '#F8FBEA',
					100: '#EBF3C4',
					200: '#DEEB9E',
					300: '#D1E378',
					400: '#C5DB51',
					500: '#B8D42B',
					600: '#93A923',
					700: '#6E7F1A',
					800: '#4A5511',
					900: '#252A09',
				},
				teal: {
					DEFAULT: '2AB6A2',
					50: '#EAFAF8',
					100: '#C5F2EB',
					200: '#A0E9DF',
					300: '#7AE0D2',
					400: '#55D8C5',
					500: '#30CFB8',
					600: '#26A694',
					700: '#1D7C6F',
					800: '#13534A',
					900: '#0A2925',
				},
				cyan: {
					DEFAULT: '#70CFEC',
					50: '#E8F7FC',
					100: '#C0EAF7',
					200: '#97DCF1',
					300: '#6FCFEC',
					400: '#46C1E6',
					500: '#1EB3E1',
					600: '#1890B4',
					700: '#126C87',
					800: '#0C485A',
					900: '#06242D',
				},
			},
			backgroundColor: {
				primary: '#5A49B6',
				'primary-hover': '#483A92',
				secondary: '#2C92D3',
				'secondary-hover': '#2375A9',
				confirm: '#6CBD42',
				'confirm-hover': '#579735',
				danger: '#EB1B3C',
				'danger-hover': '#BC102C',
			},
			textColor: {
				light: lightText,
				dark: darkText,
			},
			fontFamily: {
				sans: ['inter', ...defaultTheme.fontFamily.sans],
			},
			letterSpacing: {
				normal: '-.025em',
			},
			maxWidth: {
				xs: '18rem',
			},
		},
	},

	darkMode: 'class',
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('tailwindcss-themer')({
			defaultTheme: {
				extend: {},
			},
			themes: [
				{
					name: 'light',
					extend: {
						backgroundColor: {
							'body-primary': '#F2F2F2',
							'body-secondary': '#DBDBDB',
						},
						textColor: {
							primary: '#1A1A1A',
							secondary: '#4D4D4D',
						},
					},
				},
				{
					name: 'dark',
					extend: {
						backgroundColor: {
							'body-primary': '#091D2A',
							'body-secondary': '#123B54',
						},
						textColor: {
							primary: '#F2F2F2',
							secondary: '#DBDBDB',
						},
					},
				},
				{
					name: 'dark-purple',
					extend: {
						backgroundColor: {
							'body-primary': '#120F24',
							'body-secondary': '#362C6D',
						},
						textColor: {
							primary: '#F2F2F2',
							secondary: '#DBDBDB',
						},
					},
				},
			],
		}),
	],
};
