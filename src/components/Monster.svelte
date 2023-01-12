<script lang="ts">
	import type { Skill, SkillLevel } from '../SkillData';
	import MonsterData from '../MonsterData';
	import { calcDamage } from '../Calac';
	import type { Status } from '../Status';
	import { elementLabel, typeLabel } from '../Label';

	export let skill: Skill | undefined = undefined;
	export let level: SkillLevel;
	export let status: Status;

	$: sortedMonsterData = MonsterData.filter((monster) =>
		selectArea ? monster.area === selectArea : true
	)
		.map((monster) => {
			const damage = skill
				? skill.lv[level]
						.map((attack) => calcDamage(attack, status, monster))
						.reduce((p, c) => p + c, 0)
				: 0;
			return {
				...monster,
				damage,
				punchNum: damage ? Math.ceil(parseInt(monster.hp) / damage) : 0
			};
		})
		.sort((a, b) => {
			return a.punchNum - b.punchNum !== 0
				? a.punchNum - b.punchNum
				: parseInt(a.lv) - parseInt(b.lv);
		});

	let selectArea: string = '';

	let areas = [
		'旅立ちの草原',
		'冒険者の修練所',
		'アテーリア草原西',
		'アテーリア草原東',
		'清めの間',
		'アテーリア草原北',
		'エルトス大城壁',
		'コルキア平原',
		'アテーリア東兵舎跡',
		'ヴェルク遺跡',
		'アテーリア地下迷路',
		'エルロンド地下水路',
		'イヴワール鍾乳洞',
		'エアロス山',
		'空中宮殿シャリアン',
		'ボルゴナ火山島',
		'炎魔殿',
		'カルハリ砂漠',
		'コルキア大空洞',
		'竜のあぎと',
		'地響きの神殿',
		'カルハリ海岸',
		'薄闇の異界',
		'ダークネスホール'
	];

	$: onePunchNum = sortedMonsterData.filter((m) => m.punchNum === 1).length;
	$: twoPunchNum = sortedMonsterData.filter((m) => m.punchNum === 2).length;

	$: onePunchLine = onePunchNum
		? sortedMonsterData.findIndex(({ punchNum }) => punchNum >= 2)
			? sortedMonsterData.findIndex(({ punchNum }) => punchNum >= 2)
			: sortedMonsterData.length
		: 0;
	$: twoPunchLine = twoPunchNum
		? sortedMonsterData.findIndex(({ punchNum }) => punchNum >= 3)
			? sortedMonsterData.findIndex(({ punchNum }) => punchNum >= 3)
			: sortedMonsterData.length
		: onePunchLine;
</script>

<div class="border bg-white rounded-sm overflow-hidden md:w-96">
	<div class="heading">モンスター別ダメージ表</div>
	<div class="p-2">
		<select class="border w-full bg-gray-50" bind:value={selectArea}>
			<option value="">- - 地域で絞り込む - -</option>
			{#each areas as area}
				<option value={area}>{area}</option>
			{/each}
		</select>
	</div>
	<ul class="max-h-96 overflow-y-scroll border">
		{#each sortedMonsterData as m, i}
			{#if onePunchNum !== 0 && i === 0}
				<li>
					<div class="one-panch-line">ここから 1撃</div>
				</li>
			{/if}
			{#if twoPunchNum !== 0 && i === onePunchLine}
				<li>
					<div class="two-panch-line">ここから 2撃</div>
				</li>
			{/if}

			{#if i === twoPunchLine}
				<li>
					<div class="more-panch-line">ここから 2撃以上</div>
				</li>
			{/if}
			<li class="border-b">
				<div
					class={`${i < onePunchLine ? ' one-panch' : ''}${
						i >= onePunchLine && i < twoPunchLine ? ' two-panch' : ''
					} p-1 px-2 leading-snug text-gray-700 text-sm`}
				>
					<div class="flex items-center">
						<div class="font-bold flex-1">{m.name} L{m.lv}</div>
						<div>
							<span class="bg-gray-500 text-white font-bold px-1 rounded text-xs ml-2"
								>{m.damage}ダメ</span
							>
						</div>
					</div>

					<div>
						<span class="inline-block w-24">HP:{m.hp}</span>
						<span>{m.area}</span>
					</div>
					<div class="flex w-fit text-sm mt-1">
						{#each ['physics', 'devil', 'ground', 'water', 'fire', 'wind', 'shine', 'dark'] as key}
							<div class=" w-4 text-center bg-gray-400 text-white ">
								{(elementLabel(key) ?? typeLabel(key))?.substring(0, 1)}
							</div>
							<div class=" w-4 text-center bg-white bg-opacity-50">{m[key]}</div>
						{/each}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.one-panch {
		@apply bg-red-50;
	}

	.two-panch {
		@apply bg-yellow-50;
	}

	.one-panch-line {
		@apply bg-red-500 text-center text-white  text-xs font-bold;
	}

	.two-panch-line {
		@apply bg-yellow-500 text-center text-white text-xs font-bold;
	}

	.more-panch-line {
		@apply bg-gray-500 text-center text-white text-xs font-bold;
	}
</style>
