<script lang="ts">
	import { Core, type UserInfo } from '$lib/friend/Core';
	import setupFirebaseApp from '$lib/Firebase';
	import { getUserInfo } from '$lib/friend/UserInfoStore';
	import { onMount } from 'svelte';
	import Friend from '$components/friend/Friend.svelte';
	import { getMuteList } from '$lib/friend/FriendMute';

	let friendList: UserInfo[] = [];

	onMount(async () => {
		const core = new Core(setupFirebaseApp());
		const muteList = getMuteList();
		friendList = (await core.getFriendList(getUserInfo())).sort((a, b) => {
			const isLoginNum = (b.isLogin ? 1 : 0) - (a.isLogin ? 1 : 0)
			if (isLoginNum ! == 0) {
				return isLoginNum;
			} else {
				return  (muteList.includes(b.id) ? 0 : 1) - (muteList.includes(a.id) ? 0 : 1) ;
			}
			
		});		
	});
</script>

<div class="flex flex-wrap gap-2 md:w-[74rem] md:mx-auto">
	{#each friendList as friend}
		<Friend userInfo={friend} />
	{/each}
</div>
