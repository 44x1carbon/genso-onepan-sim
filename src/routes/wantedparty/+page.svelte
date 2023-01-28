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
	import type { WantedParty } from '$lib/wantedparty/WantedParty';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/ja';
	import WanterdPartyInfoOgp from '../../components/wantedparty/WanterdPartyInfoOGP.svelte';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Asia/Tokyo');
	dayjs.locale('ja');

	let firestore: any = undefined;

	onMount(() => {
		firestore = useFirestore();

		firestore
			.searchWantedDataList({
				timeFrom: dayjs().subtract(120, 'm').format('YYYY-MM-DDTHH:mm')
			})
			.then((wantedPartyList: WantedParty[]) => {
				wantedPartyListStore.update(() => {
					return wantedPartyList;
				});
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
			<WanterdPartyInfoOgp {wantedParty} />
		</div>
	{/each}

	{#if $wantedPartyListStore.length === 0}
		<div class="panel border border-well-read-700 p-2 w-full">募集中のPTが見つかりませんでした</div>
	{/if}
</div>
