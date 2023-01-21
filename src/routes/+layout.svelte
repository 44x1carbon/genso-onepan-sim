<header class="bg-slate-900 block border-box text-white">
	<div class="font-bold text-md p-2">元素騎士オンライン 便利ツール(α版)</div>
	<div class="flex gap-2 text-sm bg-slate-700 w-full p-2 py-1">
		<div>
			<a href="/">ダメージ計算機</a>
		</div>
		<div>
			<a href="/hourly">時給計算機</a>
		</div>
	</div>
</header>

<main class="bg-slate-50 min-h-screen py-2 border-box p-2 pb-24 md:pb-0">
	<slot />
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

	:global(.form-label) {
		@apply bg-gray-500 text-white font-bold p-1 px-2 text-sm flex items-center;
	}

	:global(.form-controll) {
		@apply p-1 flex;
	}

	:global(.form-row) {
		@apply border -mt-px flex border border-l-0 border-r-0;
	}

	:global(input) {
		@apply border indent-1 w-full;
	}
</style>
