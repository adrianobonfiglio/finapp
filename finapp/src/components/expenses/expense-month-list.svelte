<!-- component -->

<script lang='ts'>
	import { DollarConversion } from "../../common/moneyConversion";
    import type { Expense } from "../../models/expense";
	import { ExpensesReposiotry } from "../../repositories/exepensesRepository";
	import { DashboardStore } from "../../routes/dashboard/dashboard-store";

    let expensesRepository = new ExpensesReposiotry()
    let expenses:Expense[] = []
    export let selectedMonth: MonthYear

    const getExpenses = async () => {
        expenses = await expensesRepository.getExpensesWithPaymentsByMonth(selectedMonth.num, selectedMonth.year)
    }

    DashboardStore.monthYear.subscribe((monthYear) => {
        selectedMonth = monthYear
        getExpenses()
    })
    

    const getPayment = (expense: Expense): Number | null => {
        if(expense.payments.length > 0) {
            return expense.payments[0].value
        }
        return null
    }

    getExpenses()

</script>

<div class="flex-1 w-20 m-2 bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 ">
    
    <div class="flex mb-4">
        <div>
            <h3 class="mb-2 text-xl font-bold text-gray-900">Expenses</h3>
        </div>
    </div>
    
    <div class="flex flex-col mt-8">
        <div class="overflow-x-auto rounded-2xl">
            <div class="inline-block min-w-full align-middle">
                <div class="overflow-hidden shadow-lg shadow-gray-200 sm:rounded-2xl">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Type
                                </th>
                                <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Due Day
                                </th>
                                <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Planed Value
                                </th>
                                <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Payed
                                </th>
                                <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Payed Value
                                </th>                                
                                <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            {#each expenses as expense}
                                <tr>
                                    <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap">
                                        {expense.type}
                                    </td>
                                    <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                        {expense.dueDay}
                                    </td>
                                    <td class="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                        {DollarConversion.format(expense.value)}
                                    </td>
                                    <td class="p-4 whitespace-nowrap">
                                        {#if getPayment(expense)}
                                          <span class="text-white bg-gradient-to-br from-green-500 to-green-700 text-xs font-bold uppercase mr-2 px-2.5 py-1 w-32 rounded-md">Payed</span>
                                        {:else}
                                          <span class="text-white bg-gradient-to-br from-red-500 to-red-700 text-xs font-bold uppercase mr-2 px-2.5 py-1 w-32 rounded-md">Not Payed</span>
                                        {/if}
                                    </td>
                                    <td>
                                      {getPayment(expense) ? getPayment(expense): "Open"}
                                    </td>
                                    
                                    <td class="p-4 whitespace-nowrap">
                                        <button type="button" data-modal-toggle="user-modal" class="text-white bg-gradient-to-br from-dark-600 to-dark-900 font-medium rounded-lg text-sm inline-flex items-center px-2.5 py-1.5 text-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform">
                                            <svg class="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                            Edit user
                                        </button>
                                    </td>
                                </tr>                           
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>