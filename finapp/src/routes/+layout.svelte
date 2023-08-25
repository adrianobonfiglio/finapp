<script>
</script>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Finance Dashboard</title>
  <!-- Include Tailwind CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body>

  <!-- Top Menu -->
  <div class="">
    <head class="flex flew-row bg-gray-100">
      <div class="my-4 flex-1 flex-start p-2 text-xl">
          <a href="/" class="border-transparent border-b-4 hover:border-indigo-500 select:border-indigo-500 p-3">Dashboard</a>
          <a href="/payments" class="border-transparent border-b-4 hover:border-indigo-500 p-3">Payment</a>
          <a href="/expenses" class="border-transparent border-b-4 hover:border-indigo-500 p-3">Expenses</a>
          <a href="/investments" class="border-transparent border-b-4 hover:border-indigo-500 p-3">Investments</a>
          <a href="/config" class="border-transparent border-b-4 hover:border-indigo-500 p-3">Configurations</a>
      </div>
      <div class="my-4 flex-start p-2">
          Adriano Bonfiglio
      </div>
    </head>
    <main class="main">
        <slot></slot>
    </main>
  </div>

</body>

<style>

</style>