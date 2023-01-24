<script lang="ts">
	import type { Skill } from '../SkillData';

	export let skills: Skill[];
	export let levels: { [skillName: string]: SkillLevel  } = {};
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
