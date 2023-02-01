<script lang="ts">
	import useFirestore from '$lib/wantedparty/Firestore';
	import { getUserInfo, type UserInfo } from '$lib/wantedparty/UserInfo';
	import type { WantedParty } from '$lib/wantedparty/WantedParty';
	import { getContext, onMount } from 'svelte';
	import WantedPartyInfoCard from '../../../components/wantedparty/WantedPartyInfo.svelte';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/ja';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Asia/Tokyo');
	dayjs.locale('ja');

	let firestore: any = undefined;
	let ownWantedDataList: WantedParty[] = [];
	let joinWantedDataList: WantedParty[] = [];

	onMount(async () => {
		firestore = useFirestore();

		ownWantedDataList = await firestore.ownWantedDataList(getUserInfo());
		joinWantedDataList = await firestore.joinWantedDataList(getUserInfo());
	});

	async function deleteWantedParty(wantedParty: WantedParty) {
		if (confirm(`パーティー募集を削除しても良いですか？`)) {
			await firestore.deleteWantedParty(wantedParty);
			ownWantedDataList = await firestore.ownWantedDataList(getUserInfo());
		}
	}

	function makeTweetUrl(wantedParty: WantedParty) {
		return `https://twitter.com/intent/tweet?text=${encodeURI(
			`
【PT募集中】
${wantedParty.details.purpose} ${
				wantedParty.details.purpose === 'ブック解放'
					? 'No.' + wantedParty.details.bookNums
					: wantedParty.details.map
			}${wantedParty.details.targetMonster ? '\n' + wantedParty.details.targetMonster : ''}

時間
${dayjs(wantedParty.details.time.from.toDate()).tz().format('YYYY/MM/DD HH:mm')}~${dayjs(
				wantedParty.details.time.from.toDate()
			)
				.tz()
				.add(wantedParty.details.time.to, 'm')
				.format(' HH:mm')}(${wantedParty.details.time.to}分)

募集メンバー
Lv.${wantedParty.details.condition.level.from}~${wantedParty.details.condition.level.to}
${wantedParty.details.wantedJobs
	.map((wantedJob, i) =>
		`
	${
		wantedJob.job !== ''
			? `・${wantedJob.job} ${wantedJob.num}人`
			: i === 0
			? `・職業自由 ${wantedJob.num}人`
			: ''
	}	
`.trim()
	)
	.filter((t) => t)
	.join('\n')}

↓PTへの参加はこちらから\n`.trimStart()
		)}&url=https://ignis-tools.vercel.app/wantedparty/${wantedParty.id}&hashtags=元素騎士,PT募集`;
	}
</script>

<div class="flex flex-wrap gap-4 md:w-[74rem] md:mx-auto">
	<div class="w-full bg-well-read-700 text-white p-2 font-bold">募集中のPT</div>
	{#each ownWantedDataList as wantedParty}
		<div class="w-full md:w-[24rem]">
			<div class="p-2 bg-gray-700 rounded-sm">
				<WantedPartyInfoCard {wantedParty} />
				<a
					href={makeTweetUrl(wantedParty)}
					class="border p-1 rounded bg-blue-500 border-blue-900 w-full block text-center mt-4"
					target="_blank">TwitterでPT募集を宣伝する</a
				>
				<button class="btn w-full mt-2" on:click={() => deleteWantedParty(wantedParty)}>削除</button
				>
			</div>
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
			<div class="p-2 bg-gray-700 rounded-sm">
				<WantedPartyInfoCard {wantedParty} />
			</div>
		</div>
	{/each}

	{#if joinWantedDataList.length === 0}
		<div class="panel border border-well-read-700 p-2 w-full">現在参加予定のPTはありません</div>
	{/if}
</div>
