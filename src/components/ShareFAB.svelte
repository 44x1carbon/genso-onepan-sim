<script lang="ts">
	import { onMount } from 'svelte';

	export let url: string = '';
	export let tweetBody: string = '';
	export let hashtags: string = '元素騎士,IGNISTOOLS';
	export let label: string = '便利だと思ったら<br>皆に共有しよう！';
	let tweetUrl = '';

	onMount(() => {
		url = url || location.href;
		tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURI(
			tweetBody + '\n\n↓ご利用はこちらから\n'
		)}&url=${url}&hashtags=${hashtags}`;
	});
</script>

<div class="fixed bottom-4 right-4 z-10 text-xs bg-gray-200 text-gray-900 p-2 rounded text-center">
	<div>{@html label}</div>
	<a
		target="_blank"
		href={tweetUrl}
		class="px-2 py-1 rounded text-white font-bold inline-block mt-2"
		style="background-color: #1D9BF0;"
	>
		<i class="fa-brands fa-twitter mr-1" />シェア
	</a>
</div>
