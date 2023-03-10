<script lang="ts">
	import { StatusCanvas } from '$lib/profilecard/StatusCanvas';
	import type { StatusProfileData } from '$lib/profilecard/ProfileData';
	import { onDestroy, onMount } from 'svelte';
	import JobData from '../../JobData';
	import SkillTreeData from '../../SkillTreeData';
	import Preview from './Preview.svelte';

	export let backgroundImg: string;

	let profileData: StatusProfileData = {
		name: '',
		id: '',
		job: {
			name: '',
			lv: 1
		},
		playstyle: '',
		status: {
			hp: 0,
			mp: 0,
			attack: 0,
			magicAttack: 0,
			strength: 0,
			brains: 0,
			skillful: 0,
			mind: 0,
			difence: 0,
			speed: 0
		},
		freecomment: '',
		playTime: {
			dayOfWeek: [],
			time: {
				weekday: '',
				holiday: ''
			}
		},
		baseEquipment: {
			右手: { name: '', rarity: '', level: 0 },
			左手: { name: '', rarity: '', level: 0 },
			胴: { name: '', rarity: '', level: 0 },
			足: { name: '', rarity: '', level: 0 },
			頭: { name: '', rarity: '', level: 0 },
			背中: { name: '', rarity: '', level: 0 },
			肩: { name: '', rarity: '', level: 0 },
			指輪: { name: '', rarity: '', level: 0 }
		},
		cosplayEquipment: {
			右手: { name: '', rarity: '', level: 0 },
			左手: { name: '', rarity: '', level: 0 },
			胴: { name: '', rarity: '', level: 0 },
			足: { name: '', rarity: '', level: 0 },
			頭: { name: '', rarity: '', level: 0 },
			背中: { name: '', rarity: '', level: 0 },
			肩: { name: '', rarity: '', level: 0 }
		},
		skillStructure: [{ name: '', level: 1 }],
		image1: undefined
	};

	const SAVE_KEY = 'GENSO-PROFILECARD-STATUS';
	let isInit = false;
	let intervalId: NodeJS.Timer | undefined = undefined;

	onMount(() => {
		const json = localStorage.getItem(SAVE_KEY);
		if (json) {
			profileData = JSON.parse(json);
		}
		isInit = true;

		intervalId = setInterval(() => {
			if (isInit) {
				localStorage.setItem(
					SAVE_KEY,
					JSON.stringify({
						...profileData,
						image1: undefined
					})
				);
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});

	function selectPhoto(e: Event) {
		const target = e.target as HTMLInputElement;
		const fReaderForURI = new FileReader();
		fReaderForURI.readAsDataURL(target.files[0]);
		fReaderForURI.onload = () => {
			// 生成した DataURI を img 要素に渡し、それに対して Cropper を用意します
			const imgEl = document.getElementById('cropper-tgt') as HTMLImageElement;
			imgEl.src = String(fReaderForURI.result);
			imgEl?.addEventListener('load', () => {
				profileData.image1 = new Cropper(imgEl, {
					aspectRatio: 396 / 215,
					dragMode: 'move',
					cropBoxResizable: false,
					cropBoxMovable: false
				});
			});
		};
	}

	function deleteSelectSkill(i: number) {
		profileData.skillStructure = profileData.skillStructure.filter((_, _i) => _i !== i);
	}

	function preview() {
		const img = document.getElementById('preview-img') as HTMLImageElement;
		img.removeAttribute('src');
		const canvas = new StatusCanvas('container', backgroundImg, false);
		canvas.renderCharacterName(profileData.name);
		canvas.renderId(profileData.id);
		canvas.renderJob(profileData.job);
		canvas.renderPlaystyle(profileData.playstyle);
		canvas.renderStatus(profileData.status);
		canvas.renderSkillStructure(profileData.skillStructure.filter((s) => s.name !== ''));
		canvas.renderFreecomment(profileData.freecomment);
		canvas.renderBaseEquipment(profileData.baseEquipment);
		canvas.renderCosplayEquipment(profileData.cosplayEquipment);
		canvas.renderDayOfWeek(profileData.playTime.dayOfWeek);
		canvas.renderPlayTime(profileData.playTime.time);
		if (profileData.image1) {
			canvas.renderImg(profileData.image1);
		}

		setTimeout(() => {
			img.src = canvas.toDataURL();
		}, 1000);
	}
</script>

<div class="heading">自己紹介の情報の入力しよう！</div>
<div class="flex gap-4 flex-wrap bg-black bg-opacity-40 p-2 justify-around">
	<div class="md:w-[22rem] w-full">
		<div class="heading2">基本情報</div>
		<div class="panel">
			<div class="form-row">
				<div class="form-label w-24">キャラ名</div>
				<div class="form-controll">
					<input type="text" bind:value={profileData.name} />
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-24">ID</div>
				<div class="form-controll">
					<input type="text" bind:value={profileData.id} maxlength="4" placeholder="例) ABCD" />
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-24">職業</div>
				<div class="form-controll">
					<div>
						<select bind:value={profileData.job.name}>
							<option value={''}>職業を選択</option>
							{#each JobData as job}
								<option value={job.name}>{job.name}</option>
							{/each}
						</select>

						<select bind:value={profileData.job.lv}>
							<option value={1}>Lv1</option>
							<option value={2}>Lv2</option>
							<option value={3}>Lv3</option>
							<option value={4}>Lv4</option>
							<option value={5}>Lv5</option>
							<option value={6}>Lv6</option>
							<option value={7}>Lv7</option>
							<option value={8}>Lv8</option>
							<option value={9}>Lv9</option>
							<option value={10}>Lv10</option>
							<option value={11}>Lv11</option>
							<option value={12}>Lv12</option>
							<option value={13}>Lv13</option>
							<option value={14}>Lv14</option>
							<option value={15}>Lv15</option>
							<option value={16}>Lv16</option>
							<option value={17}>Lv17</option>
							<option value={18}>Lv18</option>
							<option value={19}>Lv19</option>
							<option value={20}>Lv20</option>
							<option value={21}>Lv21</option>
							<option value={22}>Lv22</option>
							<option value={23}>Lv23</option>
							<option value={24}>Lv24</option>
							<option value={25}>Lv25</option>
							<option value={26}>Lv26</option>
							<option value={27}>Lv27</option>
							<option value={28}>Lv28</option>
							<option value={29}>Lv29</option>
							<option value={30}>Lv30</option>
						</select>
					</div>
				</div>
			</div>
			<div class="px-2 text-sm font-bold bg-well-read-900">ステータス</div>
			<div class="flex flex-wrap">
				<div class="form-row w-1/2">
					<div class="form-label w-24">HP</div>
					<div class="form-controll">
						<input type="number" bind:value={profileData.status.hp} />
					</div>
				</div>
				<div class="form-row w-1/2">
					<div class="form-label w-24">MP</div>
					<div class="form-controll">
						<input type="number" bind:value={profileData.status.mp} />
					</div>
				</div>
				<div class="form-row w-1/2">
					<div class="form-label w-24">攻撃力</div>
					<div class="form-controll">
						<input type="number" bind:value={profileData.status.attack} />
					</div>
				</div>
				<div class="form-row w-1/2">
					<div class="form-label w-24">魔法<br />攻撃力</div>
					<div class="form-controll">
						<input type="number" bind:value={profileData.status.magicAttack} />
					</div>
				</div>
				<div class="form-row w-1/2">
					<div class="form-label w-24">腕力</div>
					<div class="form-controll">
						<input type="number" bind:value={profileData.status.strength} />
					</div>
				</div>
				<div class="form-row w-1/2">
					<div class="form-label w-24">防御力</div>
					<div class="form-controll">
						<input type="number" bind:value={profileData.status.difence} />
					</div>
				</div>
				<div class="form-row w-1/2">
					<div class="form-label w-24">速さ</div>
					<div class="form-controll">
						<input type="number" bind:value={profileData.status.speed} />
					</div>
				</div>
				<div class="form-row w-1/2">
					<div class="form-label w-24">知力</div>
					<div class="form-controll">
						<input type="number" bind:value={profileData.status.brains} />
					</div>
				</div>
				<div class="form-row w-1/2">
					<div class="form-label w-24">器用</div>
					<div class="form-controll">
						<input type="number" bind:value={profileData.status.skillful} />
					</div>
				</div>
				<div class="form-row w-1/2">
					<div class="form-label w-24">精神</div>
					<div class="form-controll">
						<input type="number" bind:value={profileData.status.mind} />
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="md:w-[22rem] w-full">
		<div class="heading2">ベース装備</div>
		<div class="panel">
			{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩', '指輪'] as pos}
				<div class="form-row">
					<div class="form-label w-12">{pos}</div>
					<div class="form-controll flex-1 text-xs w-4 flex gap-2 justify-between">
						<input type="text" bind:value={profileData.baseEquipment[pos].name} />
						<select bind:value={profileData.baseEquipment[pos].rarity}>
							<option value="">-</option>
							<option value="N">N</option>
							<option value="R">R</option>
							<option value="SR">SR</option>
							<option value="LR">LR</option>
						</select>
						<select bind:value={profileData.baseEquipment[pos].level}>
							<option value={0}>未強化</option>
							VM1768093:1 <option value={1}>Lv1</option>
							<option value={2}>Lv2</option>
							<option value={3}>Lv3</option>
							<option value={4}>Lv4</option>
							<option value={5}>Lv5</option>
							<option value={6}>Lv6</option>
							<option value={7}>Lv7</option>
							<option value={8}>Lv8</option>
							<option value={9}>Lv9</option>
							<option value={10}>Lv10</option>
							<option value={11}>Lv11</option>
							<option value={12}>Lv12</option>
							<option value={13}>Lv13</option>
							<option value={14}>Lv14</option>
							<option value={15}>Lv15</option>
							<option value={16}>Lv16</option>
							<option value={17}>Lv17</option>
							<option value={18}>Lv18</option>
							<option value={19}>Lv19</option>
							<option value={20}>Lv20</option>
							<option value={21}>Lv21</option>
							<option value={22}>Lv22</option>
							<option value={23}>Lv23</option>
							<option value={24}>Lv24</option>
							<option value={25}>Lv25</option>
							<option value={26}>Lv26</option>
							<option value={27}>Lv27</option>
							<option value={28}>Lv28</option>
							<option value={29}>Lv29</option>
							<option value={30}>Lv30</option>
							<option value={31}>Lv31</option>
							<option value={32}>Lv32</option>
							<option value={33}>Lv33</option>
							<option value={34}>Lv34</option>
							<option value={35}>Lv35</option>
							<option value={36}>Lv36</option>
							<option value={37}>Lv37</option>
							<option value={38}>Lv38</option>
							<option value={39}>Lv39</option>
							<option value={40}>Lv40</option>
							<option value={41}>Lv41</option>
							<option value={42}>Lv42</option>
							<option value={43}>Lv43</option>
							<option value={44}>Lv44</option>
							<option value={45}>Lv45</option>
							<option value={46}>Lv46</option>
							<option value={47}>Lv47</option>
							<option value={48}>Lv48</option>
							<option value={49}>Lv49</option>
							<option value={50}>Lv50</option>
							<option value={51}>Lv51</option>
							<option value={52}>Lv52</option>
							<option value={53}>Lv53</option>
							<option value={54}>Lv54</option>
							<option value={55}>Lv55</option>
							<option value={56}>Lv56</option>
							<option value={57}>Lv57</option>
							<option value={58}>Lv58</option>
							<option value={59}>Lv59</option>
							<option value={60}>Lv60</option>
							<option value={61}>Lv61</option>
							<option value={62}>Lv62</option>
							<option value={63}>Lv63</option>
							<option value={64}>Lv64</option>
							<option value={65}>Lv65</option>
							<option value={66}>Lv66</option>
							<option value={67}>Lv67</option>
							<option value={68}>Lv68</option>
							<option value={69}>Lv69</option>
							<option value={70}>Lv70</option>
							<option value={71}>Lv71</option>
							<option value={72}>Lv72</option>
							<option value={73}>Lv73</option>
							<option value={74}>Lv74</option>
							<option value={75}>Lv75</option>
							<option value={76}>Lv76</option>
							<option value={77}>Lv77</option>
							<option value={78}>Lv78</option>
							<option value={79}>Lv79</option>
							<option value={80}>Lv80</option>
						</select>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="md:w-[22rem] w-full">
		<div class="heading2">おしゃれ装備</div>
		<div class="panel">
			{#each ['右手', '左手', '胴', '足', '頭', '背中', '肩'] as pos}
				<div class="form-row">
					<div class="form-label w-12">{pos}</div>

					<div class="form-controll flex-1 text-xs w-4 flex gap-2 justify-between">
						<input type="text" bind:value={profileData.cosplayEquipment[pos].name} />
						<select bind:value={profileData.cosplayEquipment[pos].rarity}>
							<option value="">-</option>
							<option value="N">N</option>
							<option value="R">R</option>
							<option value="SR">SR</option>
							<option value="LR">LR</option>
						</select>
						<select bind:value={profileData.cosplayEquipment[pos].level}>
							<option value={0}>未強化</option>
							VM1768093:1 <option value={1}>Lv1</option>
							<option value={2}>Lv2</option>
							<option value={3}>Lv3</option>
							<option value={4}>Lv4</option>
							<option value={5}>Lv5</option>
							<option value={6}>Lv6</option>
							<option value={7}>Lv7</option>
							<option value={8}>Lv8</option>
							<option value={9}>Lv9</option>
							<option value={10}>Lv10</option>
							<option value={11}>Lv11</option>
							<option value={12}>Lv12</option>
							<option value={13}>Lv13</option>
							<option value={14}>Lv14</option>
							<option value={15}>Lv15</option>
							<option value={16}>Lv16</option>
							<option value={17}>Lv17</option>
							<option value={18}>Lv18</option>
							<option value={19}>Lv19</option>
							<option value={20}>Lv20</option>
							<option value={21}>Lv21</option>
							<option value={22}>Lv22</option>
							<option value={23}>Lv23</option>
							<option value={24}>Lv24</option>
							<option value={25}>Lv25</option>
							<option value={26}>Lv26</option>
							<option value={27}>Lv27</option>
							<option value={28}>Lv28</option>
							<option value={29}>Lv29</option>
							<option value={30}>Lv30</option>
							<option value={31}>Lv31</option>
							<option value={32}>Lv32</option>
							<option value={33}>Lv33</option>
							<option value={34}>Lv34</option>
							<option value={35}>Lv35</option>
							<option value={36}>Lv36</option>
							<option value={37}>Lv37</option>
							<option value={38}>Lv38</option>
							<option value={39}>Lv39</option>
							<option value={40}>Lv40</option>
							<option value={41}>Lv41</option>
							<option value={42}>Lv42</option>
							<option value={43}>Lv43</option>
							<option value={44}>Lv44</option>
							<option value={45}>Lv45</option>
							<option value={46}>Lv46</option>
							<option value={47}>Lv47</option>
							<option value={48}>Lv48</option>
							<option value={49}>Lv49</option>
							<option value={50}>Lv50</option>
							<option value={51}>Lv51</option>
							<option value={52}>Lv52</option>
							<option value={53}>Lv53</option>
							<option value={54}>Lv54</option>
							<option value={55}>Lv55</option>
							<option value={56}>Lv56</option>
							<option value={57}>Lv57</option>
							<option value={58}>Lv58</option>
							<option value={59}>Lv59</option>
							<option value={60}>Lv60</option>
							<option value={61}>Lv61</option>
							<option value={62}>Lv62</option>
							<option value={63}>Lv63</option>
							<option value={64}>Lv64</option>
							<option value={65}>Lv65</option>
							<option value={66}>Lv66</option>
							<option value={67}>Lv67</option>
							<option value={68}>Lv68</option>
							<option value={69}>Lv69</option>
							<option value={70}>Lv70</option>
							<option value={71}>Lv71</option>
							<option value={72}>Lv72</option>
							<option value={73}>Lv73</option>
							<option value={74}>Lv74</option>
							<option value={75}>Lv75</option>
							<option value={76}>Lv76</option>
							<option value={77}>Lv77</option>
							<option value={78}>Lv78</option>
							<option value={79}>Lv79</option>
							<option value={80}>Lv80</option>
						</select>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="md:w-[22rem] w-full">
		<div class="heading2">スキル構成</div>
		<div class="panel">
			<div>
				{#each profileData.skillStructure as _, i}
					<div class="p-2 border-b flex gap-2 border-well-read-700 bg-well-read-700 bg-opacity-40">
						<select bind:value={profileData.skillStructure[i].name} class="flex-1">
							{#each profileData.job.name !== '' ? Object.values(SkillTreeData[profileData.job.name].skills).filter((s) => !s.name.includes('+')) : [] as skill}
								<option value={skill.name}>{skill.name}</option>
							{/each}
						</select>

						<select bind:value={profileData.skillStructure[i].level}>
							<option value={1}>Lv1</option>
							<option value={2}>Lv2</option>
							<option value={3}>Lv3</option>
							<option value={4}>Lv4</option>
							<option value={5}>Lv5</option>
						</select>

						<button
							class="w-6 h-6 rounded-full bg-gray-200 text-gray-700"
							on:click={() => deleteSelectSkill(i)}>×</button
						>
					</div>
				{/each}
			</div>
			<div class="p-2">
				<button
					class="w-full btn normal"
					on:click={() =>
						(profileData.skillStructure = [...profileData.skillStructure, { name: '', level: 1 }])}
					>+</button
				>
			</div>
		</div>
	</div>

	<div class="md:w-[22rem] w-full">
		<div class="heading2">スクリーンショット</div>
		<div class="panel">
			<div class="relative w-full max-h-[200px]">
				<img id="cropper-tgt" class="max-w-full" />
			</div>
			{#if profileData.image1}
				<div class="p-2">
					<input
						class="w-full"
						type="range"
						min="0"
						max="2"
						step="0.01"
						value="0.28"
						on:input={(e) => {
							profileData.image1?.zoomTo(parseFloat(e.currentTarget.value));
						}}
					/>
				</div>
			{/if}

			<div class="p-2">
				<input type="file" on:change={selectPhoto} />
			</div>
		</div>
	</div>

	<div class="md:w-[22rem] w-full">
		<div class="heading2">その他情報</div>
		<div class="panel">
			<div class="form-row">
				<div class="form-label w-32">プレイスタイル</div>
				<div class="form-controll">
					<select bind:value={profileData.playstyle}>
						<option value="まったりプレイ">まったりプレイ</option>
						<option value="がっつりプレイ">がっつりプレイ</option>
						<option value="職業：元素騎士">職業：元素騎士</option>
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-32">プレイ時間帯</div>
				<div class="form-controll flex-col gap-2">
					<div class="weekday flex justify-between">
						{#each '月火水木金土日'.split('') as weekDay}
							<input
								type="checkbox"
								id={`weekday-${weekDay}`}
								value={weekDay}
								bind:group={profileData.playTime.dayOfWeek}
							/>
							<label for={`weekday-${weekDay}`} class="flex justify-center items-center">
								{weekDay}
							</label>
						{/each}
					</div>
					<div class="flex">
						<div class="w-16">平日：</div>
						<input
							type="text"
							placeholder="10:00 ~ 12:00"
							bind:value={profileData.playTime.time.weekday}
						/>
					</div>
					<div class="flex">
						<div class="w-16">休日：</div>
						<input
							type="text"
							placeholder="10:00 ~ 12:00"
							bind:value={profileData.playTime.time.holiday}
						/>
					</div>
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-32">フリーコメント</div>
				<div class="form-controll flex-1">
					<textarea class="w-full" bind:value={profileData.freecomment} />
				</div>
			</div>
		</div>
	</div>
</div>

<Preview {preview} />
