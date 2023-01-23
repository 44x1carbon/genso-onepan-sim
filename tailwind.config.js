export default {
	plugins: [],
	theme: {
		extend: {
			colors: {
				'well-read': {
					50: '#fdf3f3',
					100: '#fbe5e5',
					200: '#f8d0d0',
					300: '#f2afaf',
					400: '#e98080',
					500: '#dc5757',
					600: '#c83a3a',
					700: '#a62d2d',
					800: '#8b2929',
					900: '#742828'
				},
				chocolate: {
					50: '#ffefef',
					100: '#ffdada',
					200: '#ffbcbc',
					300: '#ff8d8d',
					400: '#ff4c4c',
					500: '#ff1616',
					600: '#ff0000',
					700: '#e40000',
					800: '#bb0000',
					900: '#400101'
				},
				monza: {
					50: '#fff0f0',
					100: '#ffdede',
					200: '#ffc2c2',
					300: '#ff9898',
					400: '#ff5c5c',
					500: '#ff2a2a',
					600: '#f80a0a',
					700: '#d90404',
					800: '#ac0808',
					900: '#8e0e0e'
				},
				'mai-tai': {
					50: '#fffde7',
					100: '#fffec1',
					200: '#fff987',
					300: '#ffee42',
					400: '#ffde0f',
					500: '#f0c402',
					600: '#cf9800',
					700: '#a66d03',
					800: '#88540b',
					900: '#734510'
				}
			}
		}
	},
	purge: ['./index.html', './src/**/*.{svelte,js,ts}'], // for unused CSS
	variants: {
		extend: {}
	},
	darkMode: false // or 'media' or 'class'
};
