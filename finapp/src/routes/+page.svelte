<script>
	import ExpenseMonthList from "../components/expenses/expense-month-list.svelte";
	import Monthspend from "../components/monthspend.svelte";
	import Summary from "../components/summary.svelte";
</script>

<div class="flex flex-1">
	<Summary/>
</div>
<div class="flex flex-1">
	<Monthspend/>
	<ExpenseMonthList/>
</div>
