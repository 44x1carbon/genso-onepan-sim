<script lang="ts">
	import MealData from '../../MealData';
	import Step from '../../components/Step.svelte';
	import PortionData from '../../PortionData';
	import { toPng } from 'html-to-image';
	import { browser } from '$app/environment';

	let step: number = 0;
	let maxStep: number = 0;
	let step2: number = 0;
	let maxStep2: number = 0;
	let step3: number = 0;
	let maxStep3: number = 0;
	let funClubCardList = {
		なし: 1,
		レベル1: 0.97,
		レベル2: 0.94,
		レベル3: 0.9
	};

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
				itemName: 'チーズの欠片',
				num: 10
			};
		}),
		mR: 0,
		funClubCard: 'なし'
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
				num: 5
			};
		}),
		spring: {
			cost: 5000,
			num: 4
		},
		mR: 500000,
		workPlace: '',
		workingMinute: 60
	};

	let otherInfo = {
		baseEquipment: {
			右手: { condition: 0, cost: 1000 },
			左手: { condition: 0, cost: 1000 },
			胴: { condition: 0, cost: 1000 },
			足: { condition: 0, cost: 1000 },
			頭: { condition: 0, cost: 1000 },
			背中: { condition: 0, cost: 1000 },
			肩: { condition: 0, cost: 1000 },
			指輪: { condition: 0, cost: 1000 }
		},
		cosplayEquipment: {
			右手: { condition: 0, cost: 1000 },
			左手: { condition: 0, cost: 1000 },
			胴: { condition: 0, cost: 1000 },
			足: { condition: 0, cost: 1000 },
			頭: { condition: 0, cost: 1000 },
			背中: { condition: 0, cost: 1000 },
			肩: { condition: 0, cost: 1000 }
		},
		rate: {
			'MV-mMV': 0.1631,
			'ROND-mRond': 0.0135,
			'MV-USD': 0.1631,
			'ROND-USD': 0.0135,
			'USD-JPY': 129.56,
			'ファミチキ-JPY': 220
		}
	};

	$: baseEquipmentDiffCnd = {
		右手: initialState.baseEquipment.右手.condition - currentState.baseEquipment.右手.condition,
		左手: initialState.baseEquipment.左手.condition - currentState.baseEquipment.左手.condition,
		胴: initialState.baseEquipment.胴.condition - currentState.baseEquipment.胴.condition,
		足: initialState.baseEquipment.足.condition - currentState.baseEquipment.足.condition,
		頭: initialState.baseEquipment.頭.condition - currentState.baseEquipment.頭.condition,
		背中: initialState.baseEquipment.背中.condition - currentState.baseEquipment.背中.condition,
		肩: initialState.baseEquipment.肩.condition - currentState.baseEquipment.肩.condition,
		指輪: initialState.baseEquipment.右手.condition - currentState.baseEquipment.指輪.condition
	};

	$: cosplayEquipmentDiffCnd = {
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

	$: usedPortionNum = {
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

	$: usedMealNum = initialState.meal.map((initialMeal, i) => {
		return {
			...initialMeal,
			num: initialMeal.num - currentState.meal[i].num
		};
	});

	$: baseEquipmentRepairCosts = {
		右手: otherInfo.baseEquipment.右手.cost / (100 - otherInfo.baseEquipment.右手.condition),
		左手: otherInfo.baseEquipment.左手.cost / (100 - otherInfo.baseEquipment.左手.condition),
		胴: otherInfo.baseEquipment.胴.cost / (100 - otherInfo.baseEquipment.胴.condition),
		足: otherInfo.baseEquipment.足.cost / (100 - otherInfo.baseEquipment.足.condition),
		頭: otherInfo.baseEquipment.頭.cost / (100 - otherInfo.baseEquipment.頭.condition),
		背中: otherInfo.baseEquipment.背中.cost / (100 - otherInfo.baseEquipment.背中.condition),
		肩: otherInfo.baseEquipment.肩.cost / (100 - otherInfo.baseEquipment.肩.condition),
		指輪: otherInfo.baseEquipment.指輪.cost / (100 - otherInfo.baseEquipment.指輪.condition)
	};

	$: cosplayEquipmentRepairCosts = {
		右手: otherInfo.cosplayEquipment.右手.cost / (100 - otherInfo.cosplayEquipment.右手.condition),
		左手: otherInfo.cosplayEquipment.左手.cost / (100 - otherInfo.cosplayEquipment.左手.condition),
		胴: otherInfo.cosplayEquipment.胴.cost / (100 - otherInfo.cosplayEquipment.胴.condition),
		足: otherInfo.cosplayEquipment.足.cost / (100 - otherInfo.cosplayEquipment.足.condition),
		頭: otherInfo.cosplayEquipment.頭.cost / (100 - otherInfo.cosplayEquipment.頭.condition),
		背中: otherInfo.cosplayEquipment.背中.cost / (100 - otherInfo.cosplayEquipment.背中.condition),
		肩: otherInfo.cosplayEquipment.肩.cost / (100 - otherInfo.cosplayEquipment.肩.condition)
	};

	$: baseEquipmentRepairCost = Object.entries(baseEquipmentDiffCnd).reduce((p, c) => {
		const [pos, cnd] = c;
		const cost = initialState.baseEquipment[pos].isUnEquipped
			? 0
			: baseEquipmentRepairCosts[pos] * cnd;
		return p + cost;
	}, 0);

	$: cosplayEquipmentRepairCost = Object.entries(cosplayEquipmentDiffCnd).reduce((p, c) => {
		const [pos, cnd] = c;
		const cost = initialState.cosplayEquipment[pos].isUnEquipped
			? 0
			: cosplayEquipmentRepairCosts[pos] * cnd;
		return p + cost;
	}, 0);

	$: portionCost =
		Object.entries(usedPortionNum.hp).reduce((p, c) => {
			const [lv, num] = c;
			return p + PortionData.hp[lv] * num * funClubCardList[initialState.funClubCard];
		}, 0) +
		Object.entries(usedPortionNum.mp).reduce((p, c) => {
			const [lv, num] = c;
			return p + PortionData.mp[lv] * num * funClubCardList[initialState.funClubCard];
		}, 0);

	$: mealCost = usedMealNum
		.map(
			({ itemName, num }) => MealData[itemName] * num * funClubCardList[initialState.funClubCard]
		)
		.reduce((p, c) => p + c, 0);

	$: springCost = currentState.spring.cost * currentState.spring.num;

	$: income = currentState.mR - initialState.mR;

	$: total =
		income -
		baseEquipmentRepairCost -
		cosplayEquipmentRepairCost -
		portionCost -
		mealCost -
		springCost;

	$: hourlyPay = mRToJpy(total) / (currentState.workingMinute / 60);

	setInterval(() => {
		if (browser) {
			const node = document.getElementById('result');
			if (node !== null) {
				toPng(node).then((dataUrl) => {
					const img = document.getElementById('result-img') as HTMLImageElement;
					img.src = dataUrl;
				});
			}
		}
	}, 100);

	function mRToJpy(mR: number) {
		const ROND = mR / (otherInfo.rate['ROND-mRond'] * 10000);
		const USD = ROND * otherInfo.rate['ROND-USD'];
		const JPY = USD * otherInfo.rate['USD-JPY'];

		return Math.floor(JPY);
	}

	function mMVTomR(mMV: number) {
		const MV = mMV / (otherInfo.rate['MV-mMV'] * 10000);
		const USD = MV * otherInfo.rate['MV-USD'];
		const ROND = USD / otherInfo.rate['ROND-USD'];
		const mR = ROND * otherInfo.rate['ROND-mRond'] * 10000;

		return Math.floor(mR);
	}

	function mMVToJpy(mMV: number) {
		const MV = (mMV / otherInfo.rate['MV-mMV']) * 10000;
		const USD = MV * otherInfo.rate['MV-USD'];
		const JPY = USD * otherInfo.rate['USD-JPY'];

		return JPY;
	}
</script>

<svelte:head>
	<title>元素騎士オンライン 時給計算機(α版)</title>
	<meta name="”description“" content="元素騎士オンラインの時給を計算できるツールです。" />
	<meta name="”keywords”" content="元素騎士オンライン,元素騎士,時給計算機,時給" />
</svelte:head>

<div class="md:flex md:gap-4 md:mx-auto md:w-fit">
	<div class="md:w-96">
		<div class="bg-slate-700 text-white font-bold p-1 px-2 mt-4">狩り前に入力してください。</div>
		<div class="border shadow">
			<div class="h-[20rem]">
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
									<div class="form-label w-20">HP Lv{lv}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex  items-center">
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={initialState.portion.hp[lv]}
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
						<div class="flex flex-wrap mt-4">
							{#each [1, 2, 3, 4, 5, 6] as lv}
								<div class="form-row  w-1/2">
									<div class="form-label w-20">MP Lv{lv}</div>
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
											<div class="text-xs flex-1">メニュー:</div>
											<select class="ml-2 px-1" bind:value={initialState.meal[i].itemName}>
												<option value="チーズの欠片">チーズの欠片</option>
											</select>
										</div>
										<div class="flex  items-center">
											<div class="text-xs flex-1">個数:</div>
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={initialState.meal[i].num}
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<section>
						<div class="heading2">現在の所持金を入力してください</div>
						<div>
							<div class="form-row">
								<div class="form-label">所持 mR</div>
								<div class="form-controll">
									<input type="number" class="border" bind:value={initialState.mR} />
								</div>
							</div>
						</div>
						<div>
							<div class="form-row">
								<div class="form-label">ファンクラブ会員権</div>
								<div class="form-controll">
									<select bind:value={initialState.funClubCard}>
										<option value="なし">なし</option>
										<option value="レベル1">レベル1</option>
										<option value="レベル2">レベル2</option>
										<option value="レベル3">レベル3</option>
									</select>
								</div>
							</div>
						</div>
					</section>
				</Step>
			</div>
			<div class="flex justify-between p-2">
				<button
					class="border rounded p-1 w-20 bg-gray-200 border-gray-400"
					on:click={() => (step -= 1)}>戻る</button
				>
				<div>
					{step + 1}/{maxStep}
				</div>
				<button
					class="border rounded p-1 w-20 bg-gray-200 border-gray-400"
					on:click={() => (step += 1)}>次へ</button
				>
			</div>
		</div>
	</div>
	<div class="md:w-96">
		<div class="bg-slate-700 text-white font-bold p-1 px-2 mt-4">狩り後に入力してください。</div>
		<div class="border shadow">
			<div class="h-[20rem]">
				<Step step={step2} bind:maxStep={maxStep2}>
					<section>
						<div class="heading2">ベース装備の情報を入力してください</div>
						<div class="flex flex-wrap">
							{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩', '指輪'] as pos}
								<div class="form-row w-1/2">
									<div class="form-label w-12">{pos}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex  items-center">
											<div class="text-xs flex-1">CND:</div>
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={currentState.baseEquipment[pos].condition}
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<section>
						<div class="heading2">おしゃれ装備の情報を入力してください</div>
						<div class="flex flex-wrap">
							{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩'] as pos}
								<div class="form-row w-1/2">
									<div class="form-label w-12">{pos}</div>
									<div class="form-controll flex flex-1 gap-4 border-r">
										<div class="flex items-center">
											<div class="text-xs flex-1">CND:</div>
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={currentState.cosplayEquipment[pos].condition}
											/>
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
									<div class="form-label w-20">HP Lv{lv}</div>
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
									<div class="form-label w-20">MP Lv{lv}</div>
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
										<div class="flex items-center">
											<div class="text-xs flex-1">メニュー:</div>
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
											<span class="bg-gray-200 px-1 border">mR</span>
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
						<div class="heading2">現在の所持金を入力してください</div>
						<div class="form-row">
							<div class="form-label w-36">働いた時間</div>
							<div class="form-controll flex items-center">
								<input type="number" class="border" bind:value={currentState.workingMinute} /><span
									class="bg-gray-200 px-1 border">分</span
								>
							</div>
						</div>

						<div class="form-row">
							<div class="form-label w-36">現在の所持 mR</div>
							<div class="form-controll flex items-center">
								<input type="number" class="border" bind:value={currentState.mR} /><span
									class="bg-gray-200 px-1 border">mR</span
								>
							</div>
						</div>
					</section>
				</Step>
			</div>
			<div class="flex justify-between p-2">
				<button
					class="border rounded p-1 w-20 bg-gray-200 border-gray-400"
					on:click={() => (step2 -= 1)}>戻る</button
				>
				<div>
					{step2 + 1}/{maxStep2}
				</div>
				<button
					class="border rounded p-1 w-20 bg-gray-200 border-gray-400"
					on:click={() => (step2 += 1)}>次へ</button
				>
			</div>
		</div>
	</div>
	<div class="md:w-96">
		<div class="bg-slate-700 text-white font-bold p-1 px-2 mt-4">装備の修理費やレートを入力。</div>
		<div class="border shadow">
			<div class="h-[20rem]">
				<Step step={step3} bind:maxStep={maxStep3}>
					<section>
						<div class="heading2">ベース装備の修理費を入力してください</div>
						<div>
							{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩', '指輪'] as pos}
								<div class="form-row">
									<div class="form-label w-12">{pos}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex  items-center">
											<div class="text-xs flex-1">CND:</div>
											<span class="ml-1">{currentState.baseEquipment[pos].condition}</span>
										</div>

										<div class="flex  items-center">
											<div class="text-xs flex-1">修理費:</div>
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={otherInfo.baseEquipment[pos].cost}
											/><span class="bg-gray-200 px-1 border">mR</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<section>
						<div class="heading2">おしゃれ装備の修理費を入力してください</div>
						<div>
							{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩'] as pos}
								<div class="form-row">
									<div class="form-label w-12">{pos}</div>
									<div class="form-controll flex flex-1 gap-4">
										<div class="flex  items-center">
											<div class="text-xs flex-1">CND:</div>
											<span class="ml-1">{currentState.cosplayEquipment[pos].condition}</span>
										</div>

										<div class="flex  items-center">
											<div class="text-xs flex-1">修理費:</div>
											<input
												type="number"
												class="border w-20 ml-2"
												bind:value={otherInfo.cosplayEquipment[pos].cost}
											/><span class="bg-gray-200 px-1 border">mMV</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>
					<section>
						<div class="heading2">レートを入力してください。</div>
						<div>
							<div class="form-row">
								<div class="form-label w-24">1ROND</div>
								<div class="form-controll flex flex-1">
									<span class="bg-gray-200 px-1 border">$</span>
									<input
										type="number"
										class="border w-20"
										bind:value={otherInfo.rate['ROND-mRond']}
									/>
								</div>
							</div>
							<div class="form-row">
								<div class="form-label w-24">1MV</div>
								<div class="form-controll flex flex-1">
									<span class="bg-gray-200 px-1 border">$</span>
									<input type="number" class="border w-20 " bind:value={otherInfo.rate['MV-mMV']} />
								</div>
							</div>
							<div class="form-row">
								<div class="form-label w-24">1USD</div>
								<div class="form-controll flex flex-1">
									<input
										type="number"
										class="border w-20 "
										bind:value={otherInfo.rate['USD-JPY']}
									/>
									<span class="bg-gray-200 px-1 border">円</span>
								</div>
							</div>
						</div>
					</section>
				</Step>
			</div>
			<div class="flex justify-between p-2">
				<button
					class="border rounded p-1 w-20 bg-gray-200 border-gray-400"
					on:click={() => (step3 -= 1)}>戻る</button
				>
				<div>
					{step3 + 1}/{maxStep3}
				</div>
				<button
					class="border rounded p-1 w-20 bg-gray-200 border-gray-400"
					on:click={() => (step3 += 1)}>次へ</button
				>
			</div>
		</div>
	</div>
</div>

<div class="md:w-[74rem] md:mx-auto">
	<div class="bg-slate-700 text-white font-bold p-1 mt-4">収支</div>
	<img src="" id="result-img" class="mt-1 md:mx-auto" />
	<div class="text-center leading-tight p-1 bg-gray-900 text-white md:w-96 md:mx-auto">
		画像をダウンロードしてツイートしよう！<br />
		<span class="text-xs">スマホは画像長押し、PCは右クリックでダウンロードできます。</span>
	</div>
	<a
		class="bg-blue-400 text-white font-bold w-full text-center rounded-md p-2 mt-2 block md:w-96 md:mx-auto"
		href={`https://twitter.com/intent/tweet?text=${encodeURI(`
元素騎士オンライン今日の時給は${hourlyPay}円！!

↓時給計算はこちらから`).trim()}&url=https://genso-onepan-sim.vercel.app/hourly&hashtags=元素騎士`}
	>
		ツイートする
	</a>

	<div
		class="bg-orange-900 text-white result font-bold border-4 border-amber-400 rounded p-2 fixed top-0 left-0 w-full -z-50 md:w-96"
		id="result"
	>
		<div class="flex justify-between">
			<div>収入</div>
			<div class="text-green-500">+{income}mR</div>
		</div>
		<div class="flex justify-between mt-2">
			<div>ベース装備修理費</div>
			<div class="text-red-500">-{baseEquipmentRepairCost}mR</div>
		</div>
		<div class="flex justify-between">
			<div>おしゃれ装備修理費</div>
			<div class="text-right text-red-500">
				-{mMVTomR(cosplayEquipmentRepairCost)}mR<br />(-{cosplayEquipmentRepairCost}mMV)
			</div>
		</div>

		<div class="flex justify-between mt-2">
			<div>お薬代</div>
			<div class="text-red-500">-{portionCost}mR</div>
		</div>

		<div class="flex justify-between mt-2">
			<div>お食事代</div>
			<div class="text-red-500">-{mealCost}mR</div>
		</div>

		<div class="flex justify-between mt-2">
			<div>泉代</div>
			<div class="text-red-500">-{springCost}mR</div>
		</div>

		<div class="flex justify-between mt-2 border-t-2 pt-1">
			<div>収支</div>
			<div>{total === 0 ? '±' : total > 0 ? '+' : '-'}{total}mR</div>
		</div>
		<div class="flex justify-between mt-2">
			<div>時給</div>
			<div>{hourlyPay}円</div>
		</div>
		<div class="flex justify-between">
			<div />
			<div class="text-sm">
				({Math.floor(hourlyPay / otherInfo.rate['ファミチキ-JPY'])}ファミチキ)
			</div>
		</div>
	</div>
</div>

<style>
	:global(.heading) {
		@apply bg-gray-700 text-white font-bold px-2;
	}

	.heading2 {
		@apply bg-blue-400 text-white px-2 text-sm  py-1;
	}

	select {
		@apply bg-white border;
	}

	.result * {
		text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, 0px 1px 0 #000,
			0 -1px 0 #000, -1px 0 0 #000, 1px 0 0 #000;
	}
</style>
