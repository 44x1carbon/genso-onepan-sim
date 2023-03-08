<section>
	<h2>フレンド機能でできること</h2>
	<div>
		<ul>
			<li>
				ユーザーの検索<br /><span class="text-xs"
					>友達申請を送たいユーザーを検索することができます。</span
				>
			</li>
			<li>
				ログイン通知<br /><span class="text-xs"
					>友達がログインした際に通知が届きます。(PC、Androidのみ対応)</span
				>
			</li>
			<li>
				チャット機能<br /><span class="text-xs"
					>友達とチャットでやり取りができます。(通知はPC、Androidのみ対応)</span
				>
			</li>
		</ul>
	</div>
</section>
<section>
	<h2>注意点</h2>
	<div>
		<ul>
			<li>
				<span class="text-xs"
					>ゲームを終了する場合は必ずログインページよりログアウトをして下さい。</span
				>
			</li>
		</ul>
	</div>
</section>
<section>
	<h2>使い方</h2>
	<div>
		<section>
			<h3>■ 初めてこのツールを使う場合</h3>
			<div>
				<ol>
					<li>
						ユーザー情報を登録する<br />
						<span class="text-xs">
							<a href="/friend/edituser" class="underline text-blue-400">ユーザー情報編集ページ</a
							>からユーザー情報を登録してください。<br />
							※ レベルが上がった場合は情報を更新してください。
						</span>
					</li>
				</ol>
			</div>
		</section>
		<section>
			<h3>■ ゲームを開始する場合</h3>
			<div>
				<ol>
					<li>
						ログインする<br />
						<span class="text-xs">
							<a href="/friend/login" class="underline text-blue-400">ログインページ</a
							>から「ログイン」ボタンをクリックして下さい。
						</span>
					</li>
					<li>
						ゲームを起動する<br />
						<span class="text-xs"> 「ゲームを起動」ボタンをクリックして下さい。 </span>
					</li>
				</ol>
			</div>
		</section>
		<section>
			<h3>■ 友達申請を送る場合</h3>
			<div>
				<ol>
					<li>
						友達を探す<br />
						<span class="text-xs">
							<a href="/friend/search" class="underline text-blue-400">ユーザー検索ページ</a
							>から友達になりたいユーザーのIDもしくはジョブや目的などから探して下さい。
						</span>
					</li>
					<li>
						友達申請を送る<br />
						<span class="text-xs"
							>「友達申請」ボタンをクリックしメッセージを入れると申請が送られます。相手に承認されると友達になれます。</span
						>
					</li>
				</ol>
			</div>
		</section>
		<section>
			<h3>■ 友達申請を承認する場合</h3>
			<div>
				<ol>
					<li>
						申請一覧ページに移動する<br />
						<span class="text-xs">
							<a href="/friend/requests" class="underline text-blue-400">申請一覧ページ</a
							>に移動してください。
						</span>
					</li>
					<li>
						承認する<br />
						<span class="text-xs"
							>来ている友達申請が一覧で表示されるので「承認」ボタンをクリックしてください。</span
						>
					</li>
				</ol>
			</div>
		</section>
		<section>
			<h3>■ チャットをする場合</h3>
			<div>
				<ol>
					<li>
						友達一覧ページに移動する<br />
						<span class="text-xs">
							<a href="/friend" class="underline text-blue-400">友達一覧ページ</a
							>に移動してください。
						</span>
					</li>
					<li>
						チャットを開始する<br />
						<span class="text-xs"
							>「チャット」ボタンをクリックするとチャット画面が開きます。そこで送たいメッセージを書いて送信してください、</span
						>
					</li>
				</ol>
			</div>
		</section>
	</div>
</section>

<style>
	h2 {
		@apply text-lg font-bold border-l-8 border-b-2 px-2;
	}

	h3 {
		@apply font-bold mt-4;
	}

	section > div {
		@apply py-2;
	}

	ol {
		@apply list-decimal pl-6;
	}

	ul {
		@apply list-disc pl-6;
	}

	li {
		@apply leading-tight;
	}

	ul li:not(:last-child) {
		@apply mb-2;
	}

	ol li:not(:last-child) {
		@apply mb-2;
	}
</style>
