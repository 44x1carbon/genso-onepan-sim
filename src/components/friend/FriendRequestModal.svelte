<script lang="ts">
	import { type UserInfo, Core } from '$lib/friend/Core';
	import Modal from '$components/Modal.svelte';
	import UserInfo from '$components/friend/UserInfo.svelte';
	import { closeModal } from '$lib/ModalStore';
	import { onMount } from 'svelte';
	import setupFirebaseApp from '$lib/Firebase';

	export let data: {
		from: UserInfo;
		to: UserInfo;
	};

	let message: string = '';

	let core: Core | undefined = undefined;

	onMount(() => {
		core = new Core(setupFirebaseApp());
	});

	function close() {
		closeModal();
	}

	async function send() {
		if (core) {
			const result = await core.sendFriendRequest(data.to.id, data.from, message);
			if (result) {
				alert(`${data.to.name}さんに友人申請を送信しました。`);
			} else {
				alert(`${data.to.name}さんへの友人申請の送信が失敗しました。`);
			}
			closeModal();
		}
	}
</script>

<Modal>
	<svelte:fragment slot="header">
		{data.to.name}さんに友人申請を送る
	</svelte:fragment>
	<svelte:fragment slot="body">
		<div>メッセージを入力してください！</div>
		<textarea
			bind:value={message}
			class="w-full h-full text-xs"
			placeholder="例) 一緒にレベリングしましょう！"
			rows="5"
			cols="50"
		/>
	</svelte:fragment>
	<svelte:fragment slot="controll">
		<button class="btn nomal" on:click={close}>キャンセル</button>
		<button class="btn" on:click={send}>送信する</button>
	</svelte:fragment>
</Modal>
