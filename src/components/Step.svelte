<script lang="ts">
	import { onMount } from 'svelte/internal';

	export let step: number = 0;
	export let maxStep: number = 0;
	let container: HTMLDivElement | undefined = undefined;

	onMount(() => {
		if (container !== undefined) {
			Array.from(container.children as HTMLCollectionOf<HTMLElement>).forEach((elem, i) => {
				if (i === step) {
					elem.style.display = 'block';
				} else {
					elem.style.display = 'none';
				}
			});

			maxStep = Array.from(container.children as HTMLCollectionOf<HTMLElement>).length;
		}
	});

	$: {
		if (container !== undefined) {
			Array.from(container.children as HTMLCollectionOf<HTMLElement>).forEach((elem, i) => {
				if (i === step) {
					elem.style.display = 'block';
				} else {
					elem.style.display = 'none';
				}
			});
		}
	}
</script>

<div bind:this={container} class="step-container">
	<slot />
</div>

<style>
	:global(.step-container > *) {
		display: none;
	}
</style>
