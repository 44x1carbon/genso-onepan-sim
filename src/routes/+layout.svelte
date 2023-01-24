<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	// Import the functions you need from the SDKs you need
	import { initializeApp } from 'firebase/app';
	import { getAnalytics } from 'firebase/analytics';
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	onMount(() => {
		// Your web app's Firebase configuration
		// For Firebase JS SDK v7.20.0 and later, measurementId is optional
		const firebaseConfig = {
			apiKey: 'AIzaSyDJiJ7iOX4zQ6l4wH89G1R-vQu5xZ6KAHE',
			authDomain: 'genso-tools.firebaseapp.com',
			projectId: 'genso-tools',
			storageBucket: 'genso-tools.appspot.com',
			messagingSenderId: '1021494508287',
			appId: '1:1021494508287:web:283adc5a6e81ea4a54eaca',
			measurementId: 'G-2YTL0DQ3WQ'
		};

		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const analytics = getAnalytics(app);
	});
</script>

<header class="block border-box text-white header">
	<div class="p-2 flex items-center">
		<a href="https://twitter.com/IGNISgenso">
			<img src="logo.png" class="block w-16" />
		</a>
		<div class="ml-4 ">
			<div class="font-bold text-2xl">IGNIS TOOLS</div>
			<div class="text-xs leading-tight text-well-read-100">
				IGNISに所属するヨンヨンが開発した<br />元素騎士オンライン便利ツールの置き場
			</div>
		</div>
	</div>
	<div class="flex text-sm bg-mai-tai-700 w-full">
		<div
			class="border border-mai-tai-900 p-2 py-1"
			class:bg-mai-tai-400={$page['route'].id === '/'}
			class:text-black={$page['route'].id === '/'}
		>
			<a href="/">ダメージ計算機</a>
		</div>
		<div
			class="border border-mai-tai-900 p-2 py-1"
			class:bg-mai-tai-400={$page['route'].id === '/hourly'}
			class:text-black={$page['route'].id === '/hourly'}
		>
			<a href="/hourly">時給計算機</a>
		</div>
	</div>
</header>

<main class="bg-gray-900 min-h-screen border-box p-4 pb-24">
	<slot />
	<div class="border-2 rounded mx-auto p-2 my-2 border-gray-900 bg-gray-700  md:w-[74rem]">
		後々これらのツールを有料化する予定です。1ツール月額100円ぐらいで考えています。
	</div>
</main>

<footer class="bg-chocolate-900 p-4 fixed w-full bottom-0 text-white text-xs panel">
	<div class="leading-relaxed">
		<div>不具合などありましたら下記のTwitterでDMを下さい。</div>
		<div>
			開発者: <a href="https://twitter.com/44genso" class="underline text-blue-300">@44genso</a>
		</div>
	</div>
</footer>

<style global>
	@tailwind utilities;
	@tailwind components;
	@tailwind base;

	.header {
		background-size: auto auto;
		background-color: rgba(166, 45, 45, 1);
		background-image: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 5px,
			rgba(127, 35, 35, 1) 5px,
			rgba(127, 35, 35, 1) 10px
		);
	}

	:global(body) {
		@apply text-white;
	}

	:global(.heading) {
		@apply text-white font-bold p-1 px-2;
		background-size: auto auto;
		background-color: rgba(166, 45, 45, 1);
		background-image: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 5px,
			rgba(127, 35, 35, 1) 5px,
			rgba(127, 35, 35, 1) 10px
		);
	}

	:global(.form-label) {
		@apply bg-well-read-700 text-white font-bold p-1 px-2 text-sm flex items-center;
	}

	:global(.form-label.tc) {
		@apply table-cell;
	}

	:global(.form-label.g-px-0) {
		@apply px-0;
	}

	:global(.form-label.xs) {
		@apply text-xs;
	}

	:global(.form-controll) {
		@apply p-1 flex;
	}

	:global(.form-row) {
		@apply border -mt-px flex border border-l-0 border-r-0 border-well-read-900;
	}

	:global(input) {
		@apply border indent-1 w-full bg-gray-200 text-gray-900 border-gray-900;
	}

	:global(select) {
		@apply bg-gray-200 border text-gray-900;
	}

	:global(.panel) {
		background-size: auto auto;
		background-color: rgba(64, 1, 1, 1);
		background-image: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 5px,
			rgba(51, 1, 1, 1) 5px,
			rgba(51, 1, 1, 1) 10px
		);
	}

	:global(.btn) {
		@apply border rounded p-1 bg-mai-tai-400 border-mai-tai-900 text-black font-bold block;
	}
</style>
