document
	.getElementById('loginForm')
	.addEventListener('submit', function (event) {
		event.preventDefault(); 
		login(); 
	});

function login() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	if (username === 'Admin' && password === '123456') {
    localStorage.setItem("isLogedIn", "true")
		alert('Login Successful!');
		redirectToDashboard();
	} else {
    localStorage.setItem('isLogedIn', 'false');
		alert('Invalid Username or Password!');
	}
}

function redirectToDashboard() {
	window.location.href = 'dataset.html';
}

function checkLogin() {
	if (localStorage.getItem('loggedIn') !== 'true') {
		alert('Anda harus login terlebih dahulu');
		window.location.href = '../views/login.html';
		return false;
	}
	return true;
}

function logout() {
	localStorage.removeItem('loggedIn');
	window.location.href = '../views/dashboard.html';
}


function checkCurrentPage() {
	const currentPath = window.location.pathname;
	if (currentPath.includes('dashboard.html') && localStorage.getItem('loggedIn') !== 'true') {
		alert('Anda harus login terlebih dahulu');
		window.location.href = '../views/login.html';
	}
}

checkCurrentPage();