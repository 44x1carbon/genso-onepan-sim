<script lang="ts">
	import { browser } from '$app/environment';
	import { mapping } from '$lib/skill/Mapping';
	import { onMount } from 'svelte';
	import JobData from '../../JobData';
	import SkillTreeData from '../../SkillTreeData';
	import ClipboardJS from 'clipboard';

	let selectJob = 'ファイター';
	let prevSelectJob = 'ファイター';
	$: mapData = selectJob ? mapping(SkillTreeData[selectJob]) : [1];
	let mapLevelData = Object.entries(SkillTreeData[selectJob].skills).reduce((p, [id, _]) => {
		p[id] = 0;

		return p;
	}, {} as { [id: string]: number });
	$: {
		if (selectJob !== prevSelectJob) {
			mapLevelData = Object.entries(SkillTreeData[selectJob].skills).reduce((p, [id, _]) => {
				p[id] = 0;

				return p;
			}, {} as { [id: string]: number });
			prevSelectJob = selectJob;
		}

		Object.entries(mapLevelData).filter(([id, level]) => {
			if (level !== 0 && !canLearn(id, mapLevelData)) {
				mapLevelData[id] = 0;
			}
		});
	}

	$: needLevel = Object.values(mapLevelData).reduce((p, c) => p + c, 0);

	function canLearn(id: string, mapLevelData: { [id: string]: number }) {
		const prevId = SkillTreeData[selectJob].skills[id].prev;

		if (prevId === null) {
			return true;
		}

		if (mapLevelData[prevId] > 0) {
			return true;
		}

		return false;
	}

	function increment(id: string) {
		mapLevelData[id]++;
	}

	function decrement(id: string) {
		mapLevelData[id]--;
	}

	function parse(url: string) {
		const _url = new URL(url);

		prevSelectJob = _url.searchParams.get('job') ?? 'ファイター';
		selectJob = _url.searchParams.get('job') ?? 'ファイター';
		mapLevelData = Object.entries(SkillTreeData[selectJob].skills).reduce((p, [id, _]) => {
			p[id] = 0;

			return p;
		}, {} as { [id: string]: number });

		const skillTree = SkillTreeData[selectJob];
		(_url.searchParams.get('skills') ?? '').split('_').forEach((t) => {
			const [hash, level] = t.split('*');
			console.log(hash, level);

			const [id] = Object.entries(skillTree.skills).find(([_, skill]) => skill.hash === hash) ?? [];

			if (id) {
				mapLevelData[id] = parseInt(level);
			}
		});
	}
	let isMount = false;
	$: hash = Object.entries(mapLevelData)
		.filter(([_, level]) => level !== 0)
		.map(([id, level]) => `${SkillTreeData[selectJob].skills[id].hash}*${level}`)
		.join('_');
	let shareUrl = '';
	$: {
		if (browser && isMount) {
			const url = new URL(window.location.href);

			url.searchParams.set('job', selectJob);
			url.searchParams.set('skills', hash);
			shareUrl = url.href;
		}
	}
	function copyShareUrl() {
		alert('共有URLをコピーしました！');
	}

	onMount(() => {
		parse(location.href);
		new ClipboardJS('#CopyShareUrlBtn');
		isMount = true;
	});
</script>

<svelte:head>
	<title>IGNIS TOOLS - スキルシミュレーター(α版)</title>
	<meta name="description" content="元素騎士オンラインのスキルシミュレーターです。" />
	<meta name="keywords" content="元素騎士オンライン,元素騎士,スキルシミュレーター" />
</svelte:head>

<div class="mx-auto border-4 border-gray-500 rounded-sm w-full md:w-[74rem] md:mx-auto mb-4">
	<div class="flex border-gray-500 border-b-4">
		<div class="bg-gray-500 px-2 flex items-center">共有URL</div>
		<div
			class="bg-black flex-1 px-2 flex items-center text-ellipsis overflow-hidden whitespace-nowrap"
		>
			{shareUrl}
		</div>
		<div class="bg-gray-500 px-2">
			<button
				class="btn w-full"
				id="CopyShareUrlBtn"
				data-clipboard-text={shareUrl}
				on:click={copyShareUrl}>コピー</button
			>
		</div>
	</div>
	<div class="text-sm p-2">このURLを送る事で考えたスキル構成を共有できます！</div>
</div>

<div class="mx-auto border-4 rounded-sm bg-black border-gray-500 w-full md:w-[74rem] md:mx-auto">
	<div class="bg-gray-500 p-2 font-bold">
		<select bind:value={selectJob} class="mr-2">
			{#each JobData as job}
				<option value={job.name}>{job.name}</option>
			{/each}
		</select>
		<span>必要なスキルレベル Lv{needLevel}</span>
	</div>
	<div class="overflow-x-scroll">
		<table class="mx-auto">
			{#each mapData as row, y}
				<tr>
					{#each row as col, x}
						<td class="p-3 h-full relative min-w-[5rem]">
							<!-- <div class="absolute top-0 left-0 z-10">{x},{y}</div> -->

							{#if col === 'center'}
								<div
									class="text-center text-xs p-2 border-2 border-mai-tai-900 bg-chocolate-900 rounded flex items-center"
									style="height:70px"
								>
									<div class="flex-1">{selectJob}</div>
								</div>
							{:else if col !== null}
								<div
									style="height:70px"
									class="skill text-center text-xs p-2 border-2 border-mai-tai-900 bg-chocolate-900 rounded relative h-full flex items-center justify-center flex-col opacity-70"
									class:pos-top={col.position === 'top'}
									class:pos-bottom={col.position === 'bottom'}
									class:pos-left={col.position === 'left'}
									class:pos-right={col.position === 'right'}
									class:pos-topleft={col.position === 'topleft'}
									class:pos-topright={col.position === 'topright'}
									class:pos-bottomleft={col.position === 'bottomleft'}
									class:pos-bottomright={col.position === 'bottomright'}
									class:cannot-learn={!canLearn(col.id, mapLevelData)}
									class:is-learn={mapLevelData[col.id]}
								>
									<div class="whitespace-nowrap">
										{#if col.maxSkillName && mapLevelData[col.id] === col.maxLevel}
											{col.maxSkillName}
										{:else}
											{col.name}
										{/if}
									</div>
									{#if col.maxLevel !== 1}
										<div class="text-mai-tai-500">
											{#each new Array(col.maxLevel) as _, i}
												{#if i + 1 <= mapLevelData[col.id]}
													★
												{:else}
													☆
												{/if}
											{/each}
										</div>
										<div class="mt-1 flex items-center justify-center gap-1">
											<button
												class="border px-2 rounded font-bold bg-gray-200 text-black"
												disabled={!canLearn(col.id, mapLevelData) || mapLevelData[col.id] < 1}
												on:click={() => decrement(col.id)}>-</button
											>
											{#if canLearn(col.id, mapLevelData)}
												<span class="border px-2 font-bold rounded-sm"
													>Lv{mapLevelData[col.id]}</span
												>
											{/if}
											<button
												class="border px-2 rounded font-bold bg-gray-200 text-black"
												disabled={!canLearn(col.id, mapLevelData) ||
													mapLevelData[col.id] >= col.maxLevel}
												on:click={() => increment(col.id)}>+</button
											>
										</div>
									{:else}
										<div>&nbsp;</div>
										<div class="mt-1 flex items-center justify-center gap-1">
											{#if mapLevelData[col.id] === 0}
												<button
													class="border px-2 rounded font-bold bg-gray-200 text-black"
													disabled={!canLearn(col.id, mapLevelData) ||
														mapLevelData[col.id] >= col.maxLevel}
													on:click={() => increment(col.id)}>取得</button
												>
											{:else}
												<button
													class="border px-2 rounded font-bold bg-gray-200 text-black"
													disabled={!canLearn(col.id, mapLevelData) || mapLevelData[col.id] < 1}
													on:click={() => decrement(col.id)}>リセット</button
												>
											{/if}
										</div>
									{/if}
								</div>
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</table>
	</div>
</div>

<style>
	.pos-top::before {
		content: '';
		display: block;
		position: absolute;
		@apply w-1 h-6 bg-blue-400 -bottom-6 left-1/2;
	}
	.pos-bottom::before {
		content: '';
		display: block;
		position: absolute;
		@apply w-1 h-6 bg-blue-400 -top-6 left-1/2;
	}
	.pos-left::before {
		content: '';
		display: block;
		position: absolute;
		@apply w-6 h-1 bg-blue-400 -right-6 top-1/2;
	}
	.pos-right::before {
		content: '';
		display: block;
		position: absolute;
		@apply w-6 h-1 bg-blue-400 -left-6 top-1/2;
	}
	.pos-topleft::before {
		content: '';
		display: block;
		position: absolute;
		@apply w-9 h-1 bg-blue-400 -right-9 -bottom-4 rotate-45;
	}
	.pos-topright::before {
		content: '';
		display: block;
		position: absolute;
		@apply w-9 h-1 bg-blue-400 -left-9 -bottom-4 -rotate-45;
	}
	.pos-bottomleft::before {
		content: '';
		display: block;
		position: absolute;
		@apply w-9 h-1 bg-blue-400 -right-9 -top-4 -rotate-45;
	}
	.pos-bottomright::before {
		content: '';
		display: block;
		position: absolute;
		@apply w-9 h-1 bg-blue-400 -left-9 -top-4 rotate-45;
	}

	.is-learn {
		@apply opacity-100;
	}

	.skill:not(.cannot-learn):not(.is-learn) {
		filter: drop-shadow(0 0px 10px rgb(255 255 255));
	}

	button:disabled {
		@apply opacity-0;
	}
</style>
