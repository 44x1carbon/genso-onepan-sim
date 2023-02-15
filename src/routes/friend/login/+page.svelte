<script lang="ts">
	import { Core, type UserInfo } from '$lib/friend/Core';
	import { onMount } from 'svelte';
	import setupFirebaseApp from '$lib/Firebase';
	import { getUserInfo, saveUserInfo } from '$lib/friend/UserInfoStore';
	import MobileDetect from 'mobile-detect';

	let core: Core | undefined = undefined;
	let userInfo: UserInfo | undefined = undefined;
	let loginUrl: string = 'https://genso.game/ja/';

	onMount(async () => {
		core = new Core(setupFirebaseApp());
		userInfo = getUserInfo();

		const md = new MobileDetect(window.navigator.userAgent);

		// if (['iOS', 'iPadOS', 'AndroidOS'].includes(md.os())) {
		// 	loginUrl = 'https://prd-app.genso.game/svc/mail/login';
		// }
	});

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
			core?.watchFriendStatus(friend.id, (_userInfo) => {
				if (_userInfo.isLogin) {
					core?.showLoginFriendNotification(_userInfo);
				}
			});
		});
	}

	async function logout() {
		if (core === undefined || userInfo === undefined) return;
		await core.logout(userInfo);
		saveUserInfo({
			...userInfo,
			isLogin: false
		});
	}
</script>

<a class="btn text-center justify-center" href={loginUrl} on:click={login} target="_blank"
	>ログイン</a
>
