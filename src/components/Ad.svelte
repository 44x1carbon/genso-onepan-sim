<script lang="ts">
	import { onMount } from 'svelte';

	export let device: 'pc' | 'sp' = 'pc';
	export let _class: string = '';

	onMount(() => {
		try {
			// @ts-ignore
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (e) {
			console.error(e);
		}
	});
</script>

<div
	class={device === 'pc' ? 'md:block hidden md:mt-4 text-center ' + _class : 'md:hidden ' + _class}
>
	<slot />
</div>
