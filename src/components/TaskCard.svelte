<script lang="ts">
    import type { TaskType } from "../schema/Task";
    import { capitalize } from "../util/shared";
    export let task: TaskType
</script>

<div class="link-card">
    <a href={`/tasks/${task.id}`}>
        <h2>
            {task.title}
            <span>&rarr;</span>
        </h2>
        <div class="flex flex-col sm:flex-row">
			<span class="mr-2">
				<span>
					Priority:
				</span>
				<span>
					{capitalize(task.priority.toLowerCase())}
				</span>
			</span>
            <span class="mr-2">
				<span>
					Status:
				</span>
				<span>
					{capitalize(task.status.toLowerCase())}
				</span>
			</span>
			<span class="mr-2">
				<span>
					Due date:
				</span>
				<span>
					{new Date(Number(task.tsExpire) * 1000).toISOString().split('T')[0]}
				</span>
			</span>
		</div>
    </a>
</div>

<style>
	.link-card {
		list-style: none;
		display: flex;
		padding: 1px;
		background-color: #23262d;
		background-image: none;
		background-size: 400%;
		border-radius: 7px;
		background-position: 100%;
		transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
		margin-bottom: 5px;
		margin-top: 10px;
	}
	.link-card > a {
		width: 100%;
		text-decoration: none;
		line-height: 1.4;
		padding: calc(1.5rem - 1px);
		border-radius: 8px;
		color: white;
		background-color: #23262d;
		opacity: 0.8;
	}
	h2 {
		margin: 0;
		font-size: 1.25rem;
		transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}
	p {
		margin-top: 0.5rem;
		margin-bottom: 0;
	}
	.link-card:is(:hover, :focus-within) {
		background-position: 0;
		background-image: var(--accent-gradient);
	}
	.link-card:is(:hover, :focus-within) h2 {
		color: rgb(var(--accent-light));
	}
</style>
