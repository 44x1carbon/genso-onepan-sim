<script lang="ts">
	import type { Status } from '../Status';

	export let status: Status;
	export let addStatus: Status;

	function showAddStatusHelp() {
		alert(`【追加能力とは？】
装備などを比較しながらダメージ計算するのに便利な機能です。
ここに武器などの能力を入れることで現在のステータスにその武器を装備した時のダメージを計算できます。
`);
	}
</script>

<div class=" rounded-sm overflow-hidden md:w-96 panel border-chocolate-900">
	<div class="heading">ステータス入力</div>
	<table class="status-form">
		<tr class="text-xs">
			<td />
			<td>基礎能力</td>
			<td />
			<td>
				追加能力
				<span
					on:click={showAddStatusHelp}
					class="border w-4 inline-flex h-4 rounded-full justify-center items-center font-bold bg-gray-500 text-white -mr-px -mb-px cursor-pointer"
					>?</span
				>
			</td>
		</tr>
		<tr class="border border-well-read-900">
			<th class="form-label tc">攻撃力</th>
			<td>
				<input type="number" bind:value={status.offensivePower} class="bg-gray-50" />
			</td>
			<td>
				<span class="font-bold">+</span>
			</td>
			<td>
				<div class="flex items-center">
					<input type="number" bind:value={addStatus.offensivePower} class="bg-gray-50" />
					<span
						class="border w-6 h-6 rounded-full font-bold bg-gray-300 text-gray-700 cursor-pointer ml-1 leading-5 text-center"
						on:click={() => (addStatus.offensivePower = 0)}>×</span
					>
				</div>
			</td>
		</tr>
		<tr class="border border-well-read-900">
			<th class="form-label tc">腕力</th>
			<td>
				<input type="number" bind:value={status.armStrength} class="bg-gray-50" />
			</td>
			<td>
				<span class="font-bold">+</span>
			</td>
			<td>
				<div class="flex items-center">
					<input type="number" bind:value={addStatus.armStrength} class="bg-gray-50" />
					<span
						on:click={() => (addStatus.armStrength = 0)}
						class="border w-6 h-6 rounded-full font-bold bg-gray-300 text-gray-700 cursor-pointer ml-1 leading-5 text-center"
						>×</span
					>
				</div>
			</td>
		</tr>
		<tr class="border border-well-read-900">
			<th class="form-label xs g-px-0 tc w-20">魔法攻撃力</th>
			<td>
				<input type="number" bind:value={status.magicalPower} class="bg-gray-50" />
			</td>
			<td>
				<span class="font-bold">+</span>
			</td>
			<td>
				<div class="flex items-center">
					<input type="number" bind:value={addStatus.magicalPower} class="bg-gray-50" />
					<span
						on:click={() => (addStatus.magicalPower = 0)}
						class="border w-6 h-6 rounded-full font-bold bg-gray-300 text-gray-700 cursor-pointer ml-1 leading-5 text-center"
						>×</span
					>
				</div>
			</td>
		</tr>
		<tr class="border border-well-read-900">
			<th class="form-label tc">知力</th>
			<td>
				<input type="number" bind:value={status.brains} class="bg-gray-50" />
			</td>
			<td>
				<span class="font-bold">+</span>
			</td>
			<td>
				<div class="flex items-center">
					<input type="number" bind:value={addStatus.brains} class="bg-gray-50" />
					<span
						on:click={() => (addStatus.brains = 0)}
						class="border w-6 h-6 rounded-full font-bold bg-gray-300 text-gray-700 cursor-pointer ml-1 leading-5 text-center"
						>×</span
					>
				</div>
			</td>
		</tr>
		<tr class="border border-well-read-900">
			<th class="form-label tc">レベル</th>
			<td>
				<input type="number" bind:value={status.level} class="bg-gray-50" />
			</td>
		</tr>
	</table>
</div>

<style>
	.status-form {
		@apply w-full;
	}

	.status-form td {
		@apply text-center py-1 px-2;
	}
</style>
