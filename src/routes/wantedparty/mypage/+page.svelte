<script lang="ts">
	import useFirestore from '$lib/wantedparty/Firestore';
	import { getUserInfo, type UserInfo } from '$lib/wantedparty/UserInfo';
	import type { WantedParty } from '$lib/wantedparty/WantedParty';
	import { getContext, onMount } from 'svelte';
	import WantedPartyInfoCard from '../../../components/wantedparty/WantedPartyInfo.svelte';

	let firestore: any = undefined;
	let ownWantedDataList: WantedParty[] = [];
	let joinWantedDataList: WantedParty[] = [];

	onMount(async () => {
		firestore = useFirestore();

		ownWantedDataList = await firestore.ownWantedDataList(getUserInfo());
		joinWantedDataList = await firestore.joinWantedDataList(getUserInfo());
	});
</script>

<div class="flex flex-wrap gap-4 md:w-[74rem] md:mx-auto">
	<div class="w-full bg-well-read-700 text-white p-2 font-bold">募集中のPT</div>
	{#each ownWantedDataList as wantedParty}
		<div class="w-full md:w-[24rem]">
			<WantedPartyInfoCard {wantedParty} />
		</div>
	{/each}

	{#if ownWantedDataList.length === 0}
		<div class="panel border border-well-read-700 p-2 w-full">現在募集中のPTはありません</div>
	{/if}
</div>

<div class="flex flex-wrap gap-4 md:w-[74rem] md:mx-auto mt-4">
	<div class="w-full bg-well-read-700 text-white p-2 font-bold">参加予定のPT</div>
	{#each joinWantedDataList as wantedParty}
		<div class="w-full md:w-[24rem]">
			<WantedPartyInfoCard {wantedParty} />
		</div>
	{/each}

	{#if joinWantedDataList.length === 0}
		<div class="panel border border-well-read-700 p-2 w-full">現在参加予定のPTはありません</div>
	{/if}
</div>
