<script lang="ts">
	import { getJobsFortuneResults, resultTypes } from '$lib/fortune/Fortune';

	const results = getJobsFortuneResults().sort((a, b) => b.totalScore - a.totalScore);
</script>

<div>
	<div class="p-2 text-xl font-bold">今日の元素騎士占い（職業別）</div>
	<div class="bg-white bg-opacity-50  p-2 ">
		{#each results as result, i}
			{#if i !== 0 && i % 3 === 0}
				<div class="my-6">
					<a href="/fortune/personal" class="btn justify-center">今日の自分の運勢を占ってみよう！</a
					>
				</div>
			{/if}
			<div class="mt-2 first:mt-0 border border-slate-800 rounded-sm overflow-hidden">
				<div class=" bg-well-read-700 font-bold flex items-center">
					<div class="bg-slate-800 p-1 px-2 text-xl w-[4rem] text-center">{i + 1}位</div>
					<div class="p-1 px-2">
						{result.name}
					</div>
				</div>
				<div class="bg-white">
					{#each resultTypes as type}
						<div class="mt-0 first:mt-0">
							<div class="flex font-bold bg-gray-700 w-full gap-4 p-1">
								<div>
									{#each new Array(4) as _, i}
										{#if i < result[type].rank}
											<span class="text-mai-tai-500">★</span>
										{:else}
											☆
										{/if}
									{/each}
								</div>
								<div>
									{type}
								</div>
							</div>
							<div class="p-1 text-gray-900 font-bold text-xs">
								{result[type].text.slice(0, 48)}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
