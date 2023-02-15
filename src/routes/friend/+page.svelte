<script lang="ts">
	import { Core, type UserInfo } from '$lib/friend/Core';
	import setupFirebaseApp from '$lib/Firebase';
	import { getUserInfo } from '$lib/friend/UserInfoStore';
	import { onMount } from 'svelte';
	import Friend from '$components/friend/Friend.svelte';

	let friendList: UserInfo[] = [];

	onMount(async () => {
		const core = new Core(setupFirebaseApp());

		friendList = (await core.getFriendList(getUserInfo())).sort((a, b) => {
			return (b.isLogin ? 1 : 0) - (a.isLogin ? 1 : 0);
		});
		console.log(friendList);
	});
</script>

<div class="flex flex-wrap gap-2 md:w-[74rem] md:mx-auto">
	{#each friendList as friend}
		<Friend userInfo={friend} />
	{/each}
</div>
