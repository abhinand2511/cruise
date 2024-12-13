// Simulated user database
const users = [
    { id: 1, username: 'voyager1', password: 'password1', role: 'voyager' },
    { id: 2, username: 'admin1', password: 'adminpass', role: 'admin' },
    { id: 3, username: 'manager1', password: 'managerpass', role: 'manager' },
    { id: 4, username: 'headcook1', password: 'cookpass', role: 'headCook' },
    { id: 5, username: 'supervisor1', password: 'superpass', role: 'supervisor' }
];

// DOM elements
const mainNav = document.getElementById('main-nav');
const mainContent = document.getElementById('main-content');
const loginForm = document.getElementById('login-form');
const authForm = document.getElementById('auth-form');

let currentUser = null;

// Event listeners
authForm.addEventListener('submit', handleAuth);

function handleAuth(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        updateUI();
    } else {
        alert('Invalid username or password');
    }
}

function updateUI() {
    loginForm.classList.add('hidden');
    mainNav.innerHTML = '';
    mainContent.innerHTML = '';

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', handleLogout);
    mainNav.appendChild(logoutButton);

    switch (currentUser.role) {
        case 'voyager':
            loadVoyagerUI();
            break;
        case 'admin':
            loadAdminUI();
            break;
        case 'manager':
            loadManagerUI();
            break;
        case 'headCook':
            loadHeadCookUI();
            break;
        case 'supervisor':
            loadSupervisorUI();
            break;
        default:
            console.error("Unknown user role");
    }
}

function handleLogout() {
    currentUser = null;
    loginForm.classList.remove('hidden');
    mainNav.innerHTML = '';
    mainContent.innerHTML = '';
}

function loadVoyagerUI() {
    const navItems = [
        { text: 'Order Catering', action: showCateringOrder },
        { text: 'Order Stationery', action: showStationeryOrder },
        { text: 'Book Resort-Movie', action: showResortMovieBooking },
        { text: 'Book Beauty Salon', action: showBeautySalonBooking },
        { text: 'Book Fitness Center', action: showFitnessCenterBooking },
        { text: 'Book Party Hall', action: showPartyHallBooking }
    ];

    createNavigation(navItems);
    showCateringOrder();
}

function loadAdminUI() {
    const navItems = [
        { text: 'Add Item', action: showAddItem },
        { text: 'Edit/Delete Item', action: showEditDeleteItem },
        { text: 'Maintain Menu Items', action: showMaintainMenuItems },
        { text: 'Voyager Registration', action: showVoyagerRegistration }
    ];

    createNavigation(navItems);
    showAddItem();
}

function loadManagerUI() {
    const navItems = [
        { text: 'View Resort-Movie Bookings', action: showResortMovieBookings },
        { text: 'View Beauty Salon Bookings', action: showBeautySalonBookings },
        { text: 'View Fitness Center Bookings', action: showFitnessCenterBookings },
        { text: 'View Party Hall Bookings', action: showPartyHallBookings }
    ];

    createNavigation(navItems);
    showResortMovieBookings();
}

function loadHeadCookUI() {
    showCateringOrders();
}

function loadSupervisorUI() {
    showStationeryOrders();
}

function createNavigation(items) {
    const ul = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = item.text;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            item.action();
        });
        li.appendChild(a);
        ul.appendChild(li);
    });
    mainNav.appendChild(ul);
}

function showCateringOrder() {
    mainContent.innerHTML = `
        <h2>Order Catering</h2>
        <form id="catering-form">
            <label for="catering-item">Select an item:</label>
            <select id="catering-item" required>
                <option value="">Select an item</option>
                <option value="snack">Snack</option>
                <option value="meal">Meal</option>
                <option value="beverage">Beverage</option>
            </select>
            <label for="catering-quantity">Quantity:</label>
            <input type="number" id="catering-quantity" min="1" required>
            <button type="submit">Place Order</button>
        </form>
    `;

    document.getElementById('catering-form').addEventListener('submit', handleCateringOrder);
}

function handleCateringOrder(e) {
    e.preventDefault();
    const item = document.getElementById('catering-item').value;
    const quantity = document.getElementById('catering-quantity').value;

    console.log(`Catering order placed: ${quantity} ${item}(s)`);
    alert('Catering order placed successfully!');
}

function showStationeryOrder() {
    mainContent.innerHTML = `
        <h2>Order Stationery</h2>
        <form id="stationery-form">
            <label for="stationery-item">Select an item:</label>
            <select id="stationery-item" required>
                <option value="">Select an item</option>
                <option value="gift">Gift Item</option>
                <option value="chocolate">Chocolate</option>
                <option value="book">Tale Book</option>
            </select>
            <label for="stationery-quantity">Quantity:</label>
            <input type="number" id="stationery-quantity" min="1" required>
            <button type="submit">Place Order</button>
        </form>
    `;

    document.getElementById('stationery-form').addEventListener('submit', handleStationeryOrder);
}

function handleStationeryOrder(e) {
    e.preventDefault();
    const item = document.getElementById('stationery-item').value;
    const quantity = document.getElementById('stationery-quantity').value;

    console.log(`Stationery order placed: ${quantity} ${item}(s)`);
    alert('Stationery order placed successfully!');
}

function showResortMovieBooking() {
    mainContent.innerHTML = `
        <h2>Book Resort-Movie</h2>
        <form id="resort-movie-form">
            <label for="movie">Select a movie:</label>
            <select id="movie" required>
                <option value="">Select a movie</option>
                <option value="movie1">Movie 1</option>
                <option value="movie2">Movie 2</option>
                <option value="movie3">Movie 3</option>
            </select>
            <label for="seat">Select a seat:</label>
            <select id="seat" required>
                <option value="">Select a seat</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="A3">A3</option>
            </select>
            <button type="submit">Book Ticket</button>
        </form>
    `;

    document.getElementById('resort-movie-form').addEventListener('submit', handleResortMovieBooking);
}

function handleResortMovieBooking(e) {
    e.preventDefault();
    const movie = document.getElementById('movie').value;
    const seat = document.getElementById('seat').value;

    console.log(`Resort-Movie booked: ${movie}, Seat: ${seat}`);
    alert('Resort-Movie ticket booked successfully!');
}

function showBeautySalonBooking() {
    mainContent.innerHTML = `
        <h2>Book Beauty Salon</h2>
        <form id="beauty-salon-form">
            <label for="service">Select a service:</label>
            <select id="service" required>
                <option value="">Select a service</option>
                <option value="haircut">Haircut</option>
                <option value="manicure">Manicure</option>
                <option value="facial">Facial</option>
            </select>
            <label for="date">Select a date:</label>
            <input type="date" id="date" required>
            <label for="time">Select a time:</label>
            <input type="time" id="time" required>
            <button type="submit">Book Appointment</button>
        </form>
    `;

    document.getElementById('beauty-salon-form').addEventListener('submit', handleBeautySalonBooking);
}

function handleBeautySalonBooking(e) {
    e.preventDefault();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    console.log(`Beauty Salon booked: ${service} on ${date} at ${time}`);
    alert('Beauty Salon appointment booked successfully!');
}

function showFitnessCenterBooking() {
    mainContent.innerHTML = `
        <h2>Book Fitness Center</h2>
        <form id="fitness-center-form">
            <label for="equipment">Select equipment:</label>
            <select id="equipment" required>
                <option value="">Select equipment</option>
                <option value="treadmill">Treadmill</option>
                <option value="weights">Weights</option>
                <option value="bike">Exercise Bike</option>
            </select>
            <label for="date">Select a date:</label>
            <input type="date" id="date" required>
            <label for="time">Select a time:</label>
            <input type="time" id="time" required>
            <button type="submit">Book Session</button>
        </form>
    `;

    document.getElementById('fitness-center-form').addEventListener('submit', handleFitnessCenterBooking);
}

function handleFitnessCenterBooking(e) {
    e.preventDefault();
    const equipment = document.getElementById('equipment').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    console.log(`Fitness Center booked: ${equipment} on ${date} at ${time}`);
    alert('Fitness Center session booked successfully!');
}

function showPartyHallBooking() {
    mainContent.innerHTML = `
        <h2>Book Party Hall</h2>
        <form id="party-hall-form">
            <label for="hall-type">Select hall type:</label>
            <select id="hall-type" required>
                <option value="">Select hall type</option>
                <option value="birthday">Birthday Party</option>
                <option value="wedding">Wedding Party</option>
                <option value="business">Business Party</option>
            </select>
            <label for="date">Select a date:</label>
            <input type="date" id="date" required>
            <label for="time">Select a time:</label>
            <input type="time" id="time" required>
            <label for="guests">Number of guests:</label>
            <input type="number" id="guests" min="1" required>
            <button type="submit">Book Party Hall</button>
        </form>
    `;

    document.getElementById('party-hall-form').addEventListener('submit', handlePartyHallBooking);
}

function handlePartyHallBooking(e) {
    e.preventDefault();
    const hallType = document.getElementById('hall-type').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    console.log(`Party Hall booked: ${hallType} on ${date} at ${time} for ${guests} guests`);
    alert('Party Hall booked successfully!');
}

function showAddItem() {
    mainContent.innerHTML = `
        <h2>Add Item</h2>
        <form id="add-item-form">
            <label for="item-type">Item Type:</label>
            <select id="item-type" required>
                <option value="">Select item type</option>
                <option value="catering">Catering</option>
                <option value="stationery">Stationery</option>
            </select>
            <label for="item-name">Item Name:</label>
            <input type="text" id="item-name" required>
            <label for="item-price">Price:</label>
            <input type="number" id="item-price" min="0" step="0.01" required>
            <button type="submit">Add Item</button>
        </form>
    `;

    document.getElementById('add-item-form').addEventListener('submit', handleAddItem);
}

function handleAddItem(e) {
    e.preventDefault();
    const itemType = document.getElementById('item-type').value;
    const itemName = document.getElementById('item-name').value;
    const itemPrice = document.getElementById('item-price').value;

    console.log(`New item added: ${itemType} - ${itemName} ($${itemPrice})`);
    alert('Item added successfully!');
}

function showEditDeleteItem() {
    mainContent.innerHTML = '<h2>Edit/Delete Item</h2><p>This feature is not yet implemented.</p>';
}

function showMaintainMenuItems() {
    mainContent.innerHTML = '<h2>Maintain Menu Items</h2><p>This feature is not yet implemented.</p>';
}

function showVoyagerRegistration() {
    mainContent.innerHTML = `
        <h2>Voyager Registration</h2>
        <form id="voyager-registration-form">
            <label for="voyager-username">Username:</label>
            <input type="text" id="voyager-username" required>
            <label for="voyager-password">Password:</label>
            <input type="password" id="voyager-password" required>
            <label for="voyager-name">Full Name:</label>
            <input type="text" id="voyager-name" required>
            <label for="voyager-email">Email:</label>
            <input type="email" id="voyager-email" required>
            <button type="submit">Register Voyager</button>
        </form>
    `;

    document.getElementById('voyager-registration-form').addEventListener('submit', handleVoyagerRegistration);
}

function handleVoyagerRegistration(e) {
    e.preventDefault();
    const username = document.getElementById('voyager-username').value;
    const password = document.getElementById('voyager-password').value;
    const name = document.getElementById('voyager-name').value;
    const email = document.getElementById('voyager-email').value;

    console.log(`New voyager registered: ${name} (${username}, ${email})`);
    alert('Voyager registered successfully!');
}

function showResortMovieBookings() {
    const bookings = [
        { movie: 'Movie 1', seat: 'A1', date: '2023-05-01' },
        { movie: 'Movie 2', seat: 'B3', date: '2023-05-02' },
        { movie: 'Movie 3', seat: 'C2', date: '2023-05-03' }
    ];

    mainContent.innerHTML = `
        <h2>Resort-Movie Bookings</h2>
        <table>
            <thead>
                <tr>
                    <th>Movie</th>
                    <th>Seat</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                ${bookings.map(booking => `
                    <tr>
                        <td>${booking.movie}</td>
                        <td>${booking.seat}</td>
                        <td>${booking.date}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function showBeautySalonBookings() {
    mainContent.innerHTML = '<h2>Beauty Salon Bookings</h2><p>This feature is not yet implemented.</p>';
}

function showFitnessCenterBookings() {
    mainContent.innerHTML = '<h2>Fitness Center Bookings</h2><p>This feature is not yet implemented.</p>';
}

function showPartyHallBookings() {
    mainContent.innerHTML = '<h2>Party Hall Bookings</h2><p>This feature is not yet implemented.</p>';
}

function showCateringOrders() {
    const orders = [
        { item: 'Snack', quantity: 2, voyager: 'John Doe' },
        { item: 'Meal', quantity: 1, voyager: 'Jane Smith' },
        { item: 'Beverage', quantity: 3, voyager: 'Bob Johnson' }
    ];

    mainContent.innerHTML = `
        <h2>Catering Orders</h2>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Voyager</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(order => `
                    <tr>
                        <td>${order.item}</td>
                        <td>${order.quantity}</td>
                        <td>${order.voyager}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function showStationeryOrders() {
    const orders = [
        { item: 'Gift Item', quantity: 1, voyager: 'Alice Brown' },
        { item: 'Chocolate', quantity: 5, voyager: 'Charlie Davis' },
        { item: 'Tale Book', quantity: 2, voyager: 'Eve Wilson' }
    ];

    mainContent.innerHTML = `
        <h2>Stationery Orders</h2>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Voyager</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(order => `
                    <tr>
                        <td>${order.item}</td>
                        <td>${order.quantity}</td>
                        <td>${order.voyager}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

