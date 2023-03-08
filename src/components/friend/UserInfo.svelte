<script lang="ts">
	import { updateModal } from '$lib/ModalStore';
	import { type FriendRequest, type UserInfo } from '$lib/friend/Core';
	import JobData from '../../JobData';
	import FriendRequestModal from '$components/friend/FriendRequestModal.svelte';
	import { getUserInfo } from '$lib/friend/UserInfoStore';

	export let userInfo: UserInfo;
	export let friendList: UserInfo[];
	export let sendingFriendRequestList: FriendRequest[];

	$: friendIdList = friendList.map((friend) => friend.id);
	$: sendingFriendRequestIdList = sendingFriendRequestList
		.filter((req) => !req.isApproved)
		.map((req) => req.to.id);
	let from: UserInfo = getUserInfo();

	function jobShortName(jobName: string) {
		return JobData.find((job) => job.name === jobName)?.shortName ?? '';
	}

	function openFriendRequestModal() {
		updateModal(FriendRequestModal, {
			to: userInfo,
			from
		});
	}
</script>

<div class="md:w-[24rem] w-full flex flex-col">
	<div class="heading text-sm p-1">
		<span class="mr-4">ID:{userInfo.id}</span><span class="">{userInfo.name}</span>
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
			{#if userInfo.status.length !== 0}
				<div class="flex gap-1 p-1 text-xs flex-wrap ">
					{#each userInfo.status as status}
						<span class="text-xs bg-gray-200 rounded-sm text-gray-900 px-1 font-bold">{status}</span
						>
					{/each}
				</div>
			{/if}
			<div class="text-xs bg-black bg-opacity-50 text-white m-1 rounded-sm font-bold p-1">
				{userInfo.message}
			</div>
		</div>
		{#if sendingFriendRequestIdList.includes(userInfo.id)}
			<div class="p-1">
				<div
					class="text-xs flex h-full w-full leading-none items-center bg-black bg-opacity-50 p-1 font-bold rounded-sm"
				>
					申請中
				</div>
			</div>
		{/if}
		{#if !friendIdList.includes(userInfo.id) && !sendingFriendRequestIdList.includes(userInfo.id)}
			<div class="p-1">
				<button
					class="btn w-full text-xs flex h-full w-full leading-none"
					on:click={openFriendRequestModal}>友達<br />申請</button
				>
			</div>
		{/if}
	</div>
</div>
