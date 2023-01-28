<script lang="ts">
	import useFirestore from '$lib/wantedparty/Firestore';
	import type { UserInfo } from '$lib/wantedparty/UserInfo';
	import type { WantedParty } from '$lib/wantedparty/WantedParty';
	import { getContext, onMount } from 'svelte';
	import WantedPartyInfoCard from '../../../components/wantedparty/WantedPartyInfo.svelte';

	let firestore: any = undefined;
	let wantedPartyList: WantedParty[] = [];
	let userInfo: UserInfo = getContext('userInfo');

	onMount(async () => {
		firestore = useFirestore();

		wantedPartyList = await firestore.ownWantedDataList(userInfo);
	});
</script>

<div class="flex flex-wrap gap-4 md:w-[74rem] md:mx-auto">
	{#each wantedPartyList as wantedParty}
		<div class="w-full md:w-1/4">
			<WantedPartyInfoCard {wantedParty} />
		</div>
	{/each}

	{#if wantedPartyList.length === 0}
		<div class="panel border border-well-read-700 p-2">現在募集中のPTはありません</div>
	{/if}
</div>
