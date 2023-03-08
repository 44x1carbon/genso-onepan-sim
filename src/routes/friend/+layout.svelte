<script lang="ts">
	import { page } from '$app/stores';
	import { getUserInfo, saveUserInfo } from '$lib/friend/UserInfoStore';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { Core, N, type UserInfo } from '$lib/friend/Core';
	import setupFirebaseApp from '$lib/Firebase';

	let nav: { label: string; href: string; badge?: number }[] = [
		{ label: 'ログ<br>イン', href: '/friend/login' },
		{ label: '友達<br>一覧', href: '/friend' },
		{ label: 'ユーザ<br>検索', href: '/friend/search' },
		{ label: '申請<br>一覧', href: '/friend/requests' },
		{ label: 'ユーザ<br>編集', href: '/friend/edituser' },
		{ label: '使い方', href: '/friend/guide' }
	];

	let hasUserInfo = false;
	let core: Core | undefined = undefined;
	let userInfo: UserInfo | undefined = undefined;

	onMount(() => {
		core = new Core(setupFirebaseApp());
		userInfo = getUserInfo();
		const id = setInterval(async () => {
			if (browser && !['/friend/edituser', '/friend/guide'].includes($page['route'].id ?? '')) {
				const userInfo = getUserInfo();
				if (userInfo === undefined) {
					goto('/friend/edituser');
				} else {
					hasUserInfo = true;
				}

				if (hasUserInfo) {
					clearInterval(id);
				}

				const core = new Core(setupFirebaseApp());
				const oneselfRequests = (await core.getOneselfFriendRequestList(userInfo.id)).filter(
					(friendRequest) => {
						return !friendRequest.isApproved;
					}
				);
				nav[3].badge = oneselfRequests.length;
			}
		}, 100);
		setupNotification();
	});

	async function requestPermission() {
		await N.requestPermission();
		N.showNotification('通知を受け取れる状態です', '');
	}

	async function setupNotification() {
		await requestPermission();
		if (core === undefined || userInfo === undefined) return;

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
			core?.watchFriendStatus(friend.id, (_userInfo) => {
				if (_userInfo.isLogin) {
					core?.showLoginFriendNotification(_userInfo);
				}
			});
		});
	}
</script>

<svelte:head>
	<title>IGNIS TOOLS - フレンド機能(α版)</title>
	<meta name="description" content="元素騎士オンラインのフレンドを管理できるツールです。" />
	<meta name="keywords" content="元素騎士オンライン,元素騎士,フレンド" />
</svelte:head>

<div>
	<div class="text-xs flex mb-4 md:w-[74rem] md:mx-auto w-full">
		{#each nav as { label, href, badge }}
			<div
				class="cursor-pointer text-center flex-1 bg-mai-tai-400 text-black font-bold relative"
				class:bg-gray-700={!(
					($page['route'].id?.startsWith(href) && href !== '/friend') ||
					$page['route'].id === href
				)}
				class:bg-mai-tai-400={($page['route'].id?.startsWith(href) && href !== '/friend') ||
					$page['route'].id === href}
				class:text-black={($page['route'].id?.startsWith(href) && href !== '/friend') ||
					$page['route'].id === href}
				class:font-bold={($page['route'].id?.startsWith(href) && href !== '/friend') ||
					$page['route'].id === href}
			>
				<a {href} class="h-full w-full block p-1 flex items-center justify-center leading-tight"
					>{@html label}</a
				>
				{#if badge}
					<span
						class="absolute top-0 right-1 bg-white text-gray-900 w-4 h-4 flex rounded-full items-center justify-center"
						>{badge}</span
					>
				{/if}
			</div>
		{/each}
	</div>
	<div class="md:w-[74rem] md:mx-auto">
		<slot />
	</div>
</div>
