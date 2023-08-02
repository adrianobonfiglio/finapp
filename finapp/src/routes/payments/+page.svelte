<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Include the Tailwind CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <!-- Include the necessary libraries for the date picker -->
  <link href="https://cdn.jsdelivr.net/npm/flatpickr@4.6.9/dist/flatpickr.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/flatpickr@4.6.9/dist/flatpickr.min.js"></script>
</head>

<div class="p-4">
  <form class="max-w-md mx-auto bg-white shadow p-4 rounded">
    <div class="mb-2">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="payment-type">Payment Type:</label>
      <select id="payment-type" name="payment-type"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="credit-card">Credit Card</option>
        <option value="paypal">PayPal</option>
        <option value="bank-transfer">Bank Transfer</option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description:</label>
      <input id="description" name="description"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" placeholder="Enter description">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="value">Value:</label>
      <input id="value" name="value"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number" step="0.01" placeholder="Enter value">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="payment-date">Payment Date:</label>
      <input id="payment-date" name="payment-date"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" placeholder="Select payment date" readonly>
    </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit">Submit</button>
  </form>

  <script>
    // Initialize the date picker
    flatpickr("#payment-date", {
      dateFormat: "Y-m-d"
    });
  </script>
  </div>