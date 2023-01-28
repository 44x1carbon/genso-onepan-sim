<script lang="ts">
	import SkillData, { type Skill, type SkillLevel } from '../SkillData';

	export let skills: Skill[] = [];
	export let levels: { [skillName: string]: SkillLevel } = {};
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
			levels[skill.name] = 5;
			skills = [...skills, skill];
		} else {
			delete levels[skill.name];
			skills = [...skills.filter((_, i) => i !== index)];
		}
	}
</script>

<div class="border border-chocolate-900 panel rounded-sm overflow-hidden md:w-96">
	<div class="heading">スキル選択</div>
	<div class="text-xs flex gap-1 flex-wrap flex-between p-2">
		{#each jobs as j}
			<div
				class="border font-bold inline-block p-1 rounded bg-chocolate-100 border-chocolate-200 text-white cursor-pointer text-gray-400"
				class:selected={selectJobs.includes(j)}
				on:click={() => (selectJobs = j)}
			>
				{j}
			</div>
		{/each}
	</div>
	<ul class="flex flex-wrap">
		{#each filterdSkillData as s}
			<li class="border w-1/2 border-well-read-900 bg-well-read-700">
				<div
					class="cursor-pointer w-full text-sm p-1 font-bold"
					class:selected={skills.some((skill) => s.name === skill.name)}
					on:click={() => clickSkill(s)}
				>
					{s.name}
				</div>
			</li>
		{/each}
	</ul>
	<div class="border items-center border-well-read-900 ">
		<div class="heading">スキルLv</div>
		{#each skills as skill}
			<div
				class="flex justify-between items-center p-2 border-b last:border-b-0 border-well-read-900"
			>
				<div class="font-bold">{skill.name}</div>
				<div class="flex gap-2">
					{#each new Array(5).fill(null) as _, i}
						<div
							class="w-8 h-8 flex justify-center items-center border cursor-pointer bg-chocolate-100 border-chocolate-200 text-gray-400"
							class:selected={levels[skill.name] === i + 1}
							on:click={() => (levels[skill.name] = i + 1)}
						>
							{i + 1}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<!-- <div class="p-2">
		<label for="JsIncludeNomalAttack" class="font-bold text-gray-700">
			<input type="checkbox" id="JsIncludeNomalAttack" bind:checked={isIncludeNomalAttack} /> 通常攻撃も含める
		</label>
	</div> -->
</div>

{#if skills.some((skill) => skill.pending && skill.pending.includes(levels[skill.name]))}
	<div class="border-2 rounded mx-auto p-2 mt-2 border-red-700 bg-red-500  md:w-96">
		機能が未実装の部分がある為、正しいダメージを計算できません。
	</div>
{/if}

<style>
	
</style>
