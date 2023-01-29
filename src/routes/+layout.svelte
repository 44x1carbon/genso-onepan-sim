<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getAnalytics } from 'firebase/analytics';
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	import 'shepherd.js/dist/css/shepherd.css';
	import setupFirebaseApp from '$lib/Firebase';
	import { modalStore, modalDataStore, updateModal } from '$lib/ModalStore';

	

	onMount(() => {
		const app = setupFirebaseApp();
		const analytics = getAnalytics(app);		
	});
</script>

<header class="block border-box text-white header">
	<div class="p-2 flex items-center">
		<a href="https://twitter.com/IGNISgenso">
			<img src="/logo.png" class="block w-16" />
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
		<div
			class="border border-mai-tai-900 p-2 py-1"
			class:bg-mai-tai-400={$page['route'].id?.startsWith('/wantedparty')}
			class:text-black={$page['route'].id?.startsWith('/wantedparty')}
		>
			<a href="/wantedparty">PT募集掲示板</a>
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

{#if $modalStore !== undefined}
	<div
		class="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-70 flex items-center justify-center"
	>
		<svelte:component this={$modalStore} data={$modalDataStore} />
	</div>
{/if}

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

	:global(.heading.gray) {
		@apply text-white font-bold p-1 px-2 bg-black border border-gray-700 border-b-0;
		background-image: none;
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

	:global(.form-controll.space) {
		@apply px-4 py-2;
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

	:global(.heading2) {
		@apply bg-mai-tai-700 text-white px-2 text-sm  py-1;
	}

	:global(.selected) {
		@apply bg-mai-tai-500 border-mai-tai-700 text-black font-bold;
	}
</style>
