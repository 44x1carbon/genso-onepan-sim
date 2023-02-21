<script lang="ts">
	import { mapping } from '$lib/skill/Mapping';
	import JobData from '../../JobData';
	import SkillTreeData from '../../SkillTreeData';

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
</script>

<svelte:head>
	<title>IGNIS TOOLS - スキルシミュレーター(α版)</title>
	<meta name="description" content="元素騎士オンラインのスキルシミュレーターです。" />
	<meta name="keywords" content="元素騎士オンライン,元素騎士,スキルシミュレーター" />
</svelte:head>

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
