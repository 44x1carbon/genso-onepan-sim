<script lang="ts">
	import MealData from '../../MealData';
	import Step from '../../components/Step.svelte';
	import PortionData from '../../PortionData';
	import { toPng } from 'html-to-image';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import tourSetup from '../../lib/houly/Tour';
	import ExpTableData from '../../ExpTableData';
	import ShareFab from '../../components/ShareFAB.svelte';
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

	const SAVE_KEY = 'GENSO-HOULY-DATA';

	let step: number = 0;
	let maxStep: number = 0;
	let step2: number = 0;
	let maxStep2: number = 0;
	let funClubCardList = {
		なし: 1,
		レベル1: 0.97,
		レベル2: 0.94,
		レベル3: 0.9
	};
	let startTime: dayjs.Dayjs | undefined = undefined;

	let initialState = {
		baseEquipment: {
			右手: { isUnEquipped: false, condition: 100 },
			左手: { isUnEquipped: false, condition: 100 },
			胴: { isUnEquipped: false, condition: 100 },
			足: { isUnEquipped: false, condition: 100 },
			頭: { isUnEquipped: false, condition: 100 },
			背中: { isUnEquipped: false, condition: 100 },
			肩: { isUnEquipped: false, condition: 100 },
			指輪: { isUnEquipped: false, condition: 100 }
		},
		cosplayEquipment: {
			右手: { isUnEquipped: false, condition: 100 },
			左手: { isUnEquipped: false, condition: 100 },
			胴: { isUnEquipped: false, condition: 100 },
			足: { isUnEquipped: false, condition: 100 },
			頭: { isUnEquipped: false, condition: 100 },
			背中: { isUnEquipped: false, condition: 100 },
			肩: { isUnEquipped: false, condition: 100 }
		},
		portion: {
			hp: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
				6: 0
			},
			mp: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
				6: 0
			}
		},
		meal: new Array(5).fill(null).map(() => {
			return {
				itemName: 'なし',
				num: 0
			};
		}),
		mR: 0,
		funClubCard: 'なし',
		exp: 0,
		level: 0,
		skillExp: 0,
		skillLevel: 0
	};

	let currentState = {
		baseEquipment: {
			右手: { condition: 100 },
			左手: { condition: 100 },
			胴: { condition: 100 },
			足: { condition: 100 },
			頭: { condition: 100 },
			背中: { condition: 100 },
			肩: { condition: 100 },
			指輪: { condition: 100 }
		},
		cosplayEquipment: {
			右手: { condition: 100 },
			左手: { condition: 100 },
			胴: { condition: 100 },
			足: { condition: 100 },
			頭: { condition: 100 },
			背中: { condition: 100 },
			肩: { condition: 100 }
		},
		portion: {
			hp: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
				6: 0
			},
			mp: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
				6: 0
			}
		},
		meal: new Array(5).fill(null).map(() => {
			return {
				num: 0
			};
		}),
		spring: {
			cost: 0,
			num: 0
		},
		mR: 0,
		workPlace: '',
		workingMinute: 60,
		exp: 0,
		level: 0,
		skillExp: 0,
		skillLevel: 0
	};

	let otherInfo = {
		baseEquipment: {
			右手: { condition: 0, cost: 0 },
			左手: { condition: 0, cost: 0 },
			胴: { condition: 0, cost: 0 },
			足: { condition: 0, cost: 0 },
			頭: { condition: 0, cost: 0 },
			背中: { condition: 0, cost: 0 },
			肩: { condition: 0, cost: 0 },
			指輪: { condition: 0, cost: 0 }
		},
		cosplayEquipment: {
			右手: { condition: 0, cost: 0 },
			左手: { condition: 0, cost: 0 },
			胴: { condition: 0, cost: 0 },
			足: { condition: 0, cost: 0 },
			頭: { condition: 0, cost: 0 },
			背中: { condition: 0, cost: 0 },
			肩: { condition: 0, cost: 0 }
		},
		rate: {
			'MV-mMV': 0.1631,
			'ROND-mRond': 0.0135,
			'MV-USD': 0.1631,
			'ROND-USD': 0.0135,
			'USD-JPY': 129.56,
			'ファミチキ-JPY': 220
		},
		isCalcExp: false
	};

	function baseEquipmentDiffCnd() {
		return {
			右手: initialState.baseEquipment.右手.condition - currentState.baseEquipment.右手.condition,
			左手: initialState.baseEquipment.左手.condition - currentState.baseEquipment.左手.condition,
			胴: initialState.baseEquipment.胴.condition - currentState.baseEquipment.胴.condition,
			足: initialState.baseEquipment.足.condition - currentState.baseEquipment.足.condition,
			頭: initialState.baseEquipment.頭.condition - currentState.baseEquipment.頭.condition,
			背中: initialState.baseEquipment.背中.condition - currentState.baseEquipment.背中.condition,
			肩: initialState.baseEquipment.肩.condition - currentState.baseEquipment.肩.condition,
			指輪: initialState.baseEquipment.右手.condition - currentState.baseEquipment.指輪.condition
		};
	}

	function cosplayEquipmentDiffCnd() {
		return {
			右手:
				initialState.cosplayEquipment.右手.condition - currentState.cosplayEquipment.右手.condition,
			左手:
				initialState.cosplayEquipment.左手.condition - currentState.cosplayEquipment.左手.condition,
			胴: initialState.cosplayEquipment.胴.condition - currentState.cosplayEquipment.胴.condition,
			足: initialState.cosplayEquipment.足.condition - currentState.cosplayEquipment.足.condition,
			頭: initialState.cosplayEquipment.頭.condition - currentState.cosplayEquipment.頭.condition,
			背中:
				initialState.cosplayEquipment.背中.condition - currentState.cosplayEquipment.背中.condition,
			肩: initialState.cosplayEquipment.肩.condition - currentState.cosplayEquipment.肩.condition
		};
	}

	function usedPortionNum() {
		return {
			hp: {
				1: initialState.portion.hp[1] - currentState.portion.hp[1],
				2: initialState.portion.hp[2] - currentState.portion.hp[2],
				3: initialState.portion.hp[3] - currentState.portion.hp[3],
				4: initialState.portion.hp[4] - currentState.portion.hp[4],
				5: initialState.portion.hp[5] - currentState.portion.hp[5],
				6: initialState.portion.hp[6] - currentState.portion.hp[6]
			},
			mp: {
				1: initialState.portion.mp[1] - currentState.portion.mp[1],
				2: initialState.portion.mp[2] - currentState.portion.mp[2],
				3: initialState.portion.mp[3] - currentState.portion.mp[3],
				4: initialState.portion.mp[4] - currentState.portion.mp[4],
				5: initialState.portion.mp[5] - currentState.portion.mp[5],
				6: initialState.portion.mp[6] - currentState.portion.mp[6]
			}
		};
	}

	function usedMealNum() {
		return initialState.meal.map((initialMeal, i) => {
			return {
				...initialMeal,
				num: initialMeal.num - currentState.meal[i].num
			};
		});
	}

	function baseEquipmentRepairCosts() {
		const _baseEquipmentDiffCnd = baseEquipmentDiffCnd();
		return Object.fromEntries(
			Object.keys(currentState.baseEquipment).map((pos) => {
				if (initialState.baseEquipment[pos].condition === 100) {
					return [pos, otherInfo.baseEquipment[pos].cost];
				}

				// 100%と狩り後のCNDの差分
				const diffCndFrom100 = 100 - currentState.baseEquipment[pos].condition;
				// 初期時と狩り後のCNDの差分
				const diffCnd = _baseEquipmentDiffCnd[pos] || 1;

				let cost =
					diffCndFrom100 === 0
						? otherInfo.baseEquipment[pos].cost
						: Math.floor(otherInfo.baseEquipment[pos].cost / diffCnd / diffCndFrom100);

				return [pos, cost];
			})
		);
	}

	function cosplayEquipmentRepairCosts() {
		const _cosplayEquipmentDiffCnd = cosplayEquipmentDiffCnd();
		return Object.fromEntries(
			Object.keys(currentState.cosplayEquipment).map((pos) => {
				if (initialState.cosplayEquipment[pos].condition === 100) {
					return [pos, otherInfo.cosplayEquipment[pos].cost];
				}

				// 100%と狩り後のCNDの差分
				const diffCndFrom100 = 100 - currentState.cosplayEquipment[pos].condition;
				// 初期時と狩り後のCNDの差分
				const diffCnd = _cosplayEquipmentDiffCnd[pos] || 1;

				let cost =
					diffCndFrom100 === 0
						? otherInfo.cosplayEquipment[pos].cost
						: Math.floor(otherInfo.cosplayEquipment[pos].cost / diffCnd / diffCndFrom100);

				return [pos, cost];
			})
		);
	}

	function baseEquipmentRepairCost() {
		const _baseEquipmentRepairCosts = baseEquipmentRepairCosts();
		return Math.floor(
			Object.entries(_baseEquipmentRepairCosts).reduce((p, c) => {
				let [pos, cost] = c;
				cost = initialState.baseEquipment[pos].isUnEquipped ? 0 : cost;
				return p + cost;
			}, 0)
		);
	}

	function cosplayEquipmentRepairCost() {
		const _cosplayEquipmentRepairCosts = cosplayEquipmentRepairCosts();
		return Math.floor(
			Object.entries(_cosplayEquipmentRepairCosts).reduce((p, c) => {
				let [pos, cost] = c;
				cost = initialState.cosplayEquipment[pos].isUnEquipped ? 0 : cost;
				return p + cost;
			}, 0)
		);
	}

	function portionCost() {
		const _usedPortionNum = usedPortionNum();
		return Math.floor(
			Object.entries(_usedPortionNum.hp).reduce((p, c) => {
				const [lv, num] = c;
				return p + PortionData.hp[lv] * num * funClubCardList[initialState.funClubCard];
			}, 0) +
				Object.entries(_usedPortionNum.mp).reduce((p, c) => {
					const [lv, num] = c;
					return p + PortionData.mp[lv] * num * funClubCardList[initialState.funClubCard];
				}, 0)
		);
	}

	function mealCost() {
		const _usedMealNum = usedMealNum();
		return Math.floor(
			_usedMealNum
				.map(
					({ itemName, num }) =>
						MealData[itemName] * num * funClubCardList[initialState.funClubCard]
				)
				.reduce((p, c) => p + c, 0)
		);
	}

	function springCost() {
		return Math.floor(currentState.spring.cost * currentState.spring.num);
	}

	function income() {
		return Math.floor(currentState.mR - initialState.mR);
	}

	function total() {
		return Math.floor(
			income() -
				baseEquipmentRepairCost() -
				cosplayEquipmentRepairCost() -
				portionCost() -
				mealCost()
		);
	}

	function hourlyPay() {
		if (currentState.workingMinute === 0) return 0;
		return Math.floor((total() / 10000 / (currentState.workingMinute / 60)) * 10000) / 10000;
	}

	function famchick() {
		return Math.floor(USD2JPY(hourlyPay()) / 220);
	}

	function exp() {
		if (currentState.level - initialState.level === 0) {
			return currentState.exp - initialState.exp;
		} else {
			// @ts-ignore
			return ExpTableData.level[initialState.level] - initialState.exp + currentState.exp;
		}
	}

	function skillExp() {
		if (currentState.skillLevel - initialState.skillLevel === 0) {
			return currentState.skillExp - initialState.skillExp;
		} else {
			return (
				// @ts-ignore
				ExpTableData.skill[initialState.skillLevel] - initialState.skillExp + currentState.skillExp
			);
		}
	}

	let result = {
		baseEquipmentRepairCost: 0,
		cosplayEquipmentRepairCost: 0,
		mealCost: 0,
		portionCost: 0,
		springCost: 0,
		income: 0,
		usd: 0,
		hourlyPay: 0,
		total: 0,
		famchick: 0,
		exp: 0,
		hourlyExp: 0,
		skillExp: 0,
		hourlySkillExp: 0
	};
	let isShowResult = false;

	function showResult() {
		result.baseEquipmentRepairCost = baseEquipmentRepairCost();
		result.cosplayEquipmentRepairCost = cosplayEquipmentRepairCost();
		result.mealCost = mealCost();
		result.portionCost = portionCost();
		result.springCost = springCost();
		result.income = income();
		result.usd = total() / 10000;
		result.hourlyPay = hourlyPay();
		result.total = total();
		result.famchick = famchick();
		result.exp = exp();
		result.hourlyExp = exp() / (currentState.workingMinute / 60);
		result.skillExp = skillExp();
		result.hourlySkillExp = skillExp() / (currentState.workingMinute / 60);

		setTimeout(() => {
			resultToImage();
			isShowResult = true;
		}, 100);
	}

	function resultToImage() {
		const node = document.getElementById('result');
		if (node !== null) {
			toPng(node).then((dataUrl) => {
				const img = document.getElementById('result-img') as HTMLImageElement;
				img.src = dataUrl;
			});
		}
	}

	setInterval(() => {
		if (browser) {
			console.log('SAVE', {
				initialState,
				currentState,
				otherInfo
			});
			localStorage.setItem(
				SAVE_KEY,
				JSON.stringify({
					initialState,
					currentState,
					otherInfo
				})
			);
		}
	}, 1000);

	onMount(() => {
		if (browser) {
			const json = localStorage.getItem(SAVE_KEY);
			if (json) {
				const data = JSON.parse(json);
				console.log(data);
				initialState = data.initialState;
				currentState = data.currentState;
				otherInfo = data.otherInfo;

				if (initialState.exp === undefined) initialState.exp = 0;
				if (initialState.level === undefined) initialState.level = 0;
				if (initialState.skillExp === undefined) initialState.skillExp = 0;
				if (initialState.skillLevel === undefined) initialState.skillLevel = 0;

				if (currentState.exp === undefined) currentState.exp = 0;
				if (currentState.level === undefined) currentState.level = 0;
				if (currentState.skillExp === undefined) currentState.skillExp = 0;
				if (currentState.skillLevel === undefined) currentState.skillLevel = 0;

				if (otherInfo.isCalcExp === undefined) otherInfo.isCalcExp = false;
			}
		}
	});

	function copyCurrentToInitial() {
		Object.entries(currentState.baseEquipment).forEach(([pos, { condition }]) => {
			initialState.baseEquipment[pos].condition = condition;
		});

		Object.entries(currentState.cosplayEquipment).forEach(([pos, { condition }]) => {
			initialState.cosplayEquipment[pos].condition = condition;
		});

		initialState.portion = JSON.parse(JSON.stringify(currentState.portion));

		currentState.meal.forEach(({ num }, i) => {
			initialState.meal[i].num = num;
		});

		initialState.mR = currentState.mR;
	}

	function repairEquipment() {
		Object.keys(initialState.baseEquipment).forEach((pos) => {
			initialState.baseEquipment[pos].condition = 100;
		});

		Object.keys(initialState.cosplayEquipment).forEach((pos) => {
			initialState.cosplayEquipment[pos].condition = 100;
		});
	}

	function USD2JPY(USD: number) {
		const JPY = USD * 130;

		return Math.floor(JPY);
	}

	function exportData() {
		let element = document.createElement('a');
		element.href =
			'data:text/json;charset=utf-8,' +
			encodeURIComponent(
				JSON.stringify({
					initialState,
					currentState,
					otherInfo
				})
			);
		element.download = 'data.txt';
		element.target = '_blank';
		element.click();
	}

	function reset() {
		localStorage.removeItem(SAVE_KEY);
		location.reload();
	}

	function changePortion() {
		currentState.portion = JSON.parse(JSON.stringify(initialState.portion));
	}
</script>

<svelte:head>
	<title>IGNIS TOOLS - 時給計算機(α版)</title>
	<meta name="description" content="元素騎士オンラインの時給を計算できるツールです。" />
	<meta name="keywords" content="元素騎士オンライン,元素騎士,時給計算機,時給" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ignis-tools.vercel.app/hourly" />
	<meta
		property="og:image"
		content="https://pbs.twimg.com/media/FnNZYswaEAEfNCo?format=jpg&name=900x900"
	/>
</svelte:head>
<div class="md:w-[74rem] mx-auto">
	<div class="text-2xl font-bold">時給計算機</div>
</div>

<div class="md:flex md:gap-4 md:mx-auto md:w-fit mt-4 items-start">
	<div class="md:w-96" id="InitialStateInput">
		<div class="heading mt-4 md:mt-0">狩り前に入力してください。</div>
		<div class="border shadow border-well-read-700 bg-chocolate-900 panel">
			<div class="h-[24rem]">
				<Step {step} bind:maxStep>
					<section>
						<div class="heading2">ベース装備の情報を入力してください</div>
						<div>
							{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩', '指輪'] as pos}
								<div class="form-row">
									<div class="form-label w-12">{pos}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex items-center  flex-1">
											{#if initialState.baseEquipment[pos].isUnEquipped === false}
												<div class="text-xs">CND:</div>
												<input
													type="number"
													class="border w-20 ml-2"
													bind:value={initialState.baseEquipment[pos].condition}
												/>
											{/if}
										</div>

										<div class="flex items-center">
											<label for={`baseEquipment-${pos}`} class="">
												<input
													id={`baseEquipment-${pos}`}
													type="checkbox"
													class="w-fit mr-1"
													bind:checked={initialState.baseEquipment[pos].isUnEquipped}
												/>未装備
											</label>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<section>
						<div class="heading2">おしゃれ装備の情報を入力してください</div>
						<div>
							{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩'] as pos}
								<div class="form-row">
									<div class="form-label w-12">{pos}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex items-center  flex-1">
											{#if initialState.cosplayEquipment[pos].isUnEquipped === false}
												<div class="text-xs">CND:</div>
												<input
													type="number"
													class="border w-20 ml-2"
													bind:value={initialState.cosplayEquipment[pos].condition}
												/>
											{/if}
										</div>

										<div class="flex items-center">
											<label for={`cosplayEquipment-${pos}`} class="">
												<input
													id={`cosplayEquipment-${pos}`}
													type="checkbox"
													class="w-fit mr-1"
													bind:checked={initialState.cosplayEquipment[pos].isUnEquipped}
												/>未装備
											</label>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<section>
						<div class="heading2">現在持っているポーションの個数を入力してください</div>
						<div class="flex flex-wrap">
							{#each [1, 2, 3, 4, 5, 6] as lv}
								<div class="form-row w-1/2">
									<div class="form-label w-20 xs">HP Lv{lv}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex  items-center">
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={initialState.portion.hp[lv]}
												on:change={changePortion}
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
						<div class="flex flex-wrap mt-4">
							{#each [1, 2, 3, 4, 5, 6] as lv}
								<div class="form-row  w-1/2">
									<div class="form-label w-20 xs">MP Lv{lv}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex  items-center">
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={initialState.portion.mp[lv]}
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<section>
						<div class="heading2">現在持っている食事の情報を入力してください</div>
						<div>
							{#each initialState.meal as _, i}
								<div class="form-row">
									<div class="form-label w-14">食事{i + 1}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex items-center">
											<select class="ml-2 px-1 text-xs" bind:value={initialState.meal[i].itemName}>
												{#each Object.keys(MealData) as meal}
													<option value={meal}>{meal}</option>
												{/each}
											</select>
										</div>
										<div class="flex  items-center">
											<div class="text-xs flex-1">個数:</div>
											<input
												type="number"
												class="border w-10 ml-2 text-xs"
												bind:value={initialState.meal[i].num}
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<section>
						<div class="heading2">現在の所持金・EXP・スキルEXPを入力してください</div>
						<div>
							<div class="form-row">
								<div class="form-label w-40">所持 mR</div>
								<div class="form-controll">
									<input type="number" class="border w-24" bind:value={initialState.mR} /><span
										class="bg-gray-900 px-1 border border-gray-900">mR</span
									>
								</div>
							</div>
							<div class="form-row">
								<div class="form-label w-40">ファンクラブ会員権</div>
								<div class="form-controll">
									<select bind:value={initialState.funClubCard}>
										<option value="なし">なし</option>
										<option value="レベル1">レベル1</option>
										<option value="レベル2">レベル2</option>
										<option value="レベル3">レベル3</option>
									</select>
								</div>
							</div>
							<div class="form-row">
								<div class="form-label w-40">経験値も計算する</div>
								<div class="form-controll">
									<input type="checkbox" bind:checked={otherInfo.isCalcExp} />
								</div>
							</div>
							{#if otherInfo.isCalcExp}
								<div class="form-row">
									<div class="form-label w-40">レベル</div>
									<div class="form-controll">
										<input
											type="number"
											class="border"
											bind:value={initialState.level}
											on:input={() => (currentState.level = initialState.level)}
										/>
									</div>
								</div>
								<div class="form-row">
									<div class="form-label w-40">経験値</div>
									<div class="form-controll">
										<input type="number" class="border" bind:value={initialState.exp} />
									</div>
								</div>

								<div class="form-row">
									<div class="form-label w-40">スキルレベル</div>
									<div class="form-controll">
										<input
											type="number"
											class="border"
											bind:value={initialState.skillLevel}
											on:input={() => (currentState.skillLevel = initialState.skillLevel)}
										/>
									</div>
								</div>
								<div class="form-row">
									<div class="form-label w-40">スキル経験値</div>
									<div class="form-controll">
										<input type="number" class="border" bind:value={initialState.skillExp} />
									</div>
								</div>
							{/if}
						</div>
					</section>
				</Step>
			</div>
			<div class="flex justify-between p-2">
				<div class="btn normal w-20 text-center cursor-pointer" on:click={() => (step -= 1)}>
					戻る
				</div>
				<div>
					{step + 1}/{maxStep}
				</div>
				<div class="btn normal w-20 text-center  cursor-pointer" on:click={() => (step += 1)}>
					次へ
				</div>
			</div>
		</div>

		<div class="mt-2 flex flex-col gap-2">
			<button class="btn w-full block" on:click={() => (startTime = dayjs())}
				>狩り開始時間を記録</button
			>

			<button class="btn normal w-full block" on:click={copyCurrentToInitial}
				>狩り後のデータをコピー</button
			>

			<button class="btn normal w-full block" on:click={repairEquipment}
				>ベース・おしゃれをCND100に設定</button
			>
		</div>
	</div>
	<div class="md:w-96">
		<div class="heading mt-4 md:mt-0">狩り後に入力してください。</div>
		<div class="border shadow border-well-read-700 bg-chocolate-900 panel">
			<div class="h-[24rem]">
				<Step step={step2} bind:maxStep={maxStep2}>
					<section>
						<div class="heading2">
							ベース装備の修理費を入力してください<br /><span class="text-xs"
								>・修理屋で表示されている金額を入力してください</span
							><br /><span class="text-xs">・時給計算前に修理はしないでください</span>
						</div>
						<div>
							{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩', '指輪'] as pos}
								<div class="form-row">
									<div class="form-label w-12 xs">{pos}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex  items-center flex-1">
											{#if initialState.baseEquipment[pos].condition !== 100}
												<div class="text-xs">CND:</div>
												<input
													type="number"
													class="border w-20 ml-2"
													bind:value={currentState.baseEquipment[pos].condition}
												/>
											{/if}
										</div>
										<div class="flex  items-center flex-1">
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={otherInfo.baseEquipment[pos].cost}
											/><span class="bg-gray-900 px-1 border border-gray-900">mR</span>
										</div>
									</div>
								</div>
							{/each}

							<div class="text-xs p-2">
								※CNDは今回の狩りでかかった費用を計算する為に使用しています。
							</div>
						</div>
					</section>

					<section>
						<div class="heading2">
							おしゃれ装備の修理費を入力してください<br /><span class="text-xs"
								>・修理屋で表示されている金額を入力してください</span
							><br /><span class="text-xs">・時給計算前に修理はしないでください</span>
						</div>
						<div class="">
							{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩'] as pos}
								<div class="form-row">
									<div class="form-label w-12 xs">{pos}</div>
									<div class="form-controll flex flex-1 gap-4 border-r border-well-read-900">
										<div class="flex items-center flex-1">
											{#if initialState.cosplayEquipment[pos].condition !== 100}
												<div class="text-xs">CND:</div>
												<input
													type="number"
													class="border w-20 ml-2"
													bind:value={currentState.cosplayEquipment[pos].condition}
												/>
											{/if}
										</div>

										<div class="flex  items-center flex-1">
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={otherInfo.cosplayEquipment[pos].cost}
											/><span class="bg-gray-900 px-1 border border-gray-900">mMV</span>
										</div>
									</div>
								</div>
							{/each}

							<div class="text-xs p-2">
								※CNDは今回の狩りでかかった費用を計算する為に使用しています。
							</div>
						</div>
					</section>

					<section>
						<div class="heading2">現在持っているポーションの個数を入力してください</div>
						<div class="flex flex-wrap">
							{#each [1, 2, 3, 4, 5, 6] as lv}
								<div class="form-row w-1/2 ">
									<div class="form-label w-20 xs">HP Lv{lv}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex  items-center">
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={currentState.portion.hp[lv]}
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
						<div class="flex flex-wrap mt-4">
							{#each [1, 2, 3, 4, 5, 6] as lv}
								<div class="form-row  w-1/2">
									<div class="form-label w-20 xs">MP Lv{lv}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex  items-center">
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={currentState.portion.mp[lv]}
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<section>
						<div class="heading2">現在持っている食事の情報を入力してください</div>
						<div>
							{#each currentState.meal as _, i}
								<div class="form-row">
									<div class="form-label w-14">食事{i + 1}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex items-center flex-1">
											<div class="px-1">{initialState.meal[i].itemName}</div>
										</div>
										<div class="flex  items-center">
											<div class="text-xs flex-1">個数:</div>
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={currentState.meal[i].num}
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<section>
						<div class="heading2">精霊の泉の情報を入力してください</div>
						<div>
							<div class="form-row">
								<div class="form-label w-28">1回の費用</div>
								<div class="form-controll flex flex-1 gap-4">
									<div class="flex  items-center">
										<div class="text-xs flex-1" />
										<div class="flex items-center ml-2">
											<span class="text-md mr-1">約</span>
											<input
												type="number"
												class="border w-20"
												bind:value={currentState.spring.cost}
											/>
											<span class="bg-gray-900 px-1 border border-gray-900">mR</span>
										</div>
									</div>
								</div>
							</div>
							<div class="form-row">
								<div class="form-label w-28">回数</div>
								<div class="form-controll flex flex-1 gap-4">
									<div class="flex  items-center">
										<input
											type="number"
											class="border w-20 ml-2"
											bind:value={currentState.spring.num}
										/>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section>
						<div class="heading2">現在の所持金・経験値を入力してください</div>
						<div class="form-row">
							<div class="form-label w-36">働いた時間</div>
							<div class="form-controll flex flex-col">
								<div class="flex">
									<input
										type="number"
										class="border flex-1"
										bind:value={currentState.workingMinute}
									/><span class="bg-gray-900 px-1 border border-gray-900">分</span>
								</div>

								{#if startTime}
									<div class="text-sm">開始時間：{startTime.format('MM/DD HH:mm')}</div>
								{/if}
							</div>
						</div>

						<div class="form-row">
							<div class="form-label w-36">現在の所持 mR</div>
							<div class="form-controll flex items-center">
								<input type="number" class="border w-24" bind:value={currentState.mR} /><span
									class="bg-gray-900 px-1 border border-gray-900">mR</span
								>
							</div>
						</div>

						{#if otherInfo.isCalcExp}
							<div class="form-row">
								<div class="form-label w-36">レベル</div>
								<div class="form-controll">
									<input type="number" class="border" bind:value={currentState.level} />
								</div>
							</div>
							<div class="form-row">
								<div class="form-label w-36">経験値</div>
								<div class="form-controll">
									<input type="number" class="border" bind:value={currentState.exp} />
								</div>
							</div>

							<div class="form-row">
								<div class="form-label w-36">スキルレベル</div>
								<div class="form-controll">
									<input type="number" class="border" bind:value={currentState.skillLevel} />
								</div>
							</div>
							<div class="form-row">
								<div class="form-label w-36">スキル経験値</div>
								<div class="form-controll">
									<input type="number" class="border" bind:value={currentState.skillExp} />
								</div>
							</div>
						{/if}
					</section>
				</Step>
			</div>
			<div class="flex justify-between p-2">
				<div class="btn normal w-20 text-center cursor-pointer" on:click={() => (step2 -= 1)}>
					戻る
				</div>
				<div>
					{step2 + 1}/{maxStep2}
				</div>
				<div class="btn normal w-20 text-center cursor-pointer" on:click={() => (step2 += 1)}>
					次へ
				</div>
			</div>
		</div>

		<button class="btn normal w-full block mt-2" on:click={reset}>入力をリセット</button>
		<div class="text-xs mt-1">結果がおかしい場合は一度入力をリセットして再度試して下さい。</div>
	</div>

	<div class="md:w-96 md:mx-auto panel mt-4 md:mt-0 border border-well-read-700">
		<div class="heading">収支</div>
		<div class="p-4">
			{#if isShowResult}
				<img src="" id="result-img" class="mt-1 md:mx-auto md:w-96" />
				<div class="text-center leading-tight p-1 bg-mai-tai-900 text-white w-full text-sm">
					画像をダウンロードしてツイートしよう！<br />
					<span class="text-xs leading-tight"
						>スマホは画像長押し<br />PCは右クリックでダウンロードできます</span
					>
				</div>

				<div class="px-2 text-xs">
					※USD-JPYのレートや装備修理費など正確に計算できない部分がある為、この数値は参考程度にお使いください。
				</div>

				<!-- <button class="btn mt-4 mb-4  md:mx-auto w-full" on:click={exportData}
					>入力内容をダウンロード</button
				> -->
				<a
					class="bg-blue-400 text-white font-bold w-full text-center rounded p-2 mt-2 mb-2 block"
					target="_blunk"
					href={`https://twitter.com/intent/tweet?text=${encodeURI(
						`
元素騎士オンライン 今日の時給は${USD2JPY(result.hourlyPay)}円！!
{時給の画像を貼り付けて、ここにコメントを入れよう！}

↓時給計算はこちらから\n`.trimStart()
					)}&url=https://ignis-tools.vercel.app/hourly&hashtags=元素騎士,元素騎士ファミチキチャレンジ`}
				>
					ツイートする
				</a>
			{/if}
			<button class="btn w-full block" on:click={showResult}>時給を計算する</button>
		</div>
		<div class="md:w-96 md:block hidden md:mb-4 text-center">
			<ins
				class="adsbygoogle"
				style="display:block"
				data-ad-client="ca-pub-9799169908631652"
				data-ad-slot="1970657218"
				data-ad-format="auto"
				data-full-width-responsive="true"
			/>
		</div>
	</div>
</div>

<div
	class="bg-orange-900 text-white result font-bold border-4 border-amber-400 rounded p-2 fixed top-0 left-0 w-full -z-50 md:w-96"
	id="result"
>
	<div class="flex justify-between">
		<div>労働時間</div>
	</div>
	<div class="flex justify-between mt-2">
		<div>収入</div>
		<div class="text-green-500">+{result.income}mR</div>
	</div>
	<div class="flex justify-between mt-2">
		<div>ベース装備修理費</div>
		<div class="text-red-500">-{result.baseEquipmentRepairCost}mR</div>
	</div>
	<div class="flex justify-between">
		<div>おしゃれ装備修理費</div>
		<div class="text-right text-red-500">
			-{result.cosplayEquipmentRepairCost}mR<br />(-{result.cosplayEquipmentRepairCost}mMV)
		</div>
	</div>

	<div class="flex justify-between mt-2">
		<div>お薬代</div>
		<div class="text-red-500">-{result.portionCost}mR</div>
	</div>

	<div class="flex justify-between mt-2">
		<div>お食事代</div>
		<div class="text-red-500">-{result.mealCost}mR</div>
	</div>

	<div class="flex justify-between mt-2">
		<div>泉代</div>
		<div class="text-red-500">-{result.springCost}mR</div>
	</div>

	<div class="flex justify-between mt-2 border-t-2 pt-1">
		<div>収支</div>
		<div class={result.total === 0 ? '' : result.total > 0 ? 'text-green-500' : 'text-red-500'}>
			{result.total === 0 ? '±' : result.total > 0 ? '+' : ''}{result.total}mR
		</div>
	</div>
	<div class="flex justify-between mt-2">
		<div>USD換算</div>
		<div>${result.usd}</div>
	</div>
	<div class="flex justify-between mt-2">
		<div>円換算(1$ = 130円)</div>
		<div>{USD2JPY(result.usd)}円</div>
	</div>
	<div class="flex justify-between mt-2">
		<div>時給</div>
		<div>${result.hourlyPay}({USD2JPY(result.hourlyPay)}円)</div>
	</div>
	<div class="flex justify-between">
		<div />
		<div class="text-sm">
			({result.famchick}ファミチキ)
		</div>
	</div>
	{#if otherInfo.isCalcExp}
		<div class="flex justify-between mt-2 border-t-2 pt-1">
			<div>経験値</div>
			<div class="text-green-500">
				+{result.exp}
			</div>
		</div>
		<div class="flex justify-between mt-0 pt-1">
			<div>経験値(時給)</div>
			<div class="text-green-500">
				+{result.hourlyExp}
			</div>
		</div>
		<div class="flex justify-between mt-2 pt-1">
			<div>スキル経験値</div>
			<div class="text-green-500">
				+{result.skillExp}
			</div>
		</div>
		<div class="flex justify-between mt-0 pt-1">
			<div>スキル経験値(時給)</div>
			<div class="text-green-500">
				+{result.hourlySkillExp}
			</div>
		</div>
	{/if}
</div>

<ShareFab
	tweetBody={`【元素騎士 時給計算機】\nあなたの今の時給は何円？？\n狩場の効率検証にも便利！`}
/>

<style>
	.result * {
		text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, 0px 1px 0 #000,
			0 -1px 0 #000, -1px 0 0 #000, 1px 0 0 #000;
	}
</style>
