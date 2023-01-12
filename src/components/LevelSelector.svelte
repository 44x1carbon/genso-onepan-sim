<script lang="ts">
	import type { Skill } from '../SkillData';

	export let skill: Skill | undefined;
	export let level: number = 5;
</script>

{#if skill}
	<div>
		<div>{skill.name}</div>
		<div>
			{#each new Array(5).fill(null) as _, i}
				<div>{i + 1}</div>
			{/each}
		</div>
	</div>
{/if}
