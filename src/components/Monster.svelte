<script lang="ts">
	import type { Attack, Skill, SkillLevel } from '../SkillData';
	import MonsterData from '../MonsterData';
	import { calcDamage } from '../Calac';
	import type { Status } from '../Status';
	import { elementLabel, typeLabel } from '../Label';
	import BaseEquipmentData from '../BaseEquipmentData';
	import RangeSlider from 'svelte-range-slider-pips';
	import { browser } from '$app/environment';

	export let skills: Skill[] = [];
	export let levels: { [skillName: string]: SkillLevel } = {};
	export let status: Status;

	let equipmentNames = BaseEquipmentData.map((bed) => bed.nameJp);

	$: sortedMonsterData = MonsterData.filter((monster) =>
		selectArea ? monster.area === selectArea : true
	)
		.map((monster) => {
			const damage = calcTotalDamage(skills, status, monster, levels);

			return {
				...monster,
				damage,
				punchNum: damage ? Math.floor((parseInt(monster.hp) / damage) * 1000) / 1000 : 0,
				dropStone: monster.drop.split(',').filter((s) => s.includes('晶石') || s.includes('垢石')),
				dropEquipments: monster.drop.split(',').filter((s) => equipmentNames.includes(s))
			};
		})
		.map((monster) => {
			return {
				...monster,
				expScore: calcEXPScore(monster),
				mRScore: calcMRONDScore(monster)
			};
		})
		.filter((monster) => {
			return monster.lv >= level;
		})
		.filter((monster) => {
			const maxScore = Math.max(...monster.dropStone.map((d) => dropToNum(d)));

			return maxScore >= dropScore;
		})
		.filter((monster) => {
			return isOnlyTwoPunch ? monster.punchNum <= 2 : true;
		})
		.sort((a, b) => {
			return areas.indexOf(a.area) - areas.indexOf(b.area) !== 0
				? areas.indexOf(a.area) - areas.indexOf(b.area)
				: parseFloat(a.hp) - parseFloat(b.hp);
		});

	let selectArea: string = '';
	let level: number = 0;
	let dropScore: number = 0;
	let isOnlyTwoPunch: boolean = false;
	let punchNumRange = [0.1, 10];

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

	$: raisedStatusLabel = Object.entries(
		skills.reduce(
			(p, c) => {
				return c.lv[levels[c.name]].reduce((p2, c2) => {
					p2[c2.type] += c2.power;

					return p2;
				}, p);
			},
			{ physics: 0, magic: 0 } as { [key: string]: number }
		)
	).sort((a, b) => b[1] - a[1])[0][0];

	function calcTotalDamage(
		skills: Skill[],
		status: Status,
		monster: any,
		levels: { [skillName: string]: SkillLevel }
	) {
		return skills
			.map((skill) =>
				skill.lv[levels[skill.name]]
					.map((attack) => calcDamage(attack, status, monster))
					.reduce((p, c) => p + c, 0)
			)
			.reduce((p, c) => p + c, 0);
	}

	function showOnepanValue(monster: any) {
		alert(
			`${monster.name}を1撃で倒すには
${raisedStatusLabel === 'physics' ? '攻撃力' : '魔法攻撃力'}があと${panValue(monster, 1)}必要です。

${
	Math.ceil(monster.punchNum) === 2
		? ''
		: `
2撃で倒すには
${raisedStatusLabel === 'physics' ? '攻撃力' : '魔法攻撃力'}があと${panValue(monster, 2)}必要です。
`.trim()
}
`
		);
	}

	function panValue(monster: any, num: number) {
		const key = raisedStatusLabel === 'physics' ? 'offensivePower' : 'magicalPower';
		let plusValue = 0;

		const hp = parseInt(monster.hp) / num;

		if (hp <= monster.damage) return 0;

		while (
			hp >
			calcTotalDamage(
				skills,
				{
					...status,
					[key]: status[key] + plusValue
				},
				monster,
				levels
			)
		) {
			plusValue += 1000;
		}

		while (
			hp <
			calcTotalDamage(
				skills,
				{
					...status,
					[key]: status[key] + plusValue
				},
				monster,
				levels
			)
		) {
			plusValue -= 100;
		}

		while (
			hp >
			calcTotalDamage(
				skills,
				{
					...status,
					[key]: status[key] + plusValue
				},
				monster,
				levels
			)
		) {
			plusValue += 10;
		}

		while (
			hp <=
			calcTotalDamage(
				skills,
				{
					...status,
					[key]: status[key] + plusValue
				},
				monster,
				levels
			)
		) {
			plusValue -= 1;
		}

		while (
			hp >=
			calcTotalDamage(
				skills,
				{
					...status,
					[key]: status[key] + plusValue
				},
				monster,
				levels
			)
		) {
			plusValue += 1;
		}

		return plusValue;
	}

	function dropToNum(drop: string) {
		const order1 = ['無垢石', '緋晶石', '碧晶石', '紫晶石'];
		const order2 = ['微', '小', '中', '大', '特大'];

		const [s1, s2] = drop.replace(')', '').split('(');

		const index1 = order1.indexOf(s1);
		const index2 = order2.indexOf(s2);

		return index1 + index2 * 0.1;
	}

	function calcEXPScore(monster: any) {
		const level = status.level ?? 0;
		const diff = monster.lv >= level ? 0 : level - monster.lv;

		if (diff >= 5) return 0;
		return (30 - diff) / monster.punchNum;
		// return diff / monster.punchNum;
	}

	const mRTable = {
		'無垢石(微)': 2,
		'無垢石(小)': 4,
		'無垢石(中)': 6,
		'無垢石(大)': 8,
		'無垢石(特大)': 10,
		'緋晶石(微)': 20,
		'緋晶石(小)': 40,
		'緋晶石(中)': 70,
		'緋晶石(大)': 100,
		'緋晶石(特大)': 150,
		'碧晶石(微)': 180,
		'碧晶石(小)': 210,
		'碧晶石(中)': 240,
		'碧晶石(大)': 270,
		'碧晶石(特大)': 300,
		'紫晶石(微)': 350,
		'紫晶石(小)': 1000,
		'紫晶石(中)': 3000,
		'紫晶石(大)': 5000,
		'紫晶石(特大)': 10000,
		'太陽石(中)': 50000,
		'太陽石(大)': 100000,
		'太陽石(特大)': 200000
	};
	function calcMRONDScore(monster: any) {
		// @ts-ignore
		const totalmR = monster.dropStone
			.map((stone: string) => {
				return mRTable[stone] ?? [];
			})
			.reduce((p, c) => p + c, 0);

		return totalmR / monster.punchNum;
	}
</script>

<div class="border panel border-chocolate-900 rounded-sm overflow-hidden md:w-96">
	<div class="heading">モンスター別ダメージ表</div>
	<div class="p-2 flex flex-col gap-2">
		<div>
			<select class="border w-full bg-gray-50" bind:value={selectArea}>
				<option value="">- - 地域で絞り込む - -</option>
				{#each areas as area}
					<option value={area}>{area}</option>
				{/each}
			</select>
		</div>
		<div>
			<select class="border w-full bg-gray-50" bind:value={level}>
				<option value={0}>- - レベルで絞り込む - -</option>
				{#each new Array(30) as _, i}
					<option value={i + 1}>Lv{i + 1}以上</option>
				{/each}
			</select>
		</div>
		<div>
			<select class="border w-full bg-gray-50" bind:value={dropScore}>
				<option value={0}>- - ドロップ品で絞り込む - -</option>
				{#each ['無垢石', '緋晶石', '碧晶石', '紫晶石'] as d}
					<option value={dropToNum(`${d}(微)`)}>{d}(微)以上</option>
					<option value={dropToNum(`${d}(小)`)}>{d}(小)以上</option>
					<option value={dropToNum(`${d}(中)`)}>{d}(中)以上</option>
					<option value={dropToNum(`${d}(大)`)}>{d}(大)以上</option>
					<option value={dropToNum(`${d}(特大)`)}>{d}(特大)以上</option>
				{/each}
			</select>
		</div>
		<div>
			<label
				for="IsOnlyTwoPunch"
				class="flex items-center bg-gray-50 px-2 text-gray-900 rounded-sm"
			>
				<input
					type="checkbox"
					id="IsOnlyTwoPunch"
					bind:value={isOnlyTwoPunch}
					class="mr-1"
				/>2撃以内のみを表示
			</label>
		</div>
	</div>

	<ul class="max-h-96 overflow-y-scroll border border-chocolate-900">
		{#each sortedMonsterData as m, i}
			<!-- {#if onePunchNum !== 0 && i === 0}
				<li>
					<div class="one-punch-line">ここから 1撃</div>
				</li>
			{/if}
			{#if twoPunchNum !== 0 && i === onePunchLine}
				<li>
					<div class="two-punch-line">ここから 2撃</div>
				</li>
			{/if}-->

			{#if i === 0 || sortedMonsterData[i - 1].area !== m.area}
				<li>
					<div class="more-punch-line">{m.area}</div>
				</li>
			{/if}
			<li class="border-b">
				<div
					class={`${
						['one-punch', 'two-punch'][Math.ceil(m.punchNum) - 1]
					} p-1 px-2 leading-snug text-sm bg-gray-50 text-gray-700`}
				>
					<div class="flex items-center">
						<div class="flex-1">
							<div class="font-bold">
								{m.name} L{m.lv}
								{#if m.active === '○'}<span class="ml-1 text-xs px-1 bg-gray-500 text-white rounded"
										>アクティブ</span
									>{/if}
							</div>
							<div>
								<span class="inline-block w-24">HP:{m.hp}</span>
								<span>{m.area}</span>
							</div>
							<div class="flex w-fit mt-1 border" style="font-size: 10px;">
								{#each ['physics', 'devil', 'ground', 'water'] as key}
									<div class=" w-4 text-center bg-gray-400 text-white ">
										{(elementLabel(key) ?? typeLabel(key))?.substring(0, 1)}
									</div>
									<div class=" w-4 text-center ">{m[key]}</div>
								{/each}
							</div>
							<div class="flex w-fit border border-t-0" style="font-size: 10px;">
								{#each ['fire', 'wind', 'shine', 'dark'] as key}
									<div class=" w-4 text-center bg-gray-400 text-white ">
										{(elementLabel(key) ?? typeLabel(key))?.substring(0, 1)}
									</div>
									<div class=" w-4 text-center ">{m[key]}</div>
								{/each}
							</div>
							<div class="text-xs mt-1">
								{m.dropStone.join(',')}
							</div>
							<div class="text-xs mt-1">
								{m.dropEquipments.join(',')}
							</div>
						</div>
						<div>
							<div
								class="bg-red-500 text-white font-bold px-1 rounded text-center"
								style="font-size: 10px;"
							>
								{m.damage}ダメ<br />
								({m.punchNum}撃)
							</div>
							<!-- <div>{m.expScore}</div>
							<div>{m.mRScore}</div> -->
							{#if Math.ceil(m.punchNum) > 1 && skills.length}
								<div
									class="text-blue-500 bg-gray-50 font-bold p-1 rounded mt-2 cursor-pointer border border-blue-500"
									style="font-size: 10px;"
									on:click={() => showOnepanValue(m)}
								>
									1撃で倒すには?
								</div>
							{/if}
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.one-punch {
		@apply bg-red-50 text-gray-700;
	}

	.two-punch {
		@apply bg-yellow-50 text-gray-700;
	}

	.one-punch-line {
		@apply bg-red-500 text-center text-white  text-xs font-bold;
	}

	.two-punch-line {
		@apply bg-yellow-500 text-center text-white text-xs font-bold;
	}

	.more-punch-line {
		@apply bg-gray-500 text-center text-white text-xs font-bold;
	}
</style>
