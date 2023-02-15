<script lang="ts">
	import { type ChatMessage, Core } from '$lib/friend/Core';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { getUserInfo } from '$lib/friend/UserInfoStore';
	import setupFirebaseApp from '$lib/Firebase';
	import { updateLastSeenTime } from '$lib/friend/LastSeenTimeStore';

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/ja';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Asia/Tokyo');
	dayjs.locale('ja');

	export let data: PageData;

	let chatMessageList: ChatMessage[] = [];
	let toUserInfo: UserInfo | undefined = undefined;
	let fromUserInfo: UserInfo | undefined = undefined;
	let message: string = '';
	let core: Core | undefined = undefined;
	let elChatArea: any = undefined;

	$: _chatMessageList = chatMessageList.sort((a, b) => a.sendAt - b.sendAt);

	onMount(async () => {
		core = new Core(setupFirebaseApp());

		fromUserInfo = getUserInfo();
		chatMessageList = await core.getChatMessageList(fromUserInfo, data.id);
		toUserInfo = await core.getUserInfo(data.id);
		scrollButtom();

		core.addListenerReciveChatMessage(fromUserInfo, async (chatMessage) => {
			chatMessageList = await core.getChatMessageList(fromUserInfo, data.id);
			scrollButtom();
		});

		updateLastSeenTime(data.id);
	});

	async function sendMessage() {
		if (message) {
			const chatMessage = await core.sendChatMessage(data.id, fromUserInfo, message);
			chatMessageList = await core.getChatMessageList(fromUserInfo, data.id);
			scrollButtom();
			message = '';
		}
	}

	function formatDate(sendAt: number) {
		return dayjs(sendAt).format('YYYY/MM/DD HH:mm:ss');
	}

	function htmlspecialchars(unsafeText) {
		if (typeof unsafeText !== 'string') {
			return unsafeText;
		}
		const text = unsafeText.replace(/[&'`"<>]/g, function (match) {
			return {
				'&': '&amp;',
				"'": '&#x27;',
				'`': '&#x60;',
				'"': '&quot;',
				'<': '&lt;',
				'>': '&gt;'
			}[match];
		});
		return text;
	}

	function scrollButtom() {
		setTimeout(() => {
			elChatArea.scrollTo(0, elChatArea.scrollHeight);
		}, 100);
	}
</script>

{#if toUserInfo && fromUserInfo}
	<div class="bg-white rounded-sm border border-gray-700">
		<div class="bg-well-read-900 p-2 font-bold border-b border-gray-700">
			{toUserInfo.name}さんとのチャット
		</div>
		<div class="h-96 text-black overflow-y-scroll" bind:this={elChatArea}>
			{#each _chatMessageList as message}
				{#key message.id}
					{#if message.from.id === fromUserInfo.id}
						<div class="flex px-2 pt-1 justify-end">
							<div class="min-w-[10rem]">
								<div class="bg-green-300 p-1 rounded leading-tight text-sm">
									{@html htmlspecialchars(message.message).replace('\n', '<br>')}
								</div>
								<div class="text-xs text-right">{formatDate(message.sendAt)}</div>
							</div>
						</div>
					{:else}
						<div class="flex px-2 pt-1 justify-start">
							<div class="min-w-[10rem]">
								<div class="bg-gray-200 p-1 rounded leading-tight text-sm">
									{@html htmlspecialchars(message.message).replace('\n', '<br>')}
								</div>
								<div class="text-xs text-left">{formatDate(message.sendAt)}</div>
							</div>
						</div>
					{/if}
				{/key}
			{/each}
		</div>
		<div class="flex gap-2 p-2 bg-gray-500">
			<textarea class="flex-1" bind:value={message} />
			<button class="btn" on:click={sendMessage}>送信</button>
		</div>
	</div>
{/if}
