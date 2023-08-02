<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Include the Tailwind CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <!-- Include the necessary libraries for the date picker -->
    <link href="https://cdn.jsdelivr.net/npm/flatpickr@4.6.9/dist/flatpickr.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr@4.6.9/dist/flatpickr.min.js"></script>
  </head>

  <script lang="ts">
	import Form from "../../components/expenses/form.svelte";
	import { ExpensesReposiotry } from "../../repositories/exepensesRepository";

    let showModal = false
    let expenses:Expense[] = []
    let expense = {} as Expense
    let expensesRepository = new ExpensesReposiotry()

    async function updateExpense(id: string) {
        expense = await expensesRepository.getOne(id)
        showModal = true
    }

    const getExepenses = async () => {
        expenses = await expensesRepository.getAll()
    };

    const removeExpense = async (id:string) => {
        //await expensesRepository.removeExpense(id)
        getExepenses()
    }

    const newForm = () => {
        expense = {} as Expense
        showModal = true
    }

    getExepenses()

  </script>

<Form bind:showModal on:reload={getExepenses} bind:expense={expense}/>
 
<div class="container mx-auto px-4 sm:px-4">
    <button on:click={newForm}> show modal </button>
    <div class="py-4">
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs text-gray-600 uppercase tracking-wider">
                                Type
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs text-gray-600 uppercase tracking-wider">
                                Due Day
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs text-gray-600 uppercase tracking-wider">
                                Value
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each expenses as exp, i}
                            <tr class="bg-white">                           
                                <td>{exp.type}</td>
                                <td>{exp.dueDay}</td>
                                <td>{exp.value}</td>
                                <td><a href="/" on:click|preventDefault={updateExpense(exp.id)}>Edit</a> | <a href="/" on:click|preventDefault={removeExpense(exp.id)}>Remove</a></td>
                            </tr>   
                        {/each}
                    </tbody>
                </table>
                <div
                    class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row ">
                    <span class="text-xs xs:text-sm text-gray-900">
                        Showing {expenses.length}
                    </span>
                    <div class="inline-flex mt-2 xs:mt-0">
                        <button
                            class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                            Prev
                        </button>
                        <button
                            class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>

</style>