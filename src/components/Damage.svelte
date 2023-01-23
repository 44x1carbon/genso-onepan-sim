<script lang="ts">
	import type { Status } from '../Status';
	import type { Skill, SkillLevel } from '../SkillData';
	import { calcDamage } from '../Calac';
	import { elementLabel, typeLabel } from '../Label';

	export let skills: Skill[] = [];
	export let level: SkillLevel = 5;
	export let status: Status;

	$: totalDamage = skills
		.map((skill) =>
			skill.lv[level].map((attack) => calcDamage(attack, status, {})).reduce((p, c) => p + c, 0)
		)
		.reduce((p, c) => p + c, 0);
</script>

{#if skills.length}
	<div class="border panel border-chocolate-900 rounded-sm overflow-hidden mt-4 md:w-96">
		<div class="heading">ダメージ</div>
		<div class="">
			{#each skills as skill}
				<div class="bg-mai-tai-700 px-2 font-bold text-sm">{skill.name}</div>
				<div class="p-2 bg-white bg-opacity-20">
					{#each skill.lv[level] as attack, i}
						<div class="leading-tight text-sm last:mb-0">
							<div class="font-bold ">{i + 1}撃目 ダメージ:{calcDamage(attack, status, {})}</div>
							<div>
								<span class={`attack-tag _${attack.element}`}
									>{elementLabel(attack.element)}属性
								</span>
								<span class={`attack-tag _${attack.type}`}>{typeLabel(attack.type)}攻撃 </span>
								<span class="attack-tag">威力:{attack.power}</span>
							</div>
						</div>
						{#if i + 1 !== skill.lv[level].length}
							<hr class="my-1" />
						{/if}
					{/each}
				</div>
			{/each}
		</div>
		<div class="flex text-xl border bg-mai-tai-500 border-mai-tai-700 items-center text-black">
			<div class="font-bold text-2xl p-2">Total:</div>
			<div class="font-bold p-2 flex-1 text-center">{totalDamage}ダメージ</div>
		</div>
	</div>
{/if}

<style>
	.attack-tag {
		@apply bg-gray-500 px-1 text-white rounded;
	}

	.attack-tag._wind {
		@apply bg-green-500;
	}

	.attack-tag._devil {
		@apply bg-purple-500;
	}

	.attack-tag._fire {
		@apply bg-red-500;
	}

	.attack-tag._water {
		@apply bg-blue-500;
	}

	.attack-tag._ground {
		@apply bg-yellow-800;
	}

	.attack-tag._dark {
		@apply bg-gray-800;
	}

	.attack-tag._shine {
		@apply bg-yellow-500;
	}
</style>
