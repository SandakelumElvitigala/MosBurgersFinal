// Global variables
let cart1 = [];
let items = [];
let qtys = [];
let total = 0;
let gt = 0;

// Event listener for refreshing the page
document.getElementById('refreshButton').addEventListener('click', function () {
    location.reload();
});

// Function to transfer cart data to modal
function transferCartDataToModal() {
    const cartTable = document.querySelector('#cart tbody');
    const modalCartTableContainer = document.getElementById('modalCartTableContainer');

    console.log('Transferring data to modal:', cartTable);

    // Clear any previous content in the modal container
    modalCartTableContainer.innerHTML = '';

    // Create a new table element
    const modalCartTable = document.createElement('table');
    modalCartTable.classList.add('table', 'table-striped');

    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
                <tr>
                    <th>Item Code</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Discount</th>
                    <th>Total</th>
                </tr>
            `;
    modalCartTable.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    // Initialize total
    let total = 0;

    // Iterate through cart table rows and clone them to the modal table
    cartTable.querySelectorAll('tr').forEach(row => {
        const newRow = row.cloneNode(true);
        console.log('Row being cloned:', newRow);
        tbody.appendChild(newRow);

        // Calculate total for each row
        const rowTotal = parseFloat(newRow.querySelector('td:nth-child(5)').textContent.replace('Rs.', ''));
        total += rowTotal;
    });

    modalCartTable.appendChild(tbody);

    // Create a footer row for the total
    const tfoot = document.createElement('tfoot');
    tfoot.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: right;"><strong>Grand Total:</strong></td>
                    <td><strong>Rs.${total.toFixed(2)}</strong></td>
                </tr>
            `;
    modalCartTable.appendChild(tfoot);

    modalCartTableContainer.appendChild(modalCartTable);

    console.log('Total calculated for modal:', total);
}

// Function to get food IDs from modal
function getFoodIdsFromModal() {
    const modalCartTableContainer = document.getElementById('modalCartTableContainer');
    const foodIds = [];

    modalCartTableContainer.querySelectorAll('tbody tr').forEach(row => {
        const foodIdCell = row.querySelector('td:nth-child(1)');
        if (foodIdCell) {
            const foodId = foodIdCell.textContent.trim();
            foodIds.push(foodId);
        }
    });

    console.log('Food IDs from modal:', foodIds);
    return foodIds;
}

function getFoodQtyFromModal() {
    const modalCartTableContainer = document.getElementById('modalCartTableContainer');
    const foodQtys = [];

    modalCartTableContainer.querySelectorAll('tbody tr').forEach(row => {
        const foodQtCell = row.querySelector('td:nth-child(2)');
        if (foodQtCell) {
            const foodQt = foodQtCell.textContent.trim();
            foodQtys.push(foodQt);
        }
    });

    console.log('Food Quantities from modal:', foodQtys);
    return foodQtys;
}

function getFoodDisFromModal() {
    const modalCartTableContainer = document.getElementById('modalCartTableContainer');
    const foodDis = [];

    modalCartTableContainer.querySelectorAll('tbody tr').forEach(row => {
        const foodDCell = row.querySelector('td:nth-child(4)');
        if (foodDCell) {
            const foodD = foodDCell.textContent.trim();
            foodDis.push(foodD);
        }
    });

    console.log('Food Discounts from modal:', foodDis);
    return foodDis;
}

function getFoodTotFromModal() {
    const modalCartTableContainer = document.getElementById('modalCartTableContainer');
    const foodTot = [];

    modalCartTableContainer.querySelectorAll('tbody tr').forEach(row => {
        const foodTCell = row.querySelector('td:nth-child(5)');
        if (foodTCell) {
            const foodT = foodTCell.textContent.trim();
            foodTot.push(foodT);
        }
    });

    console.log('Food totals from modal:', foodTot);
    return foodTot;
}

function getGtotFromModal() {
    const tt = getFoodTotFromModal();

    const total = tt.reduce((sum, value) => {
        const number = parseFloat(value.replace("Rs.", "").replace(",", ""));
        return sum + number;
    }, 0);

    console.log('Grand Total:', total);
    return total;
}

function getFoodPriceFromModal() {
    const modalCartTableContainer = document.getElementById('modalCartTableContainer');
    const foodPrices = [];

    modalCartTableContainer.querySelectorAll('tbody tr').forEach(row => {
        const foodPriceCell = row.querySelector('td:nth-child(3)');
        if (foodPriceCell) {
            const foodPrice = foodPriceCell.textContent.trim();
            foodPrices.push(foodPrice);
        }
    });

    console.log('Food Prices from modal:', foodPrices);
    return foodPrices;
}

// Event listeners
document.querySelector('.btn.btn-success[data-bs-target="#staticBackdrop"]').addEventListener('click', transferCartDataToModal);

function getSriLankanDateTime() {
    return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Colombo',
        dateStyle: 'full',
        timeStyle: 'long'
    }).format(new Date());
}

window.orders = JSON.parse(localStorage.getItem('orders')) || [];

function confirmOrder() {
    const customerName = document.querySelector('#customer-name').value;
    const customerContact = document.querySelector('#customer-contact').value;

    if (!customerName || !customerContact) {
        alert('Please provide your name and contact number.');
        return;
    }

    const foodItemIds = getFoodIdsFromModal();
    const foodItemQtys = getFoodQtyFromModal();
    const foodPrices = getFoodPriceFromModal();
    const foodDiscounts = getFoodDisFromModal();
    const foodTotal = getFoodTotFromModal();
    const totalG = getGtotFromModal();

    console.log('Confirming order:', {
        customerName,
        customerContact,
        foodItemIds,
        foodItemQtys,
        foodPrices,
        foodDiscounts,
        foodTotal,
        totalG
    });

    const newOrder = {
        customerName,
        customerContact,
        foodItemIds,
        foodItemQtys,
        foodPrices,
        foodDiscounts,
        foodTotal,
        totalG,
        dateTime: getSriLankanDateTime()
    };

    window.orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(window.orders));

    addCustomer();

    console.log('New order object:', newOrder);
    console.log('Updated orders array:', window.orders);


    reduceStock();
    // Reset form and cart after confirmation
    document.querySelector('#customer-name').value = '';
    document.querySelector('#customer-contact').value = '';
    cart1 = [];
    updateCart1();
    updateCartTotal();

    
}



// Function to update the cart display
function updateCart1() {
    const cartTableBody = document.querySelector('#cart tbody');
    cartTableBody.innerHTML = '';

    if (cart1.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
        return;
    }

    cart1.forEach((item, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
                    <td>${item.itemCode}</td>
                    <td>${item.qty}</td>
                    <td>${item.unitPrice}</td>
                    <td>${item.discount}</td>
                    <td>Rs.${(item.qty * item.unitPrice * (1 - item.discount / 100)).toFixed(2)}</td>
                `;
        cartTableBody.appendChild(newRow);
    });
}

// Function to update the cart total display
function updateCartTotal() {
    const cartTotalElement = document.getElementById('cartTotal');
    const grandTotalElement = document.getElementById('grandTotal');

    if (!cartTotalElement || !grandTotalElement) {
        console.error("Cart Total or Grand Total element is not found in the DOM.");
        return;
    }

    const total = cart1.reduce((sum, item) => sum + item.qty * item.unitPrice * (1 - item.discount / 100), 0);
    const grandTotal = total; // You can modify this if there are additional charges or discounts

    cartTotalElement.textContent = `Rs.${total.toFixed(2)}`;
    grandTotalElement.textContent = `Rs.${grandTotal.toFixed(2)}`;
}



function reduceStock() {
    const foodItemIds = getFoodIdsFromModal();
    const foodItemQtys = getFoodQtyFromModal();

    console.log('Burgers:', window.burgers);
    console.log('Beverages:', window.bev);
    console.log('Submarines:', window.submarines);
    console.log('Fries:', window.fry);
    console.log('Chicken:', window.chicken);
    console.log('Pasta:', window.pasta);

    for (let i = 0; i < foodItemIds.length; i++) {
        const idToCheck = foodItemIds[i];
        const reduce = foodItemQtys[i];

        const burger = window.burgers?.find(item => item.foodId === idToCheck);
        const bev = window.bev?.find(item => item.foodId === idToCheck);
        const sub = window.submarines?.find(item => item.foodId === idToCheck);
        const fry = window.fry?.find(item => item.foodId === idToCheck);
        const chicken = window.chicken?.find(item => item.foodId === idToCheck);
        const pasta = window.pasta?.find(item => item.foodId === idToCheck);

        if (burger) {
            burger.stock = Math.max(0, burger.stock - reduce);
            document.addEventListener('DOMContentLoaded', (event) => {
                displayBurgers(window.burgers);
            });
            
            console.log(`Stock for ${burger.foodName} is now ${burger.stock}`);
        }
        else if (bev) {
            bev.stock = Math.max(0, bev.stock - reduce);
            displayBev(window.bev);
            console.log(`Stock for ${bev.foodName} is now ${bev.stock}`);
        }
        else if (sub) {
            sub.stock = Math.max(0, sub.stock - reduce);
            displaySubmarines(window.submarines);
            console.log(`Stock for ${sub.foodName} is now ${sub.stock}`);
        }
        else if (fry) {
            fry.stock = Math.max(0, fry.stock - reduce);
            displayFry(window.fry);
            console.log(`Stock for ${fry.foodName} is now ${fry.stock}`);
        }
        else if (chicken) {
            chicken.stock = Math.max(0, chicken.stock - reduce);
            displayChicken(window.chicken);
            console.log(`Stock for ${chicken.foodName} is now ${chicken.stock}`);
        }
        else if (pasta) {
            pasta.stock = Math.max(0, pasta.stock - reduce);
            displayPasta(window.pasta);
            console.log(`Stock for ${pasta.foodName} is now ${pasta.stock}`);
        }
        else {
            console.log(`Item with ID ${idToCheck} not found.`);
        }
    }
}

function addCustomer(){
    const customerName = document.querySelector('#customer-name').value;
    const customerContact = document.querySelector('#customer-contact').value;
    const newCust = [
        customerName,
        customerContact
    ];
    window.customer.push(newCust);
    console.log("Customer added : "+newCust);
    console.log(window.customer);
}


