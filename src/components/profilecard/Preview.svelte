<script lang="ts">
	import { onMount } from 'svelte';

	export let backgroundImage: string = '';
	export let preview: () => void;

	function clickPreview() {
		isPreviewStart = true;
		const img = document.getElementById('preview-img') as HTMLImageElement;
		img.removeAttribute('src');
		preview();

		isPreview = true;
	}

	let isPreview = false;
	let isPreviewStart = false;
</script>

<div class="md:w-[48rem] mx-auto mt-4 w-full">
	<div
		id="container"
		class="opacity-0 absolute top-0 -z-10"
		style="width: 1280px; height: 720px;"
	/>

	<img
		id="preview-img"
		class:hidden={!isPreviewStart}
		class="w-full  bg-white"
		style="background-image: url('https://www.benricho.org/loading_images/img-size/loading-l-5.gif'); aspect-ratio: 16 / 9; background-repeat: no-repeat; background-position: center;"
	/>

	{#if isPreview}
		<div class="bg-black text-center text-xs p-1">
			画像を保存して<br />「#元素騎士自己紹介カード」をつけてツイートしよう！！
		</div>
	{/if}
</div>
<button class="btn w-full mt-4" on:click={clickPreview}>プレビューを表示する</button>
