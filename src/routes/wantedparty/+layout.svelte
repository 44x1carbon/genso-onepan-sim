<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { USERINFO_SAVE_KEY } from '$lib/wantedparty/SaveKeys';
	import type { UserInfo } from '$lib/wantedparty/UserInfo';
	import { onMount, setContext } from 'svelte';
	import { page } from '$app/stores';

	if (browser) {
		const json = localStorage.getItem(USERINFO_SAVE_KEY);

		if (json === null) {
			goto('/wantedparty/user');
		} else {
			setContext('userInfo', JSON.parse(json) as UserInfo);
		}
	}
</script>

<div
	class="border rounded-sm mx-auto p-2 mb-4 border-yellow-700 bg-yellow-500 text-black md:w-[74rem]"
>
	<div>こちらのツールはα版です、表示がされないなど不具合があれば下記のTwitterに連絡ください。</div>
	<div>
		<a href="https://twitter.com/44genso" class="underline text-blue-700">@44genso</a>
	</div>
</div>

<div class="text-xs flex mb-4 md:w-[74rem] md:mx-auto w-full">
	<div
		class="p-2 cursor-pointer text-center flex-1"
		class:bg-gray-700={$page['route'].id !== '/wantedparty'}
		class:bg-mai-tai-400={$page['route'].id === '/wantedparty'}
		class:text-black={$page['route'].id === '/wantedparty'}
		class:font-bold={$page['route'].id === '/wantedparty'}
	>
		<a href="/wantedparty/"> PT募集<br />一覧 </a>
	</div>
	<div
		class="p-2  cursor-pointer  text-center flex-1"
		class:bg-gray-700={$page['route'].id !== '/wantedparty/wanted'}
		class:bg-mai-tai-400={$page['route'].id === '/wantedparty/wanted'}
		class:text-black={$page['route'].id === '/wantedparty/wanted'}
		class:font-bold={$page['route'].id === '/wantedparty/wanted'}
	>
		<a href="/wantedparty/wanted"> PTを<br />募集する </a>
	</div>
	<div
		class="p-2  cursor-pointer bg-gray-700  text-center flex-1"
		class:bg-gray-700={$page['route'].id !== '/wantedparty/mypage'}
		class:bg-mai-tai-400={$page['route'].id === '/wantedparty/mypage'}
		class:text-black={$page['route'].id === '/wantedparty/mypage'}
		class:font-bold={$page['route'].id === '/wantedparty/mypage'}
	>
		<a href="/wantedparty/mypage"> 自分の<br />募集一覧 </a>
	</div>
	<div
		class="p-2  cursor-pointer bg-gray-700  text-center flex-1"
		class:bg-gray-700={$page['route'].id !== '/wantedparty/edituser'}
		class:bg-mai-tai-400={$page['route'].id === '/wantedparty/edituser'}
		class:text-black={$page['route'].id === '/wantedparty/edituser'}
		class:font-bold={$page['route'].id === '/wantedparty/edituser'}
	>
		<a href="/wantedparty/edituser"> ユーザ-情報<br />編集する </a>
	</div>
</div>

<slot />
