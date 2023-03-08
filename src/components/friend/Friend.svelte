<script lang="ts">
	import { updateModal } from '$lib/ModalStore';
	import { type UserInfo, Core } from '$lib/friend/Core';
	import JobData from '../../JobData';
	import FriendRequestModal from '$components/friend/FriendRequestModal.svelte';
	import { getUserInfo } from '$lib/friend/UserInfoStore';
	import { getLastSeenTime } from '$lib/friend/LastSeenTimeStore';
	import { onMount } from 'svelte';
	import setupFirebaseApp from '$lib/Firebase';
	import { getMuteList, mute, unmute } from '$lib/friend/FriendMute';

	export let userInfo: UserInfo;
	let muteList = getMuteList();
	let from: UserInfo = getUserInfo();
	let unreadNum: number = 0;

	function jobShortName(jobName: string) {
		return JobData.find((job) => job.name === jobName)?.shortName ?? '';
	}

	function doMute() {
		confirm(`${userInfo.name}さんをミュートしますか？ミュートすると通知が来なくなります。`);
		mute(userInfo);
		muteList = getMuteList();
	}

	function doUnmute() {
		unmute(userInfo);
		muteList = getMuteList();
	}

	onMount(async () => {
		const core = new Core(setupFirebaseApp());
		const chatMessageList = await core.getChatMessageList(from, userInfo.id);
		const lastSeenTime = getLastSeenTime(userInfo.id);

		unreadNum = chatMessageList.filter(
			(chatMessage) => chatMessage.from.id === userInfo.id && chatMessage.sendAt >= lastSeenTime
		).length;
	});
</script>

<div
	class="md:w-[24rem] w-full flex flex-col"
	class:opacity-50={!userInfo.isLogin || muteList.includes(userInfo.id)}
>
	<div class="bg-well-read-700 text-sm p-1">
		<div>
			<div class="bg-black inline-block bg-opacity-50 text-xs rounded-sm px-1">
				<span class={(userInfo.isLogin ? 'text-green-500' : 'text-red-500') + ' mr-1'}>●</span
				>{userInfo.isLogin ? 'ログイン' : '未ログイン'}
			</div>
			<div class="bg-black inline-block bg-opacity-50 text-xs rounded-sm px-1">
				{muteList.includes(userInfo.id) ? 'ミュート中' : ''}
			</div>
		</div>

		<div class="font-bold">
			<span class="mr-4">ID:{userInfo.id}</span><span class="">{userInfo.name}</span>
		</div>
	</div>
	<div class="panel flex flex-1">
		<div class="flex-1">
			<div class="flex gap-1 flex-wrap text-xs p-1">
				{#each userInfo.jobs.filter(({ name }) => name !== '') as job}
					<span class="bg-gray-200 rounded-sm px-1 text-gray-900 font-bold"
						>{jobShortName(job.name)} L{job.level}</span
					>
				{/each}
			</div>
			<div class="flex gap-1 p-1 text-xs flex-wrap ">
				{#each userInfo.status as status}
					<span class="text-xs bg-gray-200 rounded-sm text-gray-900 px-1 font-bold">{status}</span>
				{/each}
			</div>
			<div class="text-xs bg-black bg-opacity-50 text-white m-1 rounded-sm font-bold p-1">
				{userInfo.message}
			</div>
		</div>
		<div class="p-1">
			<a
				class="btn w-full text-xs w-full leading-none items-center relative flex-col justify-center h-[3rem]"
				href={`/friend/chat/${userInfo.id}`}
			>
				<div class:h-4={unreadNum} class="w-full" />
				チャット

				{#if unreadNum}
					<div class:h-5={unreadNum} class="w-full" />
					<span
						class="absolute bottom-1 text-xs left-0 right-0 bg-gray-900 bg-opacity-70 w-fit rounded mx-auto px-1 text-white"
						>未読:{unreadNum}</span
					>
				{/if}
			</a>

			{#if muteList.includes(userInfo.id)}
				<button class="btn text-xs h-[3rem] normal" on:click={doUnmute}>ミュート<br />解除</button>
			{:else}
				<button class="btn text-xs h-[1.5rem] normal" on:click={doMute}>ミュート</button>
			{/if}
		</div>
	</div>
</div>
