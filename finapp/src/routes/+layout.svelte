<script>
</script>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Finance Dashboard</title>
  <!-- Include Tailwind CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-100">

  <!-- Top Menu -->
  <div class="flex min-h-screen flex-row bg-gray-100 text-gray-800">
    <aside class="sidebar w-48 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
      <div class="my-4 w-full border-b-4 border-indigo-100 text-center">
          <a href="/" class="hover:text-gray-200">Dashboard</a>
          <a href="/payments" class="hover:text-gray-200">Payment</a>
          <a href="/expenses" class="hover:text-gray-200">Expenses</a>
          <a href="/investments" class="hover:text-gray-200">Investments</a>
          <a href="/config" class="hover:text-gray-200">Configurations</a>
      </div>
      <div class="my-4"></div>
    </aside>
    <main class="main -ml-48 flex flex-grow flex-col p-2 transition-all duration-150 ease-in md:ml-0">
      <div class="flex h-full justify-center bg-white text-center font-bold shadow-md">
        <slot></slot>
      </div>
    </main>
  </div>

</body>

<style>

</style>