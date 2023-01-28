<script lang="ts">
	import { USERINFO_SAVE_KEY } from '$lib/wantedparty/SaveKeys';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { WantedPartyDetails } from '$lib/wantedparty/WantedPartyDetails';
	import type { UserInfo } from '$lib/wantedparty/UserInfo';
	import WantedPartyInfoCard from '../../components/wantedparty/WantedPartyInfo.svelte';
	import useFirestore from '$lib/wantedparty/Firestore';
	import SearchForm from '../../components/wantedparty/SearchForm.svelte';
	import { wantedPartyListStore } from '$lib/wantedparty/Store';

	let firestore: any = undefined;

	onMount(async () => {
		const json = localStorage.getItem(USERINFO_SAVE_KEY);

		if (json === null) {
			goto('/wantedparty/user');
		}

		firestore = useFirestore();

		const wantedPartyList = await firestore.searchWantedDataList();
		wantedPartyListStore.update(() => {
			return wantedPartyList;
		});
	});
</script>

<div class="md:w-[74rem] md:mx-auto mb-4">
	<SearchForm />
</div>

<div class="flex flex-wrap gap-4 gap-y-8 md:w-[74rem] md:mx-auto">
	{#each $wantedPartyListStore as wantedParty}
		<div class="w-full md:w-[24rem]">
			<WantedPartyInfoCard {wantedParty} />
		</div>
	{/each}
</div>
