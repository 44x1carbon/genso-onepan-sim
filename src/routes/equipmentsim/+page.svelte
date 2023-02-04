<script lang="ts">
	import _JobData from '../../JobData';
	import type { JobData } from '../../JobData';
	import BaseEquipmentData from '../../BaseEquipmentData';
	import CosplayEquipmentData from '../../CosplayEquipmentData';
	import { base } from '$app/paths';

	let data = {
		job: _JobData[0] as JobData | undefined,
		baseEquipment: {
			右手: {
				name: '',
				level: 1
			},
			左手: {
				name: '',
				level: 1
			},
			胴: {
				name: '',
				level: 1
			},
			足: {
				name: '',
				level: 1
			},
			頭: {
				name: '',
				level: 1
			},
			背中: {
				name: '',
				level: 1
			},
			肩: {
				name: '',
				level: 1
			},
			指輪: {
				name: '',
				level: 1
			}
		},
		cosplayEquipment: {
			右手: {
				name: '',
				level: 1
			},
			左手: {
				name: '',
				level: 1
			},
			胴: {
				name: '',
				level: 1
			},
			足: {
				name: '',
				level: 1
			},
			頭: {
				name: '',
				level: 1
			},
			背中: {
				name: '',
				level: 1
			},
			肩: {
				name: '',
				level: 1
			}
		},
		status: {
			armStrength: 0,
			stamina: 0,
			brains: 0,
			mind: 0,
			speed: 0,
			skillful: 0
		}
	};

	$: baseStatus = {
		armStrength: data.status.armStrength + totalEquipmentState('armStrength'),
		stamina: data.status.stamina + totalEquipmentState('stamina'),
		brains: data.status.brains + totalEquipmentState('brains'),
		mind: data.status.mind + totalEquipmentState('mind'),
		speed: data.status.speed + totalEquipmentState('speed'),
		skillful: data.status.skillful + totalEquipmentState('skillful')
	};

	$: status = Object.entries(
		Object.entries(baseStatus).reduce(
			(p, c) => {
				if (data.job) {
					p = Object.entries(data.job.elevatedValue[c[0]]).reduce((p2, c2) => {
						if (p2[c2[0]] === undefined) {
							p2[c2[0]] = 0;
						}

						for (let level = 1; level <= c[1]; level++) {
							p2[c2[0]] += c2[1](level);
						}

						return p2;
					}, p);
				}

				return p;
			},
			data.job
				? JSON.parse(JSON.stringify(data.job.initialState))
				: ({} as { [key: string]: number })
		)
	).reduce((p, c) => {
		// console.log(c[0], totalEquipmentState(c[0]));
		p[c[0]] = Math.floor(c[1] + totalEquipmentState(c[0]));
		return p;
	}, {} as { [key: string]: number });

	const totalEquipmentState = (key: string): number => {
		const baseEquipmentList = Object.values(data.baseEquipment) as {
			name: string;
			level: number;
		}[];
		const cosplayEquipmentList = Object.values(data.cosplayEquipment) as {
			name: string;
			level: number;
		}[];

		return [
			...baseEquipmentList.map(({ name, level }) => {
				if (name === '') {
					return 0;
				}

				const baseEquipment = BaseEquipmentData.find(
					(baseEquipment) => baseEquipment.nameJp === name
				);

				console.log(key, baseEquipment[key]);
				if (baseEquipment === undefined) {
					return 0;
				} else if (baseEquipment[key] === '-' || baseEquipment[key] === undefined) {
					return 0;
				} else {
					return parseFloat(baseEquipment[key]) * (1 + 0.064 * level);
				}
			}),
			...cosplayEquipmentList.map(({ name, level }) => {
				if (name === '') {
					return 0;
				}

				const cosplayEquipment = CosplayEquipmentData.find(
					(cosplayEquipment) => cosplayEquipment.nameJp === name
				);

				console.log(key, cosplayEquipment[key]);
				if (cosplayEquipment === undefined) {
					return 0;
				} else if (cosplayEquipment[key] === '-' || cosplayEquipment[key] === undefined) {
					return 0;
				} else {
					return parseFloat(cosplayEquipment[key]) * (1 + 0.064 * level);
				}
			})
		].reduce((p, c) => p + c, 0);
	};

	function filterBaseEquipmentData(pos: string, data: any) {
		return BaseEquipmentData.filter((baseEquipment) => baseEquipment.pos === pos).filter(
			// @ts-ignore
			(baseEquipment) => (data.job ? baseEquipment[data.job.name] === '○' : false)
		);
	}

	function filterCosplayEquipmentData(pos: string, data: any) {
		return CosplayEquipmentData.filter((cosplayEquipment) => cosplayEquipment.pos === pos);
	}
</script>

<svelte:head>
	<title>IGNIS TOOLS - 装備シミュレーター(α版)</title>
	<meta name="description" content="元素騎士オンラインのダメージを計算できるツールです。" />
	<meta name="keywords" content="元素騎士オンライン,元素騎士,ダメージ計算機,ダメージ" />
</svelte:head>

<div class="p-4 bg-gray-700 mb-4">
	<select bind:value={data.job}>
		<option value={undefined}>職業を選んで下さい</option>
		{#each _JobData as job}
			<option value={job}>{job.name}</option>
		{/each}
	</select>
</div>

<div class="flex gap-4">
	<div class="w-96 bg-gray-700 p-4">
		<div>ベース装備</div>
		{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩', '指輪'] as pos}
			<div class="flex">
				<div>
					{pos}
				</div>
				<div>
					<select bind:value={data.baseEquipment[pos].name}>
						<option value="">未装備</option>
						{#each filterBaseEquipmentData(pos, data) as baseEquipment}
							<option value={baseEquipment.nameJp}
								>{baseEquipment.nameJp} Lv.{baseEquipment.lv}</option
							>
						{/each}
					</select>
					<input type="number" bind:value={data.baseEquipment[pos].level} />
				</div>
			</div>
		{/each}
	</div>

	<div class="w-96 bg-gray-700 p-4">
		<div>おしゃれ装備</div>
		{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩'] as pos}
			<div class="flex">
				<div>
					{pos}
				</div>
				<div>
					<select bind:value={data.cosplayEquipment[pos].name}>
						<option value="">未装備</option>
						{#each filterCosplayEquipmentData(pos, data) as cosplayEquipment}
							<option value={cosplayEquipment.nameJp}
								>{cosplayEquipment.nameJp.replace('（右）', '')}</option
							>
						{/each}
					</select>
					<input type="number" bind:value={data.cosplayEquipment[pos].level} />
				</div>
			</div>
		{/each}
	</div>

	<div class="w-96 bg-gray-700 p-4">
		<div>ステータス</div>
		<div>
			<div>
				<div>腕力</div>
				<div>
					<input type="number" bind:value={data.status.armStrength} />
				</div>
			</div>
			<div>
				<div>体力</div>
				<div>
					<input type="number" bind:value={data.status.stamina} />
				</div>
			</div>
			<div>
				<div>精神</div>
				<div>
					<input type="number" bind:value={data.status.mind} />
				</div>
			</div>
			<div>
				<div>知力</div>
				<div>
					<input type="number" bind:value={data.status.brains} />
				</div>
			</div>
			<div>
				<div>速さ</div>
				<div>
					<input type="number" bind:value={data.status.speed} />
				</div>
			</div>
			<div>
				<div>器用</div>
				<div>
					<input type="number" bind:value={data.status.skillful} />
				</div>
			</div>
		</div>
	</div>
</div>

<div class="mt-4 bg-gray-700 flex gap-4">
	<div>
		<div>
			腕力: {(data.job ? data.job.initialBaseState.armStrength : 0) + baseStatus.armStrength}
		</div>
		<div>
			体力: {(data.job ? data.job.initialBaseState.stamina : 0) + baseStatus.stamina}
		</div>
		<div>
			精神: {(data.job ? data.job.initialBaseState.mind : 0) + baseStatus.mind}
		</div>
		<div>
			知力: {(data.job ? data.job.initialBaseState.brains : 0) + baseStatus.brains}
		</div>
		<div>
			速さ: {(data.job ? data.job.initialBaseState.speed : 0) + baseStatus.speed}
		</div>
		<div>
			器用: {(data.job ? data.job.initialBaseState.skillful : 0) + baseStatus.skillful}
		</div>
	</div>
	<div>
		<div>
			MaxHP: {status.maxHp}
		</div>
		<div>
			MaxMP: {status.maxMp}
		</div>
		<div>
			攻撃力: {status.attack}
		</div>
		<div>
			防御力: {status.defense}
		</div>
		<div>
			魔法攻撃力: {status.magicAttack}
		</div>
		<div>
			回復魔力: {status.healMagicPower}
		</div>
		<div>
			状態異常耐性: {status.abnormalityResistance}
		</div>
		<div>
			クリティカル耐性: {status.criticalResistance}
		</div>
		<div>
			回避値: {status.avoidanceRate}
		</div>
		<div>
			命中値: {status.accuracyRate}
		</div>
		<div>
			物理クリティカル値: {status.physicalCriticalRate}
		</div>
		<div>
			魔法クリティカル値: {status.magicCriticalRate}
		</div>
	</div>
</div>
