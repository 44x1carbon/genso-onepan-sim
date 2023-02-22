<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { USERINFO_SAVE_KEY } from '$lib/wantedparty/SaveKeys';
	import type { UserInfo } from '$lib/wantedparty/UserInfo';
	import { onMount, setContext } from 'svelte';
	import { page } from '$app/stores';

	let hasUserInfo = false;

	onMount(() => {
		const id = setInterval(() => {
			if (browser && $page['route'].id !== '/wantedparty/user') {
				const json = localStorage.getItem(USERINFO_SAVE_KEY);
				if (json === null) {
					goto('/wantedparty/user');
				} else {
					hasUserInfo = true;
				}

				if (hasUserInfo) {
					clearInterval(id);
				}
			}
		}, 100);
	});
</script>

<svelte:head>
	<title>IGNIS TOOLS - PT募集掲示板(α版)</title>
	<meta name="description" content="元素騎士オンラインのPT募集掲示板です。" />
	<meta name="keywords" content="元素騎士オンライン,元素騎士,PT募集掲示板" />
</svelte:head>

{#if hasUserInfo}
	<div class="text-xs flex mb-4 md:w-[74rem] md:mx-auto w-full">
		<div
			class="cursor-pointer text-center flex-1"
			class:bg-gray-700={$page['route'].id !== '/wantedparty'}
			class:bg-mai-tai-400={$page['route'].id === '/wantedparty'}
			class:text-black={$page['route'].id === '/wantedparty'}
			class:font-bold={$page['route'].id === '/wantedparty'}
		>
			<a href="/wantedparty/" class="h-full w-full block p-2 "> PT募集<br />一覧 </a>
		</div>
		<div
			class="cursor-pointer  text-center flex-1"
			class:bg-gray-700={$page['route'].id !== '/wantedparty/wanted'}
			class:bg-mai-tai-400={$page['route'].id === '/wantedparty/wanted'}
			class:text-black={$page['route'].id === '/wantedparty/wanted'}
			class:font-bold={$page['route'].id === '/wantedparty/wanted'}
		>
			<a href="/wantedparty/wanted" class="h-full w-full block p-2 "> PTを<br />募集する </a>
		</div>
		<div
			class="cursor-pointer bg-gray-700  text-center flex-1"
			class:bg-gray-700={$page['route'].id !== '/wantedparty/mypage'}
			class:bg-mai-tai-400={$page['route'].id === '/wantedparty/mypage'}
			class:text-black={$page['route'].id === '/wantedparty/mypage'}
			class:font-bold={$page['route'].id === '/wantedparty/mypage'}
		>
			<a href="/wantedparty/mypage" class="h-full w-full block p-2 "> 自分の<br />募集一覧 </a>
		</div>
		<div
			class="cursor-pointer bg-gray-700  text-center flex-1"
			class:bg-gray-700={$page['route'].id !== '/wantedparty/edituser'}
			class:bg-mai-tai-400={$page['route'].id === '/wantedparty/edituser'}
			class:text-black={$page['route'].id === '/wantedparty/edituser'}
			class:font-bold={$page['route'].id === '/wantedparty/edituser'}
		>
			<a href="/wantedparty/edituser" class="h-full w-full block p-2 ">
				ユーザ-情報<br />編集する
			</a>
		</div>
	</div>
{/if}

{#if hasUserInfo || $page['route'].id === '/wantedparty/user'}
	<slot />
{/if}
