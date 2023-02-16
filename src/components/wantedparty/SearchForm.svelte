<script lang="ts">
	import MapData from '../../MapData';
	import useFirestore from '$lib/wantedparty/Firestore';
	import { onMount } from 'svelte';
	import { wantedPartyListStore } from '$lib/wantedparty/Store';

	let firestore: any = undefined;

	let searchCondition = {
		purpose: '',
		map: '',
		bookNums: '',
		storyNums: '',
		timeFrom: new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, -8)
	};

	onMount(() => {
		firestore = useFirestore();
	});

	async function search() {
		if (firestore) {
			const wantedPartyList = await firestore.searchWantedDataList(searchCondition);
			wantedPartyListStore.update(() => {
				return wantedPartyList;
			});
		}
	}
</script>

<div class="">
	<div class="heading gray">検索</div>
	<div class="border panel border-well-read-700">
		<div class="form-row">
			<div class="form-label w-[7.4rem]">目的</div>
			<div class="form-controll space">
				<select bind:value={searchCondition.purpose}>
					<option value="">全て</option>
					<option value="ストーリー攻略">ストーリー攻略</option>
					<option value="タワー攻略">タワー攻略</option>
					<option value="金策">金策</option>
					<option value="レベル上げ">レベル上げ</option>
					<option value="ブック解放">ブック解放</option>
				</select>
			</div>
		</div>
		{#if ['タワー攻略'].includes(searchCondition.purpose)}
			<div class="form-row">
				<div class="form-label w-[7.4rem]">目的マップ</div>
				<div class="form-controll space">
					<select bind:value={searchCondition.map}>
						<option value="">全マップ</option>
						<option value="コラプションの塔">コラプションの塔</option>
						<option value="エメラルドテイルの塔">エメラルドテイルの塔</option>
					</select>
				</div>
			</div>
		{/if}
		{#if ['ブック解放'].includes(searchCondition.purpose)}
			<div class="form-row">
				<div class="form-label w-[7.4rem]">ブックNo</div>
				<div class="form-controll space">
					<input type="text" bind:value={searchCondition.bookNums} />
				</div>
			</div>
		{/if}
		{#if ['ストーリー攻略'].includes(searchCondition.purpose)}
			<div class="form-row">
				<div class="form-label w-[7.4rem]">ストーリーの番号</div>
				<div class="form-controll space">
					<input type="text" bind:value={searchCondition.storyNums} />
				</div>
			</div>
		{/if}
		{#if ['レベル上げ', '金策'].includes(searchCondition.purpose)}
			<div class="form-row">
				<div class="form-label w-[7.4rem]">目的マップ</div>
				<div class="form-controll space">
					<select bind:value={searchCondition.map}>
						<option value="">全マップ</option>
						{#each MapData as map}
							<option value={map.name}>{map.name}</option>
						{/each}
					</select>
				</div>
			</div>
		{/if}
		<div class="form-row">
			<div class="form-label w-[7.4rem]">開始時間</div>
			<div class="form-controll space flex gap-4">
				<input type="datetime-local" bind:value={searchCondition.timeFrom} />
			</div>
		</div>

		<div class="p-2">
			<button class="btn w-full" on:click={search}>検索</button>
		</div>
	</div>
</div>
