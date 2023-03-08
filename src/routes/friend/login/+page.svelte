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
	let isNotification = false;

	onMount(async () => {
		core = new Core(setupFirebaseApp());
		userInfo = await core.getUserInfo(getUserInfo()?.id ?? '');

		const md = new MobileDetect(window.navigator.userAgent);

		if (['iOS', 'iPadOS'].includes(md.os())) {
			loginUrl = 'https://apps.apple.com/app/id1635951038';
		}

		if (['AndroidOS'].includes(md.os())) {
			loginUrl = 'https://play.google.com/store/apps/details?id=ai.metap.gensokishi';
		}
	});

	async function login() {
		if (core === undefined || userInfo === undefined) return;
		await core.login(userInfo);
		saveUserInfo({
			...userInfo,
			isLogin: true
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
		<div class="w-full flex flex-col">
			<div class="bg-well-read-700 text-sm p-1">
				<div class="bg-black inline-block bg-opacity-50 text-xs rounded-sm px-1">
					<span class={(userInfo.isLogin ? 'text-green-500' : 'text-red-500') + ' mr-1'}>●</span
					>{userInfo.isLogin ? 'ログイン' : '未ログイン'}
				</div>
				<div class="font-bold">
					<span class="mr-4">ID:{userInfo.id}</span><span class="">{userInfo.name}</span>
				</div>
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

	<div class="bg-black bg-opacity-50 border border-black mt-4 rounded-sm overflow-hidden">
		<div class="p-2 font-bold bg-gray-500">ログイン・ログアウト</div>
		<div class="p-2 ">
			{#if userInfo?.isLogin}
				<button class="btn w-full" on:click={logout}>ログアウト</button>
			{:else}
				<div class="bg-well-read-700 bg-opacity-50 p-1 rounded-sm font-bold mb-2">
					※ログアウト忘れを防止する為、毎朝4時に自動的に全ユーザーログアウトされます。
				</div>
				<button class="btn text-center justify-center w-full" on:click={login}>ログイン</button>
				<div class="p-1 text-xs">ログインすると通知が受け取れる様になります。</div>
			{/if}

			<a class="btn text-center justify-center mt-2" href={loginUrl} target="_blank">ゲーム起動</a>

			<div class="p-2 bg-white bg-opacity-20 rounded-sm mt-4 text-sm">
				このページをブックマークやホームに設置すると便利です！<br />
				・iPhoneでホームに設置する方法は<a
					href="https://www.ipodwave.com/iphone/howto/website_home.html"
					class="underline text-blue-500">こちら</a
				>(外部サイト)<br />
				・Androidでホームに設置する方法は<a
					href="https://sp7pc.com/google/android/61065"
					class="underline text-blue-500">こちら</a
				>(外部サイト)
			</div>
		</div>
	</div>
{/if}
