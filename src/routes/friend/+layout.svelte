<script lang="ts">
	import { page } from '$app/stores';
    import { getUserInfo } from '$lib/friend/UserInfoStore'
    import { onMount } from 'svelte'
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';

	let nav: { label: string; href: string }[] = [
		{ label: 'ログイン', href: '/friend/login' },
		{ label: '友達<br>一覧', href: '/friend' },
		{ label: 'ユーザー<br>検索', href: '/friend/search' },
		{ label: '申請<br>一覧', href: '/friend/requests' },
		{ label: 'ユーザー<br>編集', href: '/friend/edituser' }
	];

    let hasUserInfo = false;

	onMount(() => {
		const id = setInterval(() => {
			if (browser && $page['route'].id !== '/friend/edituser') {
				const userInfo = getUserInfo();
				if (userInfo === undefined) {
					goto('/friend/edituser');
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

<div>
	<div class="text-xs flex mb-4 md:w-[74rem] md:mx-auto w-full">
		{#each nav as { label, href }}
			<div
				class="cursor-pointer text-center flex-1 bg-mai-tai-400 text-black font-bold"
				class:bg-gray-700={!(($page['route'].id?.startsWith(href) && href !== "/friend") || $page['route'].id === href)}
				class:bg-mai-tai-400={($page['route'].id?.startsWith(href) && href !== "/friend") || $page['route'].id === href}
				class:text-black={($page['route'].id?.startsWith(href) && href !== "/friend") || $page['route'].id === href}
				class:font-bold={($page['route'].id?.startsWith(href) && href !== "/friend") || $page['route'].id === href}
			>
				<a {href} class="h-full w-full block p-1 flex items-center justify-center leading-tight"
					>{@html label}</a
				>
			</div>
		{/each}
	</div>
	<div class="flex flex-wrap gap-4 md:w-[74rem] md:mx-auto">
		<button class="btn w-full mb-4">ログイン</button>
	</div>
	<slot />
</div>
