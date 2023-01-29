<script lang="ts">
	import type { WantedPartyDetails } from '$lib/wantedparty/WantedPartyDetails';
	import Modal from '../Modal.svelte';
	import { closeModal } from '$lib/ModalStore';

	export let data: { wantedData: WantedPartyDetails; id: string };

	$: tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURI(
		`
【PT募集中】
${data.wantedData.purpose} ${
			data.wantedData.purpose === 'ブック解放'
				? 'No.' + data.wantedData.bookNums
				: data.wantedData.map
		}${data.wantedData.targetMonster ? '\n' + data.wantedData.targetMonster : ''}

募集メンバー
${data.wantedData.wantedJobs
	.map((wantedJob, i) =>
		`
	${
		wantedJob.job !== ''
			? `・${wantedJob.job} ${wantedJob.num}人`
			: i === 0
			? `・職業自由 ${wantedJob.num}人`
			: ''
	}	
`.trim()
	)
	.filter((t) => t)
	.join('\n')}

↓PTへの参加はこちらから\n`.trimStart()
	)}&url=https://ignis-tools.vercel.app/wantedparty/${data.id}&hashtags=元素騎士,PT募集`;
</script>

<Modal>
	<svelte:fragment slot="header">PT募集をツイートする</svelte:fragment>

	<svelte:fragment slot="body">
		ツイートをするとよりメンバーが集まりやすくなります。<br />
		PT募集をツイートしますか?
	</svelte:fragment>

	<svelte:fragment slot="controll">
		<button on:click={closeModal} class="border p-1 rounded bg-gray-200 text-gray-900"
			>ツイートしない</button
		>
		<a
			href={tweetUrl}
			on:click={closeModal}
			class="border p-1 rounded bg-blue-500 border-blue-900"
			target="_blank">ツイートする</a
		>
	</svelte:fragment>
</Modal>
