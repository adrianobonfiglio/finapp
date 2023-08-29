<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ExpenseMonthList from "../components/expenses/expense-month-list.svelte";
	import Monthspend from "../components/monthSpend.svelte";
	import Summary from "../components/summary.svelte";

	let dispatch = createEventDispatcher()

	let selectedMonth : MonthYear
	let d = new Date()
	let thisMonth = d.getMonth()
	selectedMonth = {num:d.getMonth()+1, name: "ok", year: d.getFullYear()}

	const changeMonth = (monthYear : CustomEvent<MonthYear>) => {
		console.log(monthYear.detail)
		selectedMonth = monthYear.detail
		dispatch('changeMonth', selectedMonth)
	}

</script>

<Summary/>
