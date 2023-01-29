<script lang="ts">
	import MapData from '../../MapData';
	import MonsterData from '../../MonsterData';
	import JobData from '../../JobData';
	import type { WantedPartyDetails } from '$lib/wantedparty/WantedPartyDetails';
	import { onMount } from 'svelte';
	import useFirestore from '$lib/wantedparty/Firestore';
	import { USERINFO_SAVE_KEY } from '$lib/wantedparty/SaveKeys';
	import { goto } from '$app/navigation';
	import TweetModal from './TweetModal.svelte';

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/ja';
	import { updateModal } from '$lib/ModalStore';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Asia/Tokyo');
	dayjs.locale('ja');

	$: _MonsterData = wantedData.map ? MonsterData.filter((m) => m.area === wantedData.map) : [];

	let firestore: any = undefined;

	let wantedData: WantedPartyDetails = {
		purpose: 'タワー攻略',
		map: '',
		targetMonster: '',
		bookNums: '',
		time: {
			from: dayjs().tz().format('YYYY-MM-DDTHH:mm'),
			to: 60
		},
		wantedNum: 3,
		wantedJobs: [
			{
				job: '',
				num: 3
			},
			{
				job: '',
				num: 0
			},
			{
				job: '',
				num: 0
			}
		],
		meetPlace: {
			region: 'リージョン1',
			map: 'エルロンド城下町',
			point: '',
			channel: 1
		},
		condition: {
			level: {
				from: 1,
				to: 30
			},
			memo: ''
		}
	};

	async function registerWantedData() {
		if (wantedData.purpose === 'ブック解放') {
			if (wantedData.bookNums === '') {
				alert('ブックNoを入力して下さい。');
				return;
			}
		} else if (['レベル上げ', '金策'].includes(wantedData.purpose)) {
			if (wantedData.map === '') {
				alert('目的マップを入力して下さい。');
				return;
			}
		} else if (['タワー攻略'].includes(wantedData.purpose)) {
			if (wantedData.map === '') {
				alert('目的マップを入力して下さい。');
				return;
			}
		}

		if (wantedData.time.from === '') {
			alert('開始時間を入力して下さい。');
			return;
		}

		if (wantedData.wantedJobs.reduce((p, c) => p + c.num, 0) !== wantedData.wantedNum) {
			alert('募集人数の総数が合いません、募集職業の人数を見直して下さい');
			return;
		}

		if (firestore) {
			const id = await firestore.registerWantedData(wantedData);

			alert('登録完了しました');		
						
			updateModal(TweetModal, { id, wantedData });
			goto('/wantedparty');
		}
	}

	onMount(() => {
		firestore = useFirestore();
	});

	$: {
		console.log(JSON.stringify(wantedData, null, 2));
	}
</script>

<div class="md:w-[74rem] md:mx-auto">
	<div class="heading mt-4 md:mt-0">パーティー募集</div>
	<div class="border shadow border-well-read-700 bg-chocolate-900 panel">
		<div class="form-row">
			<div class="form-label w-[7.4rem]">目的</div>
			<div class="form-controll space">
				<select bind:value={wantedData.purpose} class="text-xs">
					<option value="タワー攻略">タワー攻略</option>
					<option value="金策">金策</option>
					<option value="レベル上げ">レベル上げ</option>
					<option value="ブック解放">ブック解放</option>
				</select>
			</div>
		</div>
		{#if ['タワー攻略'].includes(wantedData.purpose)}
			<div class="form-row">
				<div class="form-label w-[7.4rem]">目的マップ</div>
				<div class="form-controll space">
					<select bind:value={wantedData.map} class="text-xs">
						<option value="">マップを選択</option>
						<option value="コラプションの塔">コラプションの塔</option>
						<option value="エメラルドテイルの塔">エメラルドテイルの塔</option>
					</select>
				</div>
			</div>
		{/if}
		{#if ['ブック解放'].includes(wantedData.purpose)}
			<div class="form-row">
				<div class="form-label w-[7.4rem]">ブックNo</div>
				<div class="form-controll space">
					<input
						class="text-xs"
						type="text"
						placeholder="複数ある場合はカンマ区切りで記入して下さい。例) 1,2,3"
						bind:value={wantedData.bookNums}
					/>
				</div>
			</div>
		{/if}
		{#if ['レベル上げ', '金策'].includes(wantedData.purpose)}
			<div class="form-row">
				<div class="form-label w-[7.4rem]">目的マップ</div>
				<div class="form-controll space">
					<select bind:value={wantedData.map} class="text-xs">
						<option value="">マップを選択</option>
						{#each MapData as map}
							<option value={map.name}>{map.name}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-[7.4rem]">対象モンスター</div>
				<div class="form-controll space">
					<select bind:value={wantedData.targetMonster} class="text-xs">
						<option value="">モンスターを選択</option>
						{#each _MonsterData as monster}
							<option value={`${monster.name}Lv${monster.lv}`}>{monster.name}Lv{monster.lv}</option>
						{/each}
					</select>
				</div>
			</div>
		{/if}
		<div class="form-row">
			<div class="form-label w-[7.4rem]">開始時間</div>
			<div class="form-controll space flex gap-4">
				<input type="datetime-local" class="text-xs" bind:value={wantedData.time.from} />
			</div>
		</div>
		<div class="form-row">
			<div class="form-label w-[7.4rem]">時間</div>
			<div class="form-controll space flex">
				<input type="number" class="text-xs" bind:value={wantedData.time.to} /><span
					class="bg-gray-900 px-1 border border-gray-900 text-xs">分</span
				>
			</div>
		</div>
		<div class="heading2">募集メンバー</div>
		<div class="form-row">
			<div class="form-label w-[7.4rem]">募集人数</div>
			<div class="form-controll space">
				<select bind:value={wantedData.wantedNum} class="text-xs">
					<option value={1}>1人</option>
					<option value={2}>2人</option>
					<option value={3}>3人</option>
				</select>
			</div>
		</div>
		{#each wantedData.wantedJobs as _, i}
			<div class="form-row">
				<div class="form-label w-[7.4rem]">募集職業{i + 1}</div>
				<div class="form-control px-4 py-2 flex">
					<select class="text-xs" bind:value={wantedData.wantedJobs[i].job}>
						<option value="">職業自由</option>
						{#each JobData as job}
							<option value={job.name}>{job.name}</option>
						{/each}
					</select>

					<select bind:value={wantedData.wantedJobs[i].num} class="ml-4 text-xs">
						<option value={0}>0人</option>
						<option value={1}>1人</option>
						<option value={2}>2人</option>
						<option value={3}>3人</option>
					</select>
				</div>
			</div>
		{/each}
		<div class="heading2">集合場所</div>
		<div class="form-row">
			<div class="form-label w-[7.4rem]">リージョン</div>
			<div class="form-controll space">
				<select bind:value={wantedData.meetPlace.region} class="text-xs">
					<option value="リージョン1">リージョン1</option>
					<option value="リージョン2">リージョン2</option>
				</select>
			</div>
		</div>
		<div class="form-row">
			<div class="form-label w-[7.4rem]">マップ</div>
			<div class="form-controll space">
				<select bind:value={wantedData.meetPlace.map} class="text-xs">
					<option value="エルロンド城下町">エルロンド城下町</option>
					<option value="エルロンド商店街">エルロンド商店街</option>
					<option value="コルキア村">コルキア村</option>
					<option value="ポートブルの港">ポートブルの港</option>
					{#each MapData as map}
						<option value={map.name}>{map.name}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="form-row">
			<div class="form-label w-[7.4rem]">チャンネル</div>
			<div class="form-controll space">
				<select bind:value={wantedData.meetPlace.channel} class="text-xs">
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
				</select>
			</div>
		</div>
		<div class="form-row">
			<div class="form-label w-[7.4rem]">座標</div>
			<div class="form-controll space">
				<input
					type="text"
					bind:value={wantedData.meetPlace.point}
					placeholder="0,0"
					class="text-xs"
				/>
			</div>
		</div>
		<div class="heading2 ">応募条件</div>
		<div class="form-row">
			<div class="form-label w-[7.4rem]">レベル</div>
			<div class="form-controll space flex gap-2">
				<select bind:value={wantedData.condition.level.from} class="text-xs">
					{#each new Array(30).fill(null) as _, i}
						<option value={i + 1}> Lv.{i + 1} </option>
					{/each}
				</select>
				<div>~</div>
				<select bind:value={wantedData.condition.level.to} class="text-xs">
					{#each new Array(30).fill(null) as _, i}
						<option value={i + 1}> Lv.{i + 1} </option>
					{/each}
				</select>
			</div>
		</div>
		<div class="form-row">
			<div class="form-label w-[7.4rem]">備考</div>
			<div class="form-controll space">
				<textarea
					bind:value={wantedData.condition.memo}
					class="text-gray-700 p-1 text-xs w-full"
					cols="28"
					rows="6"
				/>
			</div>
		</div>
	</div>

	<button class="btn w-full mt-4" on:click={registerWantedData}>登録</button>
</div>
