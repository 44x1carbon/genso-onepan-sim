<script lang="ts">
	import type { WantedParty } from '$lib/wantedparty/WantedParty';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/ja';
	import type { Timestamp } from 'firebase/firestore';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Asia/Tokyo');
	dayjs.locale('ja');

	export let wantedParty: WantedParty;

	function formatDate(timestamp: Timestamp, minute: number) {
		const start = dayjs(timestamp.toDate());
		return `${start.format('YYYY/MM/DD HH:mm')}~${start
			.add(minute, 'm')
			.format('H:mm')}(${minute}分)`;
	}
</script>

<div class="frame">
	<div class="wantedparty-info">
		<div class="header">
			【{wantedParty.details
				.purpose}】<!--  
		-->{#if wantedParty.details.purpose === 'ブック解放'}<!--  
			-->No.{wantedParty
					.details.bookNums}
			{:else}<!--  
			-->{wantedParty.details.map}
			{/if}
		</div>
		<div class="row">
			<div class="label">期間</div>
			<div class="contents">
				{formatDate(wantedParty.details.time.from, wantedParty.details.time.to)}
			</div>
		</div>

		{#if wantedParty.details.targetMonster}
			<div class="row">
				<div class="label">対象</div>
				<div class="contents">
					{wantedParty.details.targetMonster}
				</div>
			</div>
		{/if}

		<div class="header2">募集要項</div>
		<div class="row">
			<div class="label">メンバー</div>
			<div class="contents">
				<div class="">
					{#each wantedParty.details.wantedJobs as wantedJobs, i}
						{#if wantedJobs.job !== ''}
							<div>{wantedJobs.job} {wantedJobs.num}人</div>
						{:else if i === 0}
							<div>職業自由 {wantedJobs.num}人</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="label">レベル</div>
			<div class="contents">
				Lv.{wantedParty.details.condition.level.from} ~ Lv.{wantedParty.details.condition.level.to}
			</div>
		</div>
		<div class="row">
			<div class="label">備考</div>
			<div class="contents">
				{@html wantedParty.details.condition.memo.replaceAll('\n', '<br>')}
			</div>
		</div>

		<div class="header2">集合場所</div>
		<div class="row">
			<div class="label">場所</div>
			<div class="contents flex-row gap-4">
				<div>{wantedParty.details.meetPlace.region}</div>
				<div>{wantedParty.details.meetPlace.map}{wantedParty.details.meetPlace.channel}</div>
				<div>{wantedParty.details.meetPlace.point}</div>
			</div>
		</div>
		<div class="row">
			<div class="label">募集主</div>
			<div class="contents">
				{wantedParty.owner.name}
			</div>
		</div>
	</div>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}

	.frame {
		width: 1400px;
		height: 700px;
		align-items: center;
		justify-content: center;
		background-color: #444;
	}

	.wantedparty-info {
		margin: 0 auto;
		width: 400px;
		background-color: #400101;
		border: solid 1px rgb(116 40 40);
	}

	.row {
		flex-direction: row;
		align-items: stretch;
		border-top: solid 1px rgb(116 40 40);
	}

	.gap-4 {
		gap: 0.5rem;
	}

	.flex-row {
		flex-direction: row;
	}

	.label {
		align-items: center;
		justify-content: center;
		background-color: rgb(166 45 45);
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 700;
		color: rgb(255 255 255);
		width: 71px;
	}

	.contents {
		color: rgb(255 255 255);
		width: 320px;
		padding: 10px;
	}

	.header {
		padding: 0.25rem 0.5rem;
		font-weight: 700;
		color: rgb(255 255 255);
		background-color: #a62d2d;
		width: 100%;
	}

	.header2 {
		background-color: rgb(166 109 3);
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: rgb(255 255 255);
		width: 100%;
		border-top: solid 1px rgb(116 40 40);
	}
</style>
