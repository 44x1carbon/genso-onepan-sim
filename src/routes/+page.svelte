<script lang="ts">
	import Monster from '../components/Monster.svelte';
	import StatusForm from '..//components/StatusForm.svelte';
	import SkillSelector from '../components/SkillSelector.svelte';
	import type { Attack, Skill, SkillLevel } from '../SkillData';
	import type { Status } from '../Status';
	import Damage from '../components/Damage.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import ShareFab from '../components/ShareFAB.svelte';
	import Ad from '$components/Ad.svelte';

	let skills: Skill[] = [];
	let levels: { [skillName: string]: SkillLevel } = {};
	let status: Status = {
		offensivePower: 0,
		magicalPower: 0,
		armStrength: 0,
		brains: 0,
		level: 0
	};

	let addStatus: Status = {
		offensivePower: 0,
		magicalPower: 0,
		armStrength: 0,
		brains: 0,
		level: 0
	};

	let isIncludeNomalAttack: boolean = false;

	$: _skills = [...skills];

	$: _status = {
		offensivePower: status.offensivePower + addStatus.offensivePower,
		magicalPower: status.magicalPower + addStatus.magicalPower,
		armStrength: status.armStrength + addStatus.armStrength,
		brains: status.brains + addStatus.brains,
		level: status.level
	} as Status;

	// ステータスの入力内容を保存する処理
	const SAVE_KEY = 'GENSO-ONEPAN-SIM-STATUS';
	const SKILLS_SAVE_KEY = 'GENSO-ONEPAN-SIM-SKILLS';
	let isInit = false;
	$: {
		// @ts-ignore
		if (status && browser && isInit) {
			// @ts-ignore
			localStorage.setItem(SAVE_KEY, JSON.stringify(status));
		}

		if (skills.length && browser && isInit) {
			localStorage.setItem(
				SKILLS_SAVE_KEY,
				JSON.stringify({
					skills,
					levels
				})
			);
		}
	}
	onMount(() => {
		// @ts-ignore
		const json = localStorage.getItem(SAVE_KEY);
		if (json) {
			status = JSON.parse(json);
		}
		const skillJson = localStorage.getItem(SKILLS_SAVE_KEY);
		if (skillJson) {
			const { skills: _skills, levels: _levels } = JSON.parse(skillJson);
			skills = _skills;
			levels = _levels;
		}
		isInit = true;
	});
</script>

<svelte:head>
	<title>IGNIS TOOLS - ダメージ計算機(α版)</title>
	<meta name="description" content="元素騎士オンラインのダメージを計算できるツールです。" />
	<meta name="keywords" content="元素騎士オンライン,元素騎士,ダメージ計算機,ダメージ" />
</svelte:head>

<div class="md:w-[74rem] mx-auto">
	<div class="text-2xl font-bold">ダメージ計算機</div>
</div>
<div
	class="border-2 rounded mx-auto p-2 my-2 border-yellow-700 bg-yellow-500 text-black md:w-[74rem] text-xs"
>
	公式や解析で正しい計算式が出ていない為、使用している計算式は開発者の独自検証によるものです。<br />
	ゲーム内と大きく異なる可能性があるのであくまで参考程度としてお使いください。
</div>
<div class="flex mx-auto w-fit gap-4 flex-col md:flex-row">
	<div>
		<SkillSelector bind:skills bind:levels bind:isIncludeNomalAttack />
		<Ad device="pc" _class="md:w-96">
			<ins
				class="adsbygoogle"
				style="display:block"
				data-ad-client="ca-pub-9799169908631652"
				data-ad-slot="1970657218"
				data-ad-format="auto"
				data-full-width-responsive="true"
			/>
		</Ad>
	</div>
	<div>
		<StatusForm bind:status bind:addStatus />
		<Damage status={_status} skills={_skills} {levels} />
		<div class="border-2 rounded mx-auto p-2 mt-2 border-red-700 bg-red-500  md:w-96">
			現在α版です。計算式を検証中なのでダメージがゲーム内と異なる場合があります。<br />
			計算結果が違った場合は、<a
				target="_blank"
				href="https://forms.gle/hjZzLWwRjhbdiRDX7"
				class="underline text-blue-300">こちら</a
			> のフォームで情報の提供をお願いします。
		</div>
	</div>
	<div>
		<Monster status={_status} skills={_skills} {levels} />
		<Ad device="pc" _class="md:w-96">
			<ins
				class="adsbygoogle"
				style="display:block"
				data-ad-client="ca-pub-9799169908631652"
				data-ad-slot="7211375602"
				data-ad-format="auto"
				data-full-width-responsive="true"
			/>
		</Ad>
	</div>
</div>

<ShareFab
	tweetBody={`【元素騎士 ダメージ計算機】\n今の自分の実力がわかるダメージ計算機！\n狩場を探したりするのにも便利です！`}
/>
