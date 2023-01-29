<script lang="ts">
	import WantedPartyInfo from '../../../components/wantedparty/WantedPartyInfo.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<meta property="og:title" content="元素騎士 PT募集掲示板" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://ignis-tools.vercel.app/wantedparty/${data.id}`} />
	<meta
		property="og:image"
		content={`https://ignis-tools.vercel.app/wantedparty/image?id=${data.id}`}
	/>
	<meta property="og:site_name" content="元素騎士 PT募集掲示板" />
	<meta property="og:description" content="元素騎士オンラインのPT募集掲示板です。" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@44genso" />
	<meta name="twitter:player" content="@44genso" />
</svelte:head>

<div class="md:w-[74rem] md:mx-auto">
	<WantedPartyInfo wantedParty={data.wantedParty} />
</div>
