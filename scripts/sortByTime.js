
function timeSorting(){
    // Ensure window.orders exists and has data
    window.orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (window.orders && window.orders.length > 0) {

        const tableBody = document.querySelector('#timeSort');
        if (!tableBody) {
            console.error('Table body with ID "prevtbl" not found.');
            return;
        }

        // Iterate over each item in the last order
        for (let i = 0; i < window.orders.length; i++) {
            const order = window.orders[i];
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><center>${order.id || 'N/A'}</center></td>
                <td><center>${order.customerName || 'N/A'}</center></td>
                <td><center>${order.customerContact || 'N/A'}</center></td>
                <td><center>${order.totalG || 'N/A'}</center></td>
                <td><center>${order.dateTime || 'N/A'}</center></td>
                <td><center><button class="btn btn-outline-success" onclick="searchOrder1(${order.id})">View</button></center></td>
            `;

            // Append the row to the table body
            tableBody.appendChild(row);

        }

    } else {
        console.error('No orders found in window.orders');
    }
}