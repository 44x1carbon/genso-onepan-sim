<script lang="ts">
	import Monster from '../components/Monster.svelte';
	import StatusForm from '..//components/StatusForm.svelte';
	import SkillSelector from '../components/SkillSelector.svelte';
	import type { Skill, SkillLevel } from '../SkillData';
	import type { Status } from '../Status';
	import Damage from '../components/Damage.svelte';

	let attackPower: number = 1080; // magic攻撃力　or 攻撃力
	let statusPower: number = 1080; // 知力 or 腕力
	let attackLeverage: number = 1.13; // 攻撃倍率

	let skill: Skill | undefined = undefined;
	let level: SkillLevel = 5;

	let status: Status = {
		offensivePower: 0,
		magicalPower: 0,
		armStrength: 0,
		brains: 0
	};
</script>

<svelte:head>
	<title>元素騎士オンライン ダメージ計算機(α版)</title>
	<meta name="”description“" content="元素騎士オンラインのダメージを計算できるツールです。" />
	<meta name="”keywords”" content="元素騎士オンライン,元素騎士,ダメージ計算機,ダメージ" />
</svelte:head>

<headerr class="bg-slate-900 p-2 block border-box text-white">
	<div class="font-bold text-md">元素騎士オンライン ダメージ計算機(α版)</div>
</headerr>
<main class="bg-slate-50 min-h-screen py-2 border-box p-2 pb-24 md:pb-0">
	<div class="flex mx-auto w-fit gap-4 flex-col md:flex-row">
		<div>
			<SkillSelector bind:skill bind:level />
		</div>
		<div>
			<StatusForm bind:status />
			<Damage {status} {skill} {level} />
			<div class="border-2 rounded mx-auto p-2 mt-2 border-red-200 bg-red-50 text-gray-700 md:w-96">
				現在α版です。計算式を検証中なのでダメージがゲーム内と異なる場合があります。<br />
				計算結果が違った場合は、<a
					target="_blank"
					href="https://forms.gle/hjZzLWwRjhbdiRDX7"
					class="underline text-blue-500">こちら</a
				> のフォームで情報の提供をお願いします。
			</div>
		</div>
		<div>
			<Monster {status} {skill} {level} />
		</div>
	</div>
</main>
<footer class="bg-slate-700 p-4 fixed w-full bottom-0 text-white text-xs">
	<div class="leading-relaxed">
		<div>不具合などありましたら下記のTwitterでDMを下さい。</div>
		<div>
			開発者: <a href="https://twitter.com/44genso" class="underline text-blue-500">@44genso</a>
		</div>
	</div>
</footer>

<style global>
	@tailwind utilities;
	@tailwind components;
	@tailwind base;

	:global(.heading) {
		@apply bg-gray-700 text-white font-bold px-2;
	}
</style>
