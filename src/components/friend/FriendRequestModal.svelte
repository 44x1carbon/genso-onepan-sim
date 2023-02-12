<script lang="ts">
	import type { UserInfo } from 'genso-friend-core';
	import Modal from '../Modal.svelte';
	import UserInfo from './UserInfo.svelte';

	export let data: {
		from: UserInfo;
		to: UserInfo;
	};

	let message: string = '';
</script>

<Modal>
	<svelte:fragment slot="header">
		{data.to.name}さんに友人申請を送る
	</svelte:fragment>
	<svelte:fragment slot="body">
		<textarea bind:value={message} />
	</svelte:fragment>
	<svelte:fragment slot="controll">
		<button>キャンセル</button> <button>送信する</button>
	</svelte:fragment>
</Modal>
