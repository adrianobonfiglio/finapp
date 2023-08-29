<!-- component -->
<!-- Code block starts -->
<script lang='ts'>
	import type { Expense } from "../../models/expense";
	import { ExpensesReposiotry } from "../../repositories/exepensesRepository";
    import { createEventDispatcher } from 'svelte';
    
    export let showModal = false; // boolean
    export let expense = {} as Expense
    const dispatch = createEventDispatcher();
    const expensesRepository = new ExpensesReposiotry();
    
    let dialog : HTMLDialogElement; // 
    
    $: if (dialog && showModal) dialog.showModal();

    async function handleSubmit(e: SubmitEvent) {
        expense.active = true
        if(expense.ID != null) {
            sendUpdate()
        }else {
            sendCreate()
        }
    }

    const sendCreate = async () => {
        expensesRepository.create(expense)
        .then((exp) => {
            dialog.close()
            alert("Expense with ID "+exp.ID+" criada")
            dispatch('reload')
        })
        .catch((error) => {
            alert(error.message)
        })   
    }

    const sendUpdate = async () => {
        expensesRepository.update(expense)
        .then((exp) => {
            dialog.close()
            alert("Expense with ID "+exp.ID+" atualizada")
            dispatch('reload')
        })
        .catch((error) => {
            alert(error.message)
        })   
    }

</script>

<dialog
	bind:this={dialog}
  on:keydown={() => (showModal = false)}
  on:keypress={() => (showModal = false)}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation
    on:keydown={() => (showModal = false)}
    on:keypress={() => (showModal = false)}>
		<slot name="header" />
        <div class="">
            <form class="" on:submit|preventDefault={handleSubmit}>
              <div class="">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="payment-type">Payment Type:</label>
                <select id="payment-type" name="payment-type"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  bind:value={expense.type}>
                  <option value="LIGTH">LIGTH</option>
                  <option value="PHONE">PHONE</option>
                  <option value="RENT">RENT</option>
                  <option value="FOOD">FOOD</option>
                  <option value="FOOD">WATER</option>
                  <option value="FOOD">INTERNET</option>
                  <option value="FOOD">CAR</option>
                  <option value="FOOD">INSURANCE</option>
                </select>
              </div>
              <div class="">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description:</label>
                <input id="description" name="description"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text" placeholder="Enter description"
                  bind:value={expense.description}>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Due Day:</label>
                <input id="description" name="description"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number" placeholder="Enter description"
                  bind:value={expense.dueDay}>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="value">Value:</label>
                <input id="value"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number" step="0.01" placeholder="Enter value"
                  bind:value={expense.value}>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="payment-date">Available From:</label>
                <input id="payment-date"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text" placeholder="Select payment date"
                  bind:value={expense.availableFrom}>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="payment-date">Active:</label>
                <input id="payment-date"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="checkbox" placeholder="Select payment date"
                  bind:value={expense.active}>
              </div>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">Submit</button>
            </form>
            </div>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>
<!-- Code block ends -->