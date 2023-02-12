<script lang="ts">
	import type { SearchCondition } from '$lib/friend/SearchCondition';

	export let onClickSearch: (condition: SearchCondition) => void;
	let condition: SearchCondition = {
		id: '',
		level: {
			from: 1,
			to: 30
		},
		status: ''
	};
</script>

<div class="w-full mb-4">
	<div class="heading gray">検索</div>
	<div class="border panel border-well-read-700">
		<div class="form-row">
			<div class="form-label w-[7.4rem]">ID</div>
			<div class="form-controll space">
				<input type="text" placeholder="例) abcd" class="w-full" bind:value={condition.id} />
			</div>
		</div>

		<div class="form-row">
			<div class="form-label w-[7.4rem]">レベル</div>
			<div class="form-controll space flex gap-4">
				<select bind:value={condition.level}>
					<option
						value={{ from: 1, to: 30 }}
						selected={condition.level.from === 1 && condition.level.to === 30}>全レベル</option
					>
					<option
						value={{ from: 1, to: 5 }}
						selected={condition.level.from === 1 && condition.level.to === 5}>Lv1 ~ Lv5</option
					>
					<option
						value={{ from: 6, to: 10 }}
						selected={condition.level.from === 6 && condition.level.to === 10}>Lv6 ~ Lv10</option
					>
					<option
						value={{ from: 11, to: 15 }}
						selected={condition.level.from === 11 && condition.level.to === 15}>Lv11 ~ Lv15</option
					>
					<option
						value={{ from: 16, to: 20 }}
						selected={condition.level.from === 16 && condition.level.to === 20}>Lv16 ~ Lv20</option
					>
					<option
						value={{ from: 21, to: 25 }}
						selected={condition.level.from === 21 && condition.level.to === 25}>Lv21 ~ Lv25</option
					>
					<option
						value={{ from: 26, to: 30 }}
						selected={condition.level.from === 26 && condition.level.to === 30}>Lv26 ~ Lv30</option
					>
				</select>
			</div>
		</div>

		<div class="form-row">
			<div class="form-label w-[7.4rem]">やりたい事</div>
			<div class="form-controll space flex gap-4">
				<select bind:value={condition.status}>
					<option value="">- - - - -</option>
					<option value="レベリング">レベリング</option>
					<option value="金策">金策</option>
					<option value="ドラゴンタワー中級">ドラゴンタワー中級</option>
					<option value="ドラゴンタワー上級">ドラゴンタワー上級</option>
				</select>
			</div>
		</div>

		<div class="p-2">
			<button class="btn w-full" on:click={() => onClickSearch(condition)}>検索</button>
		</div>
	</div>
</div>
