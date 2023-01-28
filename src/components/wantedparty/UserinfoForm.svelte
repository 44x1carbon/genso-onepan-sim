<script lang="ts">
	import { USERINFO_SAVE_KEY } from '$lib/wantedparty/SaveKeys';
	import { getUserInfo, type UserInfo } from '$lib/wantedparty/UserInfo';
	import JobData from '../../JobData';
	import { v4 } from 'uuid';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let isEdit: boolean = false;

	let userInfo: UserInfo = {
		id: v4(),
		name: '',
		jobs: [
			{ name: '', level: 1 },
			{ name: '', level: 1 },
			{ name: '', level: 1 }
		]
	};

	onMount(() => {
		if (isEdit) {
			userInfo = getUserInfo();
		}
	});

	function registerUserInfo() {
		if (userInfo.name === '') {
			alert('ユーザー名は必須です。ユーザー名を入力してください。');
			return;
		}

		if (userInfo.jobs[0].name === '') {
			alert('職業は1つ以上登録してください');
			return;
		}

		localStorage.setItem(USERINFO_SAVE_KEY, JSON.stringify(userInfo));

		alert('登録しました');
		goto('/wantedparty');
	}
</script>

{#if browser}
	<div class="md:w-96">
		<div class="heading">ユーザー{isEdit ? '編集' : '登録'}</div>
		<div class="border shadow border-well-read-700 bg-chocolate-900 panel">
			<div class="form-row">
				<div class="form-label w-28 ">ユーザー名</div>
				<div class="form-controll space">
					<input type="text" class="text-sm" bind:value={userInfo.name} />
				</div>
			</div>
			{#each userInfo.jobs as _, i}
				<div class="form-row">
					<div class="form-label  w-28">職業{i + 1}</div>
					<div class="form-controll space flex gap-2">
						<select bind:value={userInfo.jobs[i].name} class="text-sm">
							<option value="">職業を選択</option>
							{#each JobData as job}
								<option value={job.name}>{job.name}</option>
							{/each}
						</select>

						<select bind:value={userInfo.jobs[i].level} class="text-sm">
							{#each new Array(30).fill(null) as _, i}
								<option value={i + 1}> Lv.{i + 1} </option>
							{/each}
						</select>
					</div>
				</div>
			{/each}
		</div>

		<button class="btn w-full mt-4" on:click={registerUserInfo}>{isEdit ? '更新' : '登録'}</button>
	</div>
{/if}
