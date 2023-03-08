<script lang="ts">
	import { Core, type FriendRequest } from '$lib/friend/Core';
	import setupFirebaseApp from '$lib/Firebase';
	import { getUserInfo } from '$lib/friend/UserInfoStore';
	import { onMount } from 'svelte';
	import JobData from '../../../JobData';

	let sendingRequests: FriendRequest[] = [];
	let oneselfRequests: FriendRequest[] = [];
	let core: Core | undefined = undefined;

	onMount(async () => {
		core = new Core(setupFirebaseApp());

		const userInfo = getUserInfo();
		sendingRequests = (await core.getSendingFriendRequestList(userInfo.id)).filter(
			(friendRequest) => {
				return !friendRequest.isApproved;
			}
		);
		oneselfRequests = (await core.getOneselfFriendRequestList(userInfo.id)).filter(
			(friendRequest) => {
				return !friendRequest.isApproved;
			}
		);
	});

	function jobShortName(jobName: string) {
		return JobData.find((job) => job.name === jobName)?.shortName ?? '';
	}

	async function approveFriendRequest(friendRequest: FriendRequest) {
		if (core) {
			await core.approveFriendRequest(friendRequest);
			alert(`${friendRequest.from.name}さんの友達申請を承認しました！`);

			core.watchFriendStatus(friendRequest.from.id, (friend) => {
				if (friend.isLogin) {
					core?.showLoginFriendNotification(friend);
				}
			});

			const userInfo = getUserInfo();
			sendingRequests = (await core.getSendingFriendRequestList(userInfo.id)).filter(
				(friendRequest) => {
					return !friendRequest.isApproved;
				}
			);
			oneselfRequests = (await core.getOneselfFriendRequestList(userInfo.id)).filter(
				(friendRequest) => {
					return !friendRequest.isApproved;
				}
			);
		}
	}
</script>

<div class="flex gap-2 md:flex-row flex-col">
	<div class="md:flex-1 flex flex-col">
		<div class="heading">受け取った友人申請</div>
		<div class="panel flex-1">
			{#if oneselfRequests.length === 0}
				<div class="p-2 h-full">
					<div class="p-2 h-full bg-black flex items-center justify-center bg-opacity-50">
						申請なし
					</div>
				</div>
			{/if}
			{#each oneselfRequests as friendRequest}
				<div class="p-2 border border-well-read-900 flex items-center justify-between">
					<div class="flex-1">
						<div class="flex">
							<div>
								ID:{friendRequest.from.id}
							</div>
							<div class="ml-2">
								{friendRequest.from.name}
							</div>
						</div>

						<div>
							<div class="flex gap-1 flex-wrap text-xs p-1">
								{#each friendRequest.from.jobs.filter(({ name }) => name !== '') as job}
									<span class="bg-gray-200 rounded-sm px-1 text-gray-900 font-bold"
										>{jobShortName(job.name)} L{job.level}</span
									>
								{/each}
							</div>
							<div class="flex gap-1 p-1 text-xs flex-wrap ">
								{#each friendRequest.from.status as status}
									<span class="text-xs bg-gray-200 rounded-sm text-gray-900 px-1 font-bold"
										>{status}</span
									>
								{/each}
							</div>
						</div>

						<div
							class="text-xs bg-black bg-opacity-50 text-white m-1 rounded-sm font-bold p-1 min-w-[5rem] min-h-full"
						>
							{friendRequest.message}
						</div>
					</div>
					<div>
						<button
							class="btn flex h-full w-full leading-none"
							on:click={() => approveFriendRequest(friendRequest)}>承認</button
						>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="md:flex-1 flex flex-col">
		<div class="heading">送信している友人申請</div>
		<div class="panel border-well-read-900 flex-1">
			{#if sendingRequests.length === 0}
				<div class="p-2 h-full">
					<div class="p-2 h-full bg-black flex items-center justify-center bg-opacity-50">
						申請なし
					</div>
				</div>
			{/if}
			{#each sendingRequests as friendRequest}
				<div class="p-2 border border-well-read-900 flex items-center justify-between">
					<div class="flex-1">
						<div class="flex">
							<div>
								ID:{friendRequest.to.id}
							</div>
							<div class="ml-2">
								{friendRequest.to.name}
							</div>
						</div>

						<div>
							<div class="flex gap-1 flex-wrap text-xs p-1">
								{#each friendRequest.to.jobs.filter(({ name }) => name !== '') as job}
									<span class="bg-gray-200 rounded-sm px-1 text-gray-900 font-bold"
										>{jobShortName(job.name)} L{job.level}</span
									>
								{/each}
							</div>
							<div class="flex gap-1 p-1 text-xs flex-wrap ">
								{#each friendRequest.to.status as status}
									<span class="text-xs bg-gray-200 rounded-sm text-gray-900 px-1 font-bold"
										>{status}</span
									>
								{/each}
							</div>
						</div>

						<div
							class="text-xs bg-black bg-opacity-50 text-white m-1 rounded-sm font-bold p-1 min-w-[5rem] min-h-full"
						>
							{friendRequest.message}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
