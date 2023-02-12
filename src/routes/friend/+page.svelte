<script lang="ts">
	import setupFirebaseApp from '$lib/Firebase';
	import { Core, type UserInfo, N } from 'genso-friend-core';
	import UserInfoComponent from '../../components/friend/UserInfo.svelte';
	import UserInfoSearchForm from '../../components/friend/UserInfoSearchForm.svelte';
	import { onMount } from 'svelte';
	import type { SearchCondition } from '$lib/friend/SearchCondition';

	let userInfo1: UserInfo = {
		id: 'abcd',
		name: '太郎',
		jobs: [
			{ name: 'ファイター', level: 10 },
			{ name: 'ガーディアン', level: 13 },
			{ name: 'ビショップ', level: 13 }
		],
		status: ['レベリング', 'ドラゴンタワー中級'],
		isLogin: true,
		message: 'ほげほげ'
	};

	let userInfo2: UserInfo = {
		id: 'efgh',
		name: '次郎',
		jobs: [
			{ name: 'ファイター', level: 10 },
			{ name: 'ガーディアン', level: 13 },
			{ name: 'ビショップ', level: 13 }
		],
		status: ['レベリング'],
		isLogin: true,
		message: 'ほげほげ'
	};

	let userInfoList: UserInfo[] = [];
	let _userInfoList: UserInfo[] = [];

	function search(condition: SearchCondition) {
		console.log([
			...userInfoList.filter((userInfo) => {
				if (condition.id !== '') {
					return condition.id === userInfo.id;
				}

				return userInfo.jobs.some((job) => {
					return condition.level.from <= job.level && job.level <= condition.level.to;
				}) && condition.status !== ''
					? userInfo.status.includes(condition.status)
					: true;
			})
		]);
		_userInfoList = [
			...userInfoList.filter((userInfo) => {
				if (condition.id !== '') {
					return condition.id === userInfo.id;
				}

				console.log(userInfo, condition.status);

				return (
					userInfo.jobs.some((job) => {
						return condition.level.from <= job.level && job.level <= condition.level.to;
					}) && (condition.status ? userInfo.status.includes(condition.status) : true)
				);
			})
		];
	}

	onMount(async () => {
		const core = new Core(setupFirebaseApp());

		userInfoList = await core.getUserInfoList();
		_userInfoList = [...userInfoList];
		console.log(userInfoList);

		// await core.resetDB();

		// await core.registerUserInfo(userInfo1);
		// await core.registerUserInfo(userInfo2);

		// core.addListenerApprovedFriendRequest(userInfo1, (friendRequest) => {
		// 	console.log('太郎', 'approved', friendRequest);
		// 	core.showApprovedFriendRequestNotification(friendRequest);
		// });
		// core.addListenerApprovedFriendRequest(userInfo2, (friendRequest) => {
		// 	console.log('次郎', 'approved', friendRequest);
		// 	core.showApprovedFriendRequestNotification(friendRequest);
		// });

		// core.addListenerReciveFriendRequest(userInfo1, (friendRequest) => {
		// 	console.log('太郎', 'recive', friendRequest);
		// 	core.showReciveFriendRequestNotification(friendRequest);
		// });
		// core.addListenerReciveFriendRequest(userInfo2, async (friendRequest) => {
		// 	console.log('次郎', 'recive', friendRequest);
		// 	core.showReciveFriendRequestNotification(friendRequest);
		// 	await core.apploveFriendRequest(friendRequest);

		// 	// console.log('太郎', 'friendList', await core.getFriendList(userInfo1));
		// 	// console.log('次郎', 'friendList', await core.getFriendList(userInfo2));
		// });

		// await core.sendFriendRequest(userInfo2.id, userInfo1, 'aaaa');

		// await N.requestPermission();

		// console.log('太郎', 'friendList', await core.getFriendList(userInfo1));
		// console.log('次郎', 'friendList', await core.getFriendList(userInfo2));
	});
</script>

<div class="flex flex-wrap gap-4 md:w-[74rem] md:mx-auto">
	<UserInfoSearchForm onClickSearch={(c) => search(c)} />
</div>

<div class="flex flex-wrap gap-2 md:w-[74rem] md:mx-auto">
	{#each _userInfoList as userInfo}
		<UserInfoComponent {userInfo} />
	{/each}
</div>
