<script lang="ts">
	import type { Status } from '../Status';

	export let status: Status;
</script>

<div class="bg-white rounded-sm overflow-hidden md:w-96">
	<div class="heading">ステータス入力</div>
	<div class="form-row">
		<div class="form-label">攻撃力</div>
		<div class="form-controll">
			<input type="number" bind:value={status.offensivePower} class="bg-gray-50" />
		</div>
	</div>
	<div class="form-row">
		<div class="form-label">腕力</div>
		<div class="form-controll">
			<input type="number" bind:value={status.armStrength} class="bg-gray-50" />
		</div>
	</div>
	<div class="form-row">
		<div class="form-label">魔法攻撃力</div>
		<div class="form-controll">
			<input type="number" bind:value={status.magicalPower} class="bg-gray-50" />
		</div>
	</div>
	<div class="form-row">
		<div class="form-label">知力</div>
		<div class="form-controll">
			<input type="number" bind:value={status.brains} class="bg-gray-50" />
		</div>
	</div>
</div>

<style>
	.form-label {
		@apply w-24 bg-gray-500 text-white font-bold p-1 text-sm flex justify-center items-center;
	}

	.form-controll {
		@apply p-1;
	}

	.form-row {
		@apply border -mt-px flex;
	}

	input {
		@apply border indent-1;
	}
</style>
