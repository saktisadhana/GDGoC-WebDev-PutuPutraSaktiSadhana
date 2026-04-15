// ================================
// Dark Mode Toggle
// ================================
const btnDarkmode = document.getElementById('btn-darkmode');
const darkmodeIcon = document.getElementById('darkmode-icon');

// Load saved preference
if (localStorage.getItem('darkmode') === 'on') {
    document.body.classList.add('dark');
    darkmodeIcon.textContent = 'light';
}

btnDarkmode.addEventListener('click', function () {
    const isDark = document.body.classList.toggle('dark');
    darkmodeIcon.textContent = isDark ? 'light' : 'dark';
    localStorage.setItem('darkmode', isDark ? 'on' : 'off');
});


// ================================
// Form Validation & Submission
// ================================
const form = document.getElementById('registration-form');
const successMsg = document.getElementById('success-msg');
const successText = document.getElementById('success-text');
const btnReset = document.getElementById('btn-reset');

function showError(fieldId, errId, msg) {
    const field = document.getElementById(fieldId);
    const errEl = document.getElementById(errId);
    if (field) field.classList.add('error');
    if (errEl) errEl.textContent = msg;
}

function clearError(fieldId, errId) {
    const field = document.getElementById(fieldId);
    const errEl = document.getElementById(errId);
    if (field) field.classList.remove('error');
    if (errEl) errEl.textContent = '';
}

function validateForm() {
    let valid = true;

    // Clear previous errors
    clearError('name', 'err-name');
    clearError('nrp', 'err-nrp');
    clearError('email', 'err-email');
    document.getElementById('err-agree').textContent = '';

    const name = document.getElementById('name').value.trim();
    const nrp = document.getElementById('nrp').value.trim();
    const email = document.getElementById('email').value.trim();
    const agree = document.getElementById('agree').checked;

    if (!name) {
        showError('name', 'err-name', 'Nama lengkap wajib diisi.');
        valid = false;
    } else if (name.length < 3) {
        showError('name', 'err-name', 'Nama terlalu pendek.');
        valid = false;
    }

    if (!nrp) {
        showError('nrp', 'err-nrp', 'NRP wajib diisi.');
        valid = false;
    } else if (!/^\d{10,12}$/.test(nrp)) {
        showError('nrp', 'err-nrp', 'NRP harus berupa 10–12 digit angka.');
        valid = false;
    }

    if (!email) {
        showError('email', 'err-email', 'Email wajib diisi.');
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', 'err-email', 'Format email tidak valid.');
        valid = false;
    }

    if (!agree) {
        document.getElementById('err-agree').textContent = 'Kamu harus menyetujui pernyataan ini.';
        valid = false;
    }

    return valid;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const name = document.getElementById('name').value.trim();

    // Show success
    form.hidden = true;
    successMsg.removeAttribute('hidden');
    successText.textContent = `Halo ${name}! Pendaftaran kamu sudah kami terima. Cek email untuk konfirmasi lebih lanjut.`;

    window.scrollTo({ top: successMsg.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
});

btnReset.addEventListener('click', function () {
    form.reset();
    successMsg.setAttribute('hidden', '');
    form.hidden = false;
});


// ================================
// Real-time input clearing errors
// ================================
['name', 'nrp', 'email'].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
        el.classList.remove('error');
        const errEl = document.getElementById('err-' + id);
        if (errEl) errEl.textContent = '';
    });
});
