<script lang="ts">
    
    interface MonthYear {
        num : number
        name: string
        year: number
    }

    let monthList: MonthYear[] = []
    let month = 0
    let expensesSum = 0
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

    const changeMonth = () => {

    }

    getMonths()
</script>


<div class="flex-col flex-1">
    <div class="flex-row h-50 p-10">
            <select role="button" class="px-4 py-2 font-semibold text-sm hover:bg-indigo-500 focus:bg-indigo-500 hover:text-white focus:text-white rounded-full" bind:value={month} on:change={changeMonth}>
                {#each monthList as month, i}
                    <option value="{i}">{month.name}/{month.year}</option>
                {/each}
            </select>
        <button class="px-4 py-2 font-semibold text-sm hover:bg-indigo-500 focus:bg-indigo-500 hover:text-white focus:text-white rounded-full">Year</button>
        </div>
    <div class="flex-1 bg-gray-100 h-50 pt-8">OK</div>
</div>
<div class="flex-col flex-1">
    <div class="flex-1 bg-gray-100 h-50">Summary</div>
</div>