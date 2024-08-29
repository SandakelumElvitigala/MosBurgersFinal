document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Ensure window.orders exists and has data
    window.orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (window.orders.length > 0) {
        const lastOrder = window.orders[window.orders.length - 1]; // Get the last order
        console.log('Last order:', lastOrder);

        const tableBody = document.querySelector('#prevtbl');
        if (!tableBody) {
            console.error('Table body with ID "prevtbl" not found.');
            return;
        }

        let totalFin = 0;

        // Iterate over each item in the last order
        for (let i = 0; i < lastOrder.foodItemIds.length; i++) {
            const row = document.createElement('tr');

            // Create and append item cell
            const itemCell = document.createElement('td');
            itemCell.textContent = lastOrder.foodItemIds[i];
            itemCell.style.textAlign = 'center'; // Center align text
            row.appendChild(itemCell);

            // Create and append quantity cell
            const qtyCell = document.createElement('td');
            qtyCell.textContent = lastOrder.foodItemQtys[i];
            qtyCell.style.textAlign = 'center'; // Center align text
            row.appendChild(qtyCell);

            // Create and append price cell
            const priceCell = document.createElement('td');
            priceCell.textContent = lastOrder.foodPrices[i];
            priceCell.style.textAlign = 'center'; // Center align text
            row.appendChild(priceCell);

            // Create and append discount cell
            const discountCell = document.createElement('td');
            discountCell.textContent = lastOrder.foodDiscounts[i];
            discountCell.style.textAlign = 'center'; // Center align text
            row.appendChild(discountCell);

            // Create and append total cell
            const totalCell = document.createElement('td');
            totalCell.textContent = lastOrder.foodTotal[i];
            totalCell.style.textAlign = 'center'; // Center align text
            row.appendChild(totalCell);

            // Clean the total value to convert it to a number
            const cleanedString = lastOrder.foodTotal[i].replace(/Rs\.\s*/, '').replace(/,/g, '');
            const amount = parseFloat(cleanedString);
            totalFin += amount;

            tableBody.appendChild(row);
        }

        // Set the total value in the footer and other details
        document.getElementById('totalSpan').textContent = `Rs. ${lastOrder.totalG.toFixed(2)}`;
        document.getElementById('dtSpan').textContent = lastOrder.dateTime;
        document.getElementById('nameSpan').textContent = lastOrder.customerName;
        document.getElementById('numSpan').textContent = lastOrder.customerContact;
        document.getElementById('invn').textContent = lastOrder.id;
    } else {
        console.error('No orders found in window.orders');
    }
});
