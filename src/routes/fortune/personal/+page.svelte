<script lang="ts">
	import { getPersonalFortuneResult, resultTypes, type Result } from '$lib/fortune/Fortune';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import 'dayjs/locale/ja';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(customParseFormat);
	dayjs.tz.setDefault('Asia/Tokyo');
	dayjs.locale('ja');

	const SAVE_KEY = 'GENSO-FORTUNE-PERSONAL';

	let result: Result | undefined = undefined;
	let id: string = '';
	let playerName: string = '';

	$: tweetBody =
		result !== undefined
			? `【元素騎士占い】
${dayjs().format('YYYY年MM月DD日')}の${playerName}の運勢は！！

ドロップ運 ${new Array(4)
					.fill(null)
					.map((_, i) => (i + 1 <= result.ドロップ運.rank ? '★' : '☆'))
					.join('')}
クリティカル運 ${new Array(4)
					.fill(null)
					.map((_, i) => (i + 1 <= result.クリティカル運.rank ? '★' : '☆'))
					.join('')}
狩場運 ${new Array(4)
					.fill(null)
					.map((_, i) => (i + 1 <= result.狩場運.rank ? '★' : '☆'))
					.join('')}

${
	0 <= result.totalScore && result.totalScore <= 5
		? '今日はあまりついてないみたい、友達と楽しく遊ぼう'
		: 6 <= result.totalScore && result.totalScore <= 7
		? '今日の運勢は悪くない、いつも通り楽しもう！'
		: 8 <= result.totalScore && result.totalScore <= 9
		? '今日は少しついてるみたい、いつもより稼げるかも？'
		: 10 <= result.totalScore && result.totalScore <= 12
		? '今日はとってもラッキー、SR武器や太陽石が落ちるかも？知らんけど'
		: ''
}

↓あなたも今日の運勢を占ってみよう！\n`
			: '';

	function getResult() {
		if (id !== '' && playerName !== '') {
			result = getPersonalFortuneResult(id + playerName);
			console.log(result);
			localStorage.setItem(
				SAVE_KEY,
				JSON.stringify({
					id,
					playerName
				})
			);
		} else {
			alert('プレイヤー名とIDを入力してください');
		}
	}

	onMount(() => {
		const json = localStorage.getItem(SAVE_KEY);

		if (json) {
			const data = JSON.parse(json);
			id = data.id;
			playerName = data.playerName;
		}
	});
</script>

<div class="md:w-[37rem] w-full mx-auto">
	<div class="heading">今日の自分の運勢を占ってみよう！</div>
	<div class="panel p-2">
		<div class="flex flex-row gap-2">
			<input type="text" bind:value={playerName} placeholder="キャラ名" />
			<input type="text" bind:value={id} placeholder="ゲーム内のIDを入力しよう！！ 例)ABCD" />
		</div>
		<div class="mt-4">
			<button class="btn w-full" on:click={getResult}>今日の運勢を占う！</button>
		</div>
	</div>
</div>

{#if result}
	<div class="md:w-[37rem] w-full mx-auto">
		<div class="border border-slate-800 rounded-sm overflow-hidden mt-4">
			<div class=" bg-well-read-700 font-bold flex items-center">
				<div class="p-1 px-2">{dayjs().format('YYYY年MM月DD日')}の{playerName}の運勢</div>
			</div>
			<div class="bg-white">
				{#each resultTypes as type}
					<div class="mt-0 first:mt-0">
						<div class="flex font-bold bg-gray-700 w-full gap-4 p-1">
							<div>
								{#each new Array(4) as _, i}
									{#if i + 1 <= result[type].rank}
										<span class="text-mai-tai-500">★</span>
									{:else}
										☆
									{/if}
								{/each}
							</div>
							<div>
								{type}
							</div>
						</div>
						<div class="p-1 text-gray-900 font-bold text-xs">
							{result[type].text.slice(0, 48)}
						</div>
					</div>
				{/each}
			</div>
		</div>
		<a
			class="bg-blue-400 text-white font-bold w-full text-center rounded p-2 mt-2 mb-2 block"
			target="_blunk"
			href={`https://twitter.com/intent/tweet?text=${encodeURI(
				tweetBody
			)}&url=https://ignis-tools.vercel.app/fortune/personal&hashtags=元素騎士`}
			>占いの結果をツイートする</a
		>
	</div>
{/if}
