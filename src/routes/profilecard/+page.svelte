<script lang="ts">
	import { StatusCanvas } from '$lib/profilecard/StatusCanvas';
	import type { StatusProfileData } from '$lib/profilecard/ProfileData';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';
	import { onMount } from 'svelte';
	import StatusProfileForm from '../../components/profilecard/StatusProfileForm.svelte';
	import FriendProfileForm from '../../components/profilecard/FriendProfileForm.svelte';

	const SAVE_KEY = 'GENSO-PROFILECARD';

	let templateList = [
		{
			label: 'ステータスカード',
			img: '/template1.png',
			form: StatusProfileForm
		},
		{
			label: 'フレンド募集カード',
			img: '/template2.png',
			form: FriendProfileForm
		}
	];
	$: form = templateList.find(({ img }) => img === template)?.form;

	let backgroundList = [
		{
			label: '通常背景',
			img: '/normal-card1.png'
		},
		{
			label: 'プヨン背景',
			img: '/normal-card2.png'
		}
	];

	let template: string = templateList[1].img;
	let background: string = backgroundList[0].img;
	let originalBackgroundImageUrl: string = '';

	function selectOriginalBackgroundImage(e: Event) {
		const target = e.target as HTMLInputElement;
		const fReaderForURI = new FileReader();
		fReaderForURI.readAsDataURL(target.files[0]);
		fReaderForURI.onload = () => {
			// 生成した DataURI を img 要素に渡し、それに対して Cropper を用意します
			originalBackgroundImageUrl = String(fReaderForURI.result);
			background = originalBackgroundImageUrl;
		};
	}

	let isInit = false;
	onMount(() => {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.has('card')) {
			const cards: { [key: string]: { label: string; img: string } } = {
				ignis: {
					label: 'イグニス専用',
					img: '/ignis-card.png'
				}
			};

			backgroundList = [cards[searchParams.get('card') ?? ''], ...backgroundList];
			background = cards[searchParams.get('card') ?? ''].img;
		}
	});
</script>

<svelte:head>
	<title>IGNIS TOOLS - 自己紹介カード(α版)</title>
	<meta name="description" content="元素騎士オンラインの自己紹介カードを作成できるツールです。" />
	<meta name="keywords" content="元素騎士オンライン,元素騎士,自己紹介カード" />
</svelte:head>

<div>
	<div class="heading">盤面を選ぼう！！</div>
	<div class="panel flex gap-2 mb-4 p-2 md:flex-row flex-col">
		{#each templateList as t, i}
			<div class="p-2 bg-black bg-opacity-70">
				<label class="text-sm">
					<input
						type="radio"
						name="template"
						class="mr-1"
						checked={i === 0}
						bind:group={template}
						value={t.img}
					/>{t.label}
					<img src={t.img} alt="" />
				</label>
			</div>
		{/each}
	</div>
</div>

<div>
	<div class="heading">背景を選ぼう！！</div>
	<div class="panel flex gap-2 mb-4 p-2 md:flex-row flex-col">
		{#each backgroundList as b, i}
			<div class="p-2 bg-black bg-opacity-70">
				<label class="text-sm">
					<input
						type="radio"
						name="background"
						class="mr-1"
						checked={i === 0}
						bind:group={background}
						value={b.img}
					/>{b.label}
					<img src={b.img} alt="" />
				</label>
			</div>
		{/each}
		<div class="p-2 bg-black bg-opacity-70">
			<label class="text-sm">
				<input
					type="radio"
					name="background"
					class="mr-1"
					bind:group={background}
					value={originalBackgroundImageUrl}
				/>オリジナル背景
				{#if originalBackgroundImageUrl}
					<img src={originalBackgroundImageUrl} alt="" />
				{/if}
				<input type="file" class="text-xs" on:change={selectOriginalBackgroundImage} />
				<div style="font-size:10px">※オリジナルの背景を設定する場合に設定してください。</div>
				<div style="font-size:10px">※サイズは1280px×720px</div>
			</label>
		</div>
	</div>
</div>

<svelte:component this={form} backgroundImg={background} />

<style>
	:global(.equipment-autocomplete) {
		min-width: 100px !important;
		width: 160px !important;
	}

	:global(.weekday input[type='checkbox']) {
		display: none;
	}

	:global(.weekday label) {
		@apply w-6 h-6 bg-gray-200 text-gray-400 font-bold;
		border-radius: 5px;
	}

	:global(.weekday input:checked + label) {
		@apply bg-gray-500 text-gray-100;
	}
</style>
