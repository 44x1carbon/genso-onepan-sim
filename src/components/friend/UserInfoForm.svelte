<script lang="ts">
	import { type UserInfo, Core } from '$lib/friend/Core';
	import { getUserInfo, saveUserInfo } from '$lib/friend/UserInfoStore';
	import JobData from '../../JobData';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import setupFirebaseApp from '$lib/Firebase';

	export let isEdit: boolean = true;

	let userInfo: UserInfo = {
		id: '',
		name: '',
		jobs: [
			{ name: '', level: 1 },
			{ name: '', level: 1 },
			{ name: '', level: 1 }
		],
		status: [],
		isLogin: false,
		message: ''
	};

	onMount(() => {
		const _userInfo = getUserInfo();
		if (_userInfo === undefined) {
			isEdit = false;
		} else {
			userInfo = _userInfo;
		}
	});

	async function registerUserInfo() {
		if (userInfo.name === '') {
			alert('ユーザー名は必須です。ユーザー名を入力してください。');
			return;
		}

		if (userInfo.jobs[0].name === '') {
			alert('職業は1つ以上登録してください');
			return;
		}

		const core = new Core(setupFirebaseApp());
		await core.updateUserInfo(userInfo);
		saveUserInfo(userInfo);

		alert('登録しました');
		goto('/friend/edituser');
	}
</script>

{#if browser}
	<div class="md:w-96">
		<div class="heading">ユーザー{isEdit ? '編集' : '登録'}</div>
		<div class="border shadow border-well-read-700 bg-chocolate-900 panel">
			<div class="form-row">
				<div class="form-label w-28 ">ID</div>
				<div class="form-controll space flex-1">
					<input type="text" class="text-sm" bind:value={userInfo.id} placeholder="例) abcd" />
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-28 ">ユーザー名</div>
				<div class="form-controll space flex-1">
					<input
						type="text"
						class="text-sm "
						bind:value={userInfo.name}
						placeholder="ゲーム内のキャラ名"
					/>
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-28 ">やりたい事</div>
				<div class="form-controll space flex flex-col text-xs flex-1 gap-1">
					{#each ['ストーリー', 'ブック解放', 'レベリング', '金策', 'ドラゴンタワー中級', 'ドラゴンタワー上級'] as want}
						<label for={`GensoWantTo-${want}`} class="flex items-center">
							<input
								type="checkbox"
								bind:group={userInfo.status}
								value={want}
								id={`GensoWantTo-${want}`}
								class="mr-1"
							/>{want}
						</label>
					{/each}
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-28 ">メッセージ</div>
				<div class="form-controll space flex-1">
					<textarea bind:value={userInfo.message} class="text-xs w-full" rows="5" />
				</div>
			</div>
			{#each userInfo.jobs as _, i}
				<div class="form-row">
					<div class="form-label  w-28">職業{i + 1}</div>
					<div class="form-controll space flex gap-2 flex-1">
						<select bind:value={userInfo.jobs[i].name} class="text-sm flex-1">
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
