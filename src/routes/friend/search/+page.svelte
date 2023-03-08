<script lang="ts">
	import setupFirebaseApp from '$lib/Firebase';
	import { Core, type FriendRequest, type UserInfo } from '$lib/friend/Core';
	import UserInfoComponent from '$components/friend/UserInfo.svelte';
	import UserInfoSearchForm from '$components/friend/UserInfoSearchForm.svelte';
	import { onMount } from 'svelte';
	import type { SearchCondition } from '$lib/friend/SearchCondition';
	import { saveUserInfo, getUserInfo } from '$lib/friend/UserInfoStore';

	let userInfoList: UserInfo[] = [];
	let _userInfoList: UserInfo[] = [];
	let core: Core | undefined = undefined;
	let userInfo: UserInfo | undefined = undefined;
	let friendList: UserInfo[] = [];
	let sendingFriendRequestList: FriendRequest[] = [];

	async function search(condition: SearchCondition) {
		userInfoList = (await core?.getUserInfoList()) ?? [];
		_userInfoList = [
			...userInfoList
				.filter(({ id }) => id !== userInfo?.id)
				.filter((userInfo) => {
					if (condition.id !== '') {
						return condition.id === userInfo.id;
					}

					return (
						userInfo.jobs.some((job) => {
							return condition.level.from <= job.level && job.level <= condition.level.to;
						}) && (condition.status ? userInfo.status.includes(condition.status) : true)
					);
				})
				.sort((a, b) => {
					const aSendingRequest = sendingFriendRequestList.find((req) => req.to.id === a.id);
					const bSendingRequest = sendingFriendRequestList.find((req) => req.to.id === b.id);

					const aNum = aSendingRequest === undefined ? 3 : !aSendingRequest.isApproved ? 2 : 1;
					const bNum = bSendingRequest === undefined ? 3 : !bSendingRequest.isApproved ? 2 : 1;

					return bNum - aNum;
				});
		];
	}

	onMount(async () => {
		core = new Core(setupFirebaseApp());
		userInfo = getUserInfo();

		if (userInfo) {
			friendList = await core.getFriendList(userInfo);
			sendingFriendRequestList = await core.getSendingFriendRequestList(userInfo.id);

			userInfoList = await core.getUserInfoList();
			_userInfoList = [...userInfoList]
				.filter(({ id }) => id !== userInfo?.id)
				.sort((a, b) => {
					const aSendingRequest = sendingFriendRequestList.find((req) => req.to.id === a.id);
					const bSendingRequest = sendingFriendRequestList.find((req) => req.to.id === b.id);

					const aNum = aSendingRequest === undefined ? 3 : !aSendingRequest.isApproved ? 2 : 1;
					const bNum = bSendingRequest === undefined ? 3 : !bSendingRequest.isApproved ? 2 : 1;

					return bNum - aNum;
				});
		}
	});

	let selectUser: UserInfo | undefined = undefined;
	function changeUser() {
		if (selectUser) {
			saveUserInfo(selectUser);
		}
	}
</script>

<!-- <select bind:value={selectUser} on:change={changeUser}>
	{#each userInfoList as userInfo}
		<option value={userInfo}>{userInfo.name}</option>
	{/each}
</select> -->

<UserInfoSearchForm onClickSearch={(c) => search(c)} />

<div class="flex flex-wrap gap-2 md:w-[74rem] md:mx-auto">
	{#each _userInfoList as userInfo}
		<UserInfoComponent {userInfo} {friendList} {sendingFriendRequestList} />
	{/each}
</div>
