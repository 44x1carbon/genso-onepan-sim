<script lang="ts">
	import { getUserInfo, type UserInfo } from '$lib/wantedparty/UserInfo';
	import { getCanApply, getCanApplyJobs, type WantedParty } from '$lib/wantedparty/WantedParty';
	import type { WantedPartyDetails } from '$lib/wantedparty/WantedPartyDetails';
	import type { Timestamp } from 'firebase/firestore';
	import { getContext, onMount } from 'svelte';
	import useStore from '$lib/wantedparty/Firestore';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/ja';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Asia/Tokyo');
	dayjs.locale('ja');

	export let wantedParty: WantedParty;

	let userInfo: UserInfo = getUserInfo();
	let joinJob: string = '';
	let firestore: any | undefined = undefined;

	$: canApplyJobs = getCanApplyJobs(wantedParty, userInfo);

	$: canApply = getCanApply(wantedParty, userInfo);

	$: alreadyJoin = wantedParty.members.some((member) => member.id === userInfo?.id);

	onMount(() => {
		firestore = useStore();
		userInfo = getUserInfo() as UserInfo;
	});

	function formatDate(timestamp: Timestamp, minute: number) {
		const start = dayjs(timestamp.toDate());
		return `${start.format('YYYY/MM/DD HH:mm')}~${start
			.add(minute, 'm')
			.format('H:mm')}(${minute}分)`;
	}

	async function join() {
		if (joinJob === '') {
			alert('使用する職業を選んでください');
			return;
		}

		if (await firestore.joinWantedPrty(wantedParty, userInfo, joinJob)) {
			alert('参加できました');
		} else if (alreadyJoin) {
			alert('既に参加済みです');
		} else {
			alert('参加できませんでした。既に満員の可能性があります');
		}
	}
</script>

<div class="">
	<div class="heading">
		<div class="text-xs opacity-60">ID:{wantedParty.id}</div>
		<div>
			【{wantedParty.details.purpose}】
			{#if wantedParty.details.purpose === 'ブック解放'}
				No.{wantedParty.details.bookNums}
			{:else}
				{wantedParty.details.map}
			{/if}
		</div>
	</div>

	<div class="panel border-well-read-700 border">
		<div class="form-row">
			<div class="form-label xs w-16">期間</div>
			<div class="form-control px-4 py-1 flex text-sm items-center">
				{formatDate(wantedParty.details.time.from, wantedParty.details.time.to)}
			</div>
		</div>

		{#if wantedParty.details.targetMonster}
			<div class="form-row">
				<div class="form-label xs w-16">対象</div>
				<div class="form-control px-4 py-1 flex">
					{wantedParty.details.targetMonster}
				</div>
			</div>
		{/if}

		<div class="heading2">募集要項</div>
		<div class="form-row">
			<div class="form-label xs w-16">メンバー</div>
			<div class="form-control px-4 py-1 flex text-sm items-center">
				<ul class="list-disc pl-4">
					{#each wantedParty.details.wantedJobs as wantedJobs, i}
						{#if wantedJobs.job !== ''}
							<li>{wantedJobs.job} {wantedJobs.num}人</li>
						{:else if wantedJobs.num !== 0}
							<li>職業自由 {wantedJobs.num}人</li>
						{/if}
					{/each}
				</ul>
			</div>
		</div>
		<div class="form-row">
			<div class="form-label xs w-16">レベル</div>
			<div class="form-control px-4 py-1 flex text-sm items-center">
				Lv.{wantedParty.details.condition.level.from} ~ Lv.{wantedParty.details.condition.level.to}
			</div>
		</div>
		<div class="form-row">
			<div class="form-label xs w-16">備考</div>
			<div class="form-control px-4 py-1 flex text-sm items-center">
				{@html wantedParty.details.condition.memo.replaceAll('\n', '<br>')}
			</div>
		</div>

		<div class="heading2">集合場所</div>
		<div class="form-row">
			<div class="form-label xs w-16">場所</div>
			<div class="form-control px-2 py-1 flex text-sm items-center gap-2">
				<div>{wantedParty.details.meetPlace.region}</div>
				<div>{wantedParty.details.meetPlace.map}{wantedParty.details.meetPlace.channel}</div>
				<div>{wantedParty.details.meetPlace.point}</div>
			</div>
		</div>
		<div class="form-row">
			<div class="form-label xs w-16">募集主</div>
			<div class="form-control px-2 py-1 flex text-sm items-center gap-2">
				{wantedParty.owner.name}
			</div>
		</div>

		<div class="heading2">参加メンバー</div>
		<div class=" p-2 text-sm">
			<ul class="list-disc pl-6">
				{#each wantedParty.members as member}
					<li>
						{member.name}
						{member.joinJob} Lv.{member.jobs.find(({ name }) => name === member.joinJob)?.level}
					</li>
				{/each}
			</ul>
			{#if wantedParty.members.length === 0}
				まだ参加者はいません
			{/if}
		</div>

		<div class="p-2 bg-chocolate-900">
			{#if canApply}
				<select class="w-full mb-2 rounded-sm" bind:value={joinJob}>
					<option value="">使用する職業を選んでください</option>
					{#each canApplyJobs as job}
						<option value={job.name}>{job.name}</option>
					{/each}
				</select>
				<button class="btn w-full" on:click={join}>参加する</button>
			{:else if userInfo?.id === wantedParty.owner.id}
				<div class="bg-gray-700 p-1 rounded-sm text-sm">自分の募集の為参加できません</div>
			{:else if alreadyJoin}
				<div class="bg-gray-700 p-1 rounded-sm text-sm">既に参加しています</div>
			{:else}
				<div class="bg-gray-700 p-1 rounded-sm text-sm">
					あなたが参加できる条件に空きがありません
				</div>
			{/if}
		</div>
	</div>
</div>
