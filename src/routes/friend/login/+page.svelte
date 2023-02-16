<script lang="ts">
	import { Core, type UserInfo, N } from '$lib/friend/Core';
	import { onMount } from 'svelte';
	import setupFirebaseApp from '$lib/Firebase';
	import { getUserInfo, saveUserInfo } from '$lib/friend/UserInfoStore';
	import MobileDetect from 'mobile-detect';
	import { browser } from '$app/environment';

	let core: Core | undefined = undefined;
	let userInfo: UserInfo | undefined = undefined;
	let loginUrl: string = 'https://genso.game/ja/';

	onMount(async () => {
		core = new Core(setupFirebaseApp());
		userInfo = getUserInfo();

		const md = new MobileDetect(window.navigator.userAgent);

		if (['iOS', 'iPadOS'].includes(md.os())) {
			loginUrl = 'https://apps.apple.com/app/id1635951038';
		}

		if (['AndroidOS'].includes(md.os())) {
			loginUrl = 'https://play.google.com/store/apps/details?id=ai.metap.gensokishi';
		}
		// alert(N.isSupport());
	});

	async function requestPermission() {
		await N.requestPermission();
		N.showNotification('aaaa', 'aaaa');
		alert('通知を送信しました');
	}

	async function login() {
		if (core === undefined || userInfo === undefined) return;
		await core.login(userInfo);
		saveUserInfo({
			...userInfo,
			isLogin: true
		});

		core.addListenerReciveChatMessage(userInfo, (chatMessage) => {
			core?.showReciveChatMessageNotification(chatMessage);
		});

		core.addListenerReciveFriendRequest(userInfo, (friendRequest) => {
			core?.showReciveFriendRequestNotification(friendRequest);
		});

		core.addListenerApprovedFriendRequest(userInfo, (friendRequest) => {
			core?.showApprovedFriendRequestNotification(friendRequest);
			core?.watchFriendStatus(friendRequest.from.id, (_userInfo) => {
				if (_userInfo.isLogin) {
					core?.showLoginFriendNotification(_userInfo);
				}
			});
		});

		(await core.getFriendList(userInfo)).forEach((friend) => {
			console.log(friend);
			core?.watchFriendStatus(friend.id, (_userInfo) => {
				if (_userInfo.isLogin) {
					core?.showLoginFriendNotification(_userInfo);
				}
			});
		});

		userInfo = getUserInfo();
		alert('ログインしました!');
	}

	async function logout() {
		if (core === undefined || userInfo === undefined) return;
		await core.logout(userInfo);
		saveUserInfo({
			...userInfo,
			isLogin: false
		});
		userInfo = getUserInfo();
		alert('ログアウトしました');
	}
</script>

{#if browser}
	{#if userInfo}
		<div class="md:w-[24rem] w-full flex flex-col">
			<div class="heading text-sm p-1">
				<span class="mr-4">ID:{userInfo.id}</span><span class="">{userInfo.name}</span>
			</div>
			<div class="panel flex flex-1">
				<div class="flex-1">
					<div class="flex gap-1 flex-wrap text-xs p-1">
						{#each userInfo.jobs.filter(({ name }) => name !== '') as job}
							<div class="bg-gray-200 rounded-sm px-1 text-gray-900 font-bold">
								{job.name} Lv.{job.level}
							</div>
						{/each}
					</div>
					{#if userInfo.status.length !== 0}
						<div class="flex gap-1 p-1 text-xs flex-wrap ">
							{#each userInfo.status as status}
								<span class="text-xs bg-gray-200 rounded-sm text-gray-900 px-1 font-bold"
									>{status}</span
								>
							{/each}
						</div>
					{/if}
					<div class="p-1">
						<a class="btn w-full justify-center text-sm">ユーザー情報を編集</a>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if userInfo?.isLogin}
		<button class="btn w-full mt-4" on:click={logout}>ログアウト</button>
	{:else}
		<button class="btn text-center justify-center w-full mt-4" on:click={login}>ログイン</button>
	{/if}
{/if}

<a class="btn text-center justify-center mt-4" href={loginUrl} target="_blank">ゲーム起動</a>
