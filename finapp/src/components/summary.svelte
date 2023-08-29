<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ExpenseMonthList from "./expenses/expense-month-list.svelte";
	import { DashboardStore } from "../routes/dashboard/dashboard-store";
	import { MonthSpendRepository } from "../repositories/monthSpendRespository";
	import type { MonthSpend } from "../models/month-spend";

    let selectedMonth: MonthYear
    let monthSpendRepository = new MonthSpendRepository()

    let monthList: MonthYear[] = []
    let month = 0
    let monthSpend : MonthSpend
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const getMonths = () => {
        let d = new Date()
        let thisMonth = d.getMonth()
        for (let i = 0; i < 12; i++) {
            d = new Date()
            d.setMonth(thisMonth - i)
            let m = d.getMonth()
            monthList[i] = {num:d.getMonth()+1, name: monthNames[m], year: d.getFullYear()}
        }
    }

    const getMonthExpend = async () => {
        monthSpendRepository.getMonthSpend(selectedMonth.num, selectedMonth.year).then ((ms => {
            monthSpend = ms
        })).catch(err => {
            console.log(err)
        })
    }

    const changeMonth = () => {
        selectedMonth = monthList[month]
        DashboardStore.monthYear.update((val) => val = selectedMonth)
    }

    getMonths()
    changeMonth()
    getMonthExpend()
</script>

<div class="flex flex-1">
    <div class="flex-col flex-1">
        <div class="flex-row h-50 p-10">
                <select role="button" class="px-4 py-2 font-semibold text-sm hover:bg-indigo-500 focus:bg-indigo-500 hover:text-white focus:text-white rounded-full" bind:value={month} on:change={changeMonth}>
                    {#each monthList as month, i}
                        <option value="{i}">{month.name}/{month.year}</option>
                    {/each}
                </select>
            <button class="px-4 py-2 font-semibold text-sm hover:bg-indigo-500 focus:bg-indigo-500 hover:text-white focus:text-white rounded-full">Year</button>
            </div>
        <div class="flex flex-1 flex-row bg-gray-100 h-50 pt-8">
            <div class="p-3 m-3">
                <span class="text-gray-500">Income</span>
                <div class="flex flex-row flex items-center p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-10 h-10 fill-gree-600">
                        <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-3xl m-1">
                        {monthSpend?.totalIncome}
                    </span>
                </div>
            </div>
            <div class="p-3 m-3">
                <span class="text-gray-500">Expenses</span>
                <div class="flex flex-row flex items-center p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-10 h-10 fill-gree-600">
                        <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-3xl m-1">
                        {monthSpend?.totalPayments}
                    </span>
                </div>
            </div>
            <div class="p-3 m-3">
                <span class="text-gray-500">Invested</span>
                <div class="flex flex-row flex items-center p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                      </svg>
                    <span class="text-3xl m-1">
                        {monthSpend?.result}
                    </span>
                </div>
            </div>
            <div class="p-3 m-3 order-last">
                <span class="text-gray-500">Result</span>
                <div class="flex flex-row flex items-center p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                      </svg>
                    <span class="text-3xl m-1">
                        {monthSpend?.result}
                    </span>
                </div>
            </div>             
        </div>
    </div>
</div>

<div class="flex flex-1">
	<ExpenseMonthList bind:selectedMonth />
</div>
