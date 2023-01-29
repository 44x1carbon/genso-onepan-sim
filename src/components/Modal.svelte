<div class="border border-well-read-700 rounded overflow-hidden">
	<div class="bg-well-read-700 p-2 font-bold ">
		<slot name="header" />
	</div>
	<div class="bg-chocolate-900 p-2">
		<slot name="body" />
	</div>
	<div class="bg-gray-900 p-2 flex justify-between">
		<slot name="controll" />
	</div>
</div>
