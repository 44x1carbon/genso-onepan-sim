<script lang="ts">
	import type { FriendProfileData } from '$lib/profilecard/ProfileData';
	import { onDestroy, onMount } from 'svelte';
	import JobData from '../../JobData';
	import Preview from './Preview.svelte';
	import MonsterData from '../../MonsterData';
	import MapData from '../../MapData';
	import _ from 'lodash';
	import { FriendCanvas } from '$lib/profilecard/FriendCanvas';
	import Cropper from 'cropperjs';

	let monsterData = _.uniq(MonsterData.map((m) => m.name));

	export let backgroundImg: string;

	let profileData: FriendProfileData = {
		name: '',
		id: '',
		job: {
			name: '',
			lv: 1
		},
		playstyle: '',
		freecomment: '',
		playTime: {
			dayOfWeek: [],
			time: {
				weekday: '',
				holiday: ''
			}
		},
		wantFriends: [],
		togetherFriends: [],
		habitat: [],
		favouriteMonsters: ['', '', ''],
		dislikesMonsters: ['', '', ''],
		image1: undefined,
		image2: undefined
	};

	const SAVE_KEY = 'GENSO-PROFILECARD-FRIEND';
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
						image1: undefined,
						image2: undefined
					})
				);
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});

	function selectPhoto1(e: Event) {
		const target = e.target as HTMLInputElement;
		const fReaderForURI = new FileReader();
		fReaderForURI.readAsDataURL(target.files[0]);
		fReaderForURI.onload = () => {
			// 生成した DataURI を img 要素に渡し、それに対して Cropper を用意します
			const imgEl = document.getElementById('cropper-tgt1') as HTMLImageElement;
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

	function selectPhoto2(e: Event) {
		const target = e.target as HTMLInputElement;
		const fReaderForURI = new FileReader();
		fReaderForURI.readAsDataURL(target.files[0]);
		fReaderForURI.onload = () => {
			// 生成した DataURI を img 要素に渡し、それに対して Cropper を用意します
			const imgEl = document.getElementById('cropper-tgt2') as HTMLImageElement;
			imgEl.src = String(fReaderForURI.result);
			imgEl?.addEventListener('load', () => {
				profileData.image2 = new Cropper(imgEl, {
					aspectRatio: 396 / 215,
					dragMode: 'move',
					cropBoxResizable: false,
					cropBoxMovable: false
				});
			});
		};
	}

	function preview() {
		const img = document.getElementById('preview-img') as HTMLImageElement;
		img.removeAttribute('src');
		const canvas = new FriendCanvas('container', backgroundImg, true);
		canvas.renderCharacterName(profileData.name);
		canvas.renderId(profileData.id);
		canvas.renderJob(profileData.job);
		canvas.renderPlaystyle(profileData.playstyle);
		canvas.renderDayOfWeek(profileData.playTime.dayOfWeek);
		canvas.renderPlayTime(profileData.playTime.time);
		canvas.renderFreecomment(profileData.freecomment);
		canvas.renderTogetherFriends(profileData.togetherFriends);
		canvas.renderWantFriends(profileData.wantFriends);
		canvas.renderHabitat(profileData.habitat);
		canvas.renderFavouriteMonsters(profileData.favouriteMonsters);
		canvas.renderDislikesMonsters(profileData.dislikesMonsters);
		if (profileData.image1) {
			canvas.renderImg1(profileData.image1);
		}
		if (profileData.image2) {
			canvas.renderImg2(profileData.image2);
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
		</div>

		<div class="heading2">よく一緒に遊ぶ人</div>
		<div class="panel">
			<div class="form-row">
				<div class="form-label w-32">1人目</div>
				<div class="form-controll flex-col gap-2">
					<input type="text" bind:value={profileData.togetherFriends[0]} />
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-32">2人目</div>
				<div class="form-controll flex-col gap-2">
					<input type="text" bind:value={profileData.togetherFriends[1]} />
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-32">3人目</div>
				<div class="form-controll flex-col gap-2">
					<input type="text" bind:value={profileData.togetherFriends[2]} />
				</div>
			</div>
		</div>
		<div class="heading2">募集したい友達</div>
		<div class="panel">
			<div class="wantfriends">
				<div class="wantfriend">
					<input
						type="checkbox"
						id="wantfriend-狩り"
						bind:group={profileData.wantFriends}
						value="狩り"
					/>
					<label for="wantfriend-狩り">狩り</label>
				</div>
				<div class="wantfriend">
					<input
						type="checkbox"
						id="wantfriend-タワー"
						bind:group={profileData.wantFriends}
						value="タワー"
					/>
					<label for="wantfriend-タワー">タワー</label>
				</div>
				<div class="wantfriend">
					<input
						type="checkbox"
						id="wantfriend-雑談"
						bind:group={profileData.wantFriends}
						value="雑談"
					/>
					<label for="wantfriend-雑談">雑談</label>
				</div>
				<div class="wantfriend">
					<input
						type="checkbox"
						id="wantfriend-写真"
						bind:group={profileData.wantFriends}
						value="写真"
					/>
					<label for="wantfriend-写真">写真</label>
				</div>
			</div>
		</div>
	</div>

	<div class="md:w-[22rem] w-full">
		<div class="heading2">プレイ時間帯</div>
		<div class="panel">
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
		</div>
		<div class="heading2">よくいる狩場</div>
		<div class="panel">
			<div class="form-row">
				<div class="form-label w-32">1箇所目</div>
				<div class="form-controll flex-col gap-2">
					<select bind:value={profileData.habitat[0]}>
						<option value="">選択してください</option>
						{#each MapData as map}
							<option value={map.name}>{map.name}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-32">2箇所目</div>
				<div class="form-controll flex-col gap-2">
					<select bind:value={profileData.habitat[1]}>
						<option value="">選択してください</option>
						{#each MapData as map}
							<option value={map.name}>{map.name}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-32">3箇所目</div>
				<div class="form-controll flex-col gap-2">
					<select bind:value={profileData.habitat[2]}>
						<option value="">選択してください</option>
						{#each MapData as map}
							<option value={map.name}>{map.name}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</div>

	<div class="md:w-[22rem] w-full">
		<div class="heading2">好きなモンスター</div>
		<div class="panel">
			<div class="form-row">
				<div class="form-label w-32">1体目</div>
				<div class="form-controll flex-col gap-2">
					<select bind:value={profileData.favouriteMonsters[0]}>
						<option value="">選択してください</option>
						{#each monsterData as monster}
							<option value={monster}>{monster}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-32">2体目</div>
				<div class="form-controll flex-col gap-2">
					<select bind:value={profileData.favouriteMonsters[1]}>
						<option value="">選択してください</option>
						{#each monsterData as monster}
							<option value={monster}>{monster}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-32">3体目</div>
				<div class="form-controll flex-col gap-2">
					<select bind:value={profileData.favouriteMonsters[2]}>
						<option value="">選択してください</option>
						{#each monsterData as monster}
							<option value={monster}>{monster}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<div class="heading2">嫌いなモンスター</div>
		<div class="panel">
			<div class="form-row">
				<div class="form-label w-32">1体目</div>
				<div class="form-controll flex-col gap-2">
					<select bind:value={profileData.dislikesMonsters[0]}>
						<option value="">選択してください</option>
						{#each monsterData as monster}
							<option value={monster}>{monster}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-32">2体目</div>
				<div class="form-controll flex-col gap-2">
					<select bind:value={profileData.dislikesMonsters[1]}>
						<option value="">選択してください</option>
						{#each monsterData as monster}
							<option value={monster}>{monster}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-label w-32">3体目</div>
				<div class="form-controll flex-col gap-2">
					<select bind:value={profileData.dislikesMonsters[2]}>
						<option value="">選択してください</option>
						{#each monsterData as monster}
							<option value={monster}>{monster}</option>
						{/each}
					</select>
				</div>
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
				<div class="form-label w-32">フリーコメント</div>
				<div class="form-controll flex-1">
					<textarea class="w-full" bind:value={profileData.freecomment} />
				</div>
			</div>
		</div>

		<div class="heading2">スクリーンショット</div>
		<div class="panel">
			<div>
				<div class="p-2">
					<div class="font-bold mb-1">スクリーンショット1</div>
					<div class="relative w-full max-h-[200px]">
						<img id="cropper-tgt1" class="max-w-full" />
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
					<input type="file" on:change={selectPhoto1} />
				</div>
			</div>
			<div>
				<div class="p-2">
					<div class="font-bold mb-1">スクリーンショット2</div>
					<div class="relative w-full max-h-[200px]">
						<img id="cropper-tgt2" class="max-w-full" />
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
									profileData.image2?.zoomTo(parseFloat(e.currentTarget.value));
								}}
							/>
						</div>
					{/if}
					<input type="file" on:change={selectPhoto2} />
				</div>
			</div>
		</div>
	</div>

	<div class="md:w-[22rem] w-full" />

	<div class="md:w-[22rem] w-full" />
</div>

<Preview {preview} />

<style>
	.wantfriends {
		display: flex;
		justify-content: space-around;
		@apply gap-2 p-2;
	}

	.wantfriend input[type='checkbox'] {
		display: none;
	}

	.wantfriend {
		@apply w-1/4;
	}

	.wantfriend label {
		@apply bg-gray-200 text-gray-400 font-bold block text-center;
		border-radius: 5px;
	}

	.wantfriend input:checked + label {
		@apply bg-gray-500 text-gray-100;
	}
</style>
