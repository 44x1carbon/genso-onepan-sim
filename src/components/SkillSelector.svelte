<script lang="ts">
	import SkillData, { type Skill, type SkillLevel } from '../SkillData';

	export let skills: Skill[] = [];
	export let level: SkillLevel = 5;
	export let isIncludeNomalAttack: boolean = false;
	let selectJobs: string = 'ファイター';

	let jobs = [
		'ファイター',
		'シーフ',
		'クレリック',
		'ウィザード',
		'ガーディアン',
		'マジックナイト',
		'ビショップ',
		'モンク',
		'アサシン',
		'ウォーロック'
	];

	$: filterdSkillData = SkillData.filter((s) => selectJobs == s.job);

	function clickSkill(skill: Skill) {
		const index = skills.findIndex((s) => s.name === skill.name);

		if (index === -1) {
			skills = [...skills, skill];
		} else {
			skills = [...skills.filter((_, i) => i !== index)];
		}
	}
</script>

<div class="border bg-white rounded-sm overflow-hidden md:w-96">
	<div class="heading">スキル選択</div>
	<div class="text-xs flex gap-1 flex-wrap flex-between p-2">
		{#each jobs as j}
			<div
				class="border font-bold inline-block p-1 rounded bg-gray-200 text-white cursor-pointer"
				class:selected={selectJobs.includes(j)}
				on:click={() => (selectJobs = j)}
			>
				{j}
			</div>
		{/each}
	</div>
	<ul class="flex flex-wrap">
		{#each filterdSkillData as s}
			<li class="border w-1/2">
				<div
					class="cursor-pointer w-full text-sm p-1 text-gray-700 font-bold"
					class:selected={skills.some((skill) => s.name === skill.name)}
					on:click={() => clickSkill(s)}
				>
					{s.name}
				</div>
			</li>
		{/each}
	</ul>
	<div class="border p-2 flex items-center">
		<div class="font-bold text-sm flex-1">スキルLv</div>
		<div class="flex gap-2">
			{#each new Array(5).fill(null) as _, i}
				<div
					class="w-8 h-8 flex justify-center items-center border cursor-pointer bg-gray-50"
					class:selected={i + 1 === level}
					on:click={() => (level = i + 1)}
				>
					{i + 1}
				</div>
			{/each}
		</div>
	</div>
	<!-- <div class="p-2">
		<label for="JsIncludeNomalAttack" class="font-bold text-gray-700">
			<input type="checkbox" id="JsIncludeNomalAttack" bind:checked={isIncludeNomalAttack} /> 通常攻撃も含める
		</label>
	</div> -->
</div>

{#if skills.some((skill) => skill.pending && skill.pending.includes(level))}
	<div class="border-2 rounded mx-auto p-2 mt-2 border-red-200 bg-red-50 text-gray-700 md:w-96">
		機能が未実装の部分がある為、正しいダメージを計算できません。
	</div>
{/if}

<style>
	.selected {
		@apply bg-blue-500 text-white font-bold;
	}
</style>
