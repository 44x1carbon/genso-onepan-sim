<script lang="ts">
	import jquery from 'jquery';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getAnalytics, logEvent } from 'firebase/analytics';
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	import 'shepherd.js/dist/css/shepherd.css';
	import setupFirebaseApp from '$lib/Firebase';
	import { modalStore, modalDataStore, updateModal } from '$lib/ModalStore';
	import Ad from '$components/Ad.svelte';

	let nav: { label: string; href: string }[] = [
		{ label: 'ダメージ<br>計算', href: '/' },
		{ label: '時給<br>計算', href: '/hourly' },
		{ label: 'PT募集<br>掲示板', href: '/wantedparty' },
		{ label: 'スキル<br>シミュ', href: '/skill' },
		{ label: '自己紹介<br>カード', href: '/profilecard' },
		{ label: 'フレンド<br>機能', href: '/friend' },
		{ label: '元素騎士<br>占い', href: '/fortune' }
	];

	onMount(() => {
		try {
			const app = setupFirebaseApp();
			const analytics = getAnalytics(app);

			jquery(document).on('click', 'button,a', (e) => {
				const title = jquery(document)
					.attr('title')
					.replace('IGNIS TOOLS - ', '')
					.replace('(α版)', '');
				logEvent(analytics, 'custom_click', {
					page: title,
					text: jquery(e.currentTarget).text(),
					routeId: $page['route'].id
				});
			});
		} catch {}

		setTimeout(() => {
			console.log('ads');
			// @ts-ignore
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		}, 100);
	});
</script>

<svelte:head>
	<!-- <script src="https://kit.fontawesome.com/6816b11656.js" crossorigin="anonymous"></script>
	<link
		rel="stylesheet"
		href="https://kit.fontawesome.com/6816b11656.css"
		crossorigin="anonymous"
	/> -->
</svelte:head>

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
		{#each nav as { label, href }}
			<div
				class="border border-mai-tai-900 p-2 py-1 text-xs font-bold"
				class:bg-mai-tai-400={($page['route'].id?.startsWith(href) && href !== '/') ||
					$page['route'].id === href}
				class:text-black={($page['route'].id?.startsWith(href) && href !== '/') ||
					$page['route'].id === href}
			>
				<a {href} class="flex items-center justify-center leading-tight text-center"
					>{@html label}</a
				>
			</div>
		{/each}
	</div>
</header>

<main class="bg-gray-900 min-h-screen border-box p-4 pb-96">
	<Ad device="pc">
		<ins
			class="adsbygoogle mx-auto"
			style="display:inline-block;width:728px;height:90px"
			data-ad-client="ca-pub-9799169908631652"
			data-ad-slot="2878476408"
		/>
	</Ad>
	<Ad device="sp" _class="mb-4 px-2">
		<ins
			class="adsbygoogle"
			style="display:inline-block;width:390px;height:90px"
			data-ad-client="ca-pub-9799169908631652"
			data-ad-slot="9873197961"
		/>
	</Ad>

	<div class="flex max-w-screen">
		<div class="min-[1919px]:block min-[1919px]:px-2 hidden min-[1919px]:w-96">
			<Ad device="pc">
				<ins
					class="adsbygoogle"
					style="display:block"
					data-ad-client="ca-pub-9799169908631652"
					data-ad-slot="4060266953"
					data-ad-format="auto"
					data-full-width-responsive="true"
				/>
			</Ad>
		</div>
		<div class="md:w-[74rem] mx-auto">
			<slot />
		</div>
		<div class="min-[1919px]:block min-[1919px]:px-2 hidden min-[1919px]:w-96">
			<Ad device="pc">
				<ins
					class="adsbygoogle"
					style="display:block"
					data-ad-client="ca-pub-9799169908631652"
					data-ad-slot="7607795570"
					data-ad-format="auto"
					data-full-width-responsive="true"
				/>
			</Ad>
		</div>
	</div>

	<Ad device="pc">
		<ins
			class="adsbygoogle"
			style="display:block"
			data-ad-format="autorelaxed"
			data-ad-client="ca-pub-9799169908631652"
			data-ad-slot="6560638916"
		/>
	</Ad>
	<Ad device="sp" _class="mt-4 px-2">
		<ins
			class="adsbygoogle"
			style="display:block"
			data-ad-client="ca-pub-9799169908631652"
			data-ad-slot="2176602974"
			data-ad-format="auto"
			data-full-width-responsive="true"
		/>
	</Ad>
</main>

<footer
	class="bg-chocolate-900 px-4 py-1 fixed w-full bottom-0 text-white panel leading-tight"
	style="font-size:11px"
>
	<div>
		■
		ファンクラブを開設しました、応援していただける方は加入していただけると開発のモチベーションがUPします！<br
		/>
		<a href="https://fanclove.jp/club/IGNIS-TOOLS" class="underline text-blue-300"
			>https://fanclove.jp/club/IGNIS-TOOLS</a
		>
	</div>
	<div class="mt-2">
		■ IGNISへの入団希望の方はTwitterのIGNIS公式アカウントにDMをお送りください！<br />
		<a href="https://twitter.com/IGNISgenso" class="underline text-blue-300">@IGNISgenso</a>
	</div>
	<div class=" mt-2">
		<div>■ 不具合などありましたら下記のTwitterでDMを下さい。</div>
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

	:global(input[type='text'], input[type='number'], input[type='datetime-local']) {
		@apply border indent-1 w-full bg-gray-200 text-gray-900 border-gray-900 rounded-sm;
	}

	:global(select) {
		@apply bg-gray-200 border text-gray-900 rounded-sm;
	}

	:global(textarea) {
		@apply bg-gray-200 border text-gray-900 resize-none rounded-sm;
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
		@apply border-well-read-900 border;
	}

	:global(.btn) {
		@apply border rounded p-1 bg-mai-tai-400 border-mai-tai-900 text-black font-bold block;
	}

	:global(a.btn) {
		@apply flex;
	}

	:global(.btn.normal) {
		@apply bg-gray-200 border-gray-900 text-gray-900 border;
	}

	:global(.heading2) {
		@apply bg-mai-tai-700 text-white px-2 text-sm  py-1;
	}

	:global(.selected) {
		@apply bg-mai-tai-500 border-mai-tai-700 text-black font-bold;
	}
</style>
