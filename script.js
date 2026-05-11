// =========================================
// DATA SEMINAR
// =========================================
const seminars = [
    {
        id: 1,
        judul: "Membangun Web Modern dengan Vanilla JS",
        deskripsi: "Pelajari cara membangun aplikasi web responsif murni menggunakan HTML, CSS, dan JavaScript tanpa framework berat.",
        pembicara: "Dr. Budi Santoso",
        tanggal: "15 Mei 2026",
        jam: "09:00 - 12:00 WIB",
        lokasi: "Auditorium / Zoom",
        kuota: 100,
        kategori: "Teknologi"
    },
    {
        id: 2,
        judul: "Strategi Memulai Startup Kampus",
        deskripsi: "Langkah praktis mengubah ide inovatif menjadi bisnis rintisan yang siap mencari pendanaan.",
        pembicara: "Siti Rahma, M.B.A",
        tanggal: "20 Mei 2026",
        jam: "13:00 - 15:30 WIB",
        lokasi: "Ruang Seminar FEB",
        kuota: 50,
        kategori: "Bisnis"
    },
    {
        id: 3,
        judul: "Manajemen Waktu & Produktivitas Mahasiswa",
        deskripsi: "Framework manajemen waktu ampuh untuk produktivitas tanpa mengorbankan waktu istirahat.",
        pembicara: "Andi Wijaya, S.Psi",
        tanggal: "25 Mei 2026",
        jam: "10:00 - 12:00 WIB",
        lokasi: "Zoom Meeting",
        kuota: 200,
        kategori: "Pengembangan Diri"
    },
    {
        id: 4,
        judul: "Pengantar Simulasi Jaringan Komputer",
        deskripsi: "Workshop praktis pengenalan topologi jaringan, DHCP, dan DNS menggunakan Cisco Packet Tracer.",
        pembicara: "Ir. Gunawan, M.T",
        tanggal: "02 Juni 2026",
        jam: "08:00 - 11:00 WIB",
        lokasi: "Lab Komputer Terpadu",
        kuota: 30,
        kategori: "Teknologi"
    }
];

// =========================================
// INIT
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    renderSeminars();
    navigate('home');
});

// =========================================
// NAVIGASI
// =========================================
function navigate(pageId) {
    document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(`page-${pageId}`).classList.remove('hidden');
    window.scrollTo(0, 0);
}

// =========================================
// RENDER KARTU SEMINAR
// =========================================
function createCardHTML(seminar) {
    return `
        <div class="card">
            <div class="card-badge">${seminar.kategori}</div>
            <h3 class="card-title">${seminar.judul}</h3>
            <div class="card-info">
                <span>📅 ${seminar.tanggal}</span>
                <span>⏰ ${seminar.jam}</span>
                <span>📍 ${seminar.lokasi}</span>
            </div>
            <button class="btn btn-outline" onclick="showDetail(${seminar.id})">Detail Lengkap</button>
        </div>
    `;
}

function renderSeminars(filter = "All") {
    const gridPreview = document.getElementById('preview-grid');
    const gridList = document.getElementById('seminar-grid');
    
    gridPreview.innerHTML = '';
    gridList.innerHTML = '';

    let filtered = filter === "All" ? seminars : seminars.filter(s => s.kategori === filter);

    seminars.slice(0, 3).forEach(s => gridPreview.innerHTML += createCardHTML(s));
    
    if (filtered.length === 0) {
        gridList.innerHTML = `<p style="grid-column: 1/-1; text-align:center;">Tidak ada seminar.</p>`;
    } else {
        filtered.forEach(s => gridList.innerHTML += createCardHTML(s));
    }
}

function filterSeminars() {
    renderSeminars(document.getElementById('category-filter').value);
}

// =========================================
// DETAIL
// =========================================
function showDetail(id) {
    const s = seminars.find(x => x.id === id);
    const content = document.getElementById('detail-content');
    content.innerHTML = `
        <div class="detail-header">
            <span class="card-badge" style="display:inline-block; margin-bottom:10px;">${s.kategori}</span>
            <h2 style="color: var(--primary); font-size: 2rem;">${s.judul}</h2>
            <p style="color: var(--text-muted);">🎙 Pembicara: <strong>${s.pembicara}</strong></p>
        </div>
        <div class="detail-body">
            <div>
                <h3>Deskripsi</h3>
                <p style="margin-top:10px;">${s.deskripsi}</p>
            </div>
            <div class="detail-info-box">
                <p><strong>📅 Tanggal:</strong> ${s.tanggal}</p>
                <p><strong>⏰ Waktu:</strong> ${s.jam}</p>
                <p><strong>📍 Lokasi:</strong> ${s.lokasi}</p>
                <p><strong>👥 Kuota:</strong> ${s.kuota} Orang</p>
            </div>
        </div>
        <button class="btn btn-primary full-width" onclick="openModal(${s.id})">Daftar Sekarang</button>
    `;
    navigate('detail');
}

// =========================================
// MODAL
// =========================================
function openModal(id) {
    const s = seminars.find(x => x.id === id);
    document.getElementById('reg-seminar-id').value = s.id;
    document.getElementById('modal-seminar-title').innerText = s.judul;
    document.getElementById('registration-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('registration-modal').classList.add('hidden');
    document.getElementById('reg-form').reset();
}

// =========================================
// PENDAFTARAN & VALIDASI
// =========================================
function handleRegistration(event) {
    event.preventDefault();

    // 1. Ambil elemen input
    const elNama = document.getElementById('reg-nama');
    const elNim = document.getElementById('reg-nim');
    const elEmail = document.getElementById('reg-email');
    const elProdi = document.getElementById('reg-prodi');
    const elJkList = document.getElementsByName('reg-jk');
    const seminarId = parseInt(document.getElementById('reg-seminar-id').value);

    // Ambil nilai
    const nama = elNama.value.trim();
    const nim = elNim.value.trim();
    const email = elEmail.value.trim();
    const prodi = elProdi.value;
    let jkInput = null;
    
    for (let radio of elJkList) {
        if (radio.checked) {
            jkInput = radio;
            break;
        }
    }

    // 2. Reset semua pesan error dan warna merah terlebih dahulu
    document.querySelectorAll('.error-text').forEach(el => el.innerText = '');
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    let isValid = true;

    // VALIDASI NAMA
    if (!nama) {
        document.getElementById('err-nama').innerText = "Nama lengkap wajib diisi";
        elNama.classList.add('input-error');
        isValid = false;
    }

    // VALIDASI NIM
    if (!nim) {
        document.getElementById('err-nim').innerText = "NIM wajib diisi";
        elNim.classList.add('input-error');
        isValid = false;
    } else if (!/^\d+$/.test(nim) || nim.length < 8) {
        document.getElementById('err-nim').innerText = "NIM minimal 8 digit angka";
        elNim.classList.add('input-error');
        isValid = false;
    }

    // VALIDASI EMAIL
    if (!email) {
        document.getElementById('err-email').innerText = "Email wajib diisi";
        elEmail.classList.add('input-error');
        isValid = false;
    } else if (!email.includes('@')) {
        document.getElementById('err-email').innerText = "Email harus mengandung '@'";
        elEmail.classList.add('input-error');
        isValid = false;
    }

    // VALIDASI PRODI
    if (!prodi) {
        document.getElementById('err-prodi').innerText = "Program studi wajib dipilih";
        elProdi.classList.add('input-error');
        isValid = false;
    }

    // VALIDASI JENIS KELAMIN
    if (!jkInput) {
        document.getElementById('err-jk').innerText = "Jenis kelamin wajib dipilih";
        isValid = false;
    }

    // Cek NIM ganda (hanya jika NIM formatnya sudah benar)
    let savedData = JSON.parse(localStorage.getItem('dataPendaftar')) || [];
    if (nim && isValid) {
        const isAlreadyRegistered = savedData.some(p => p.seminarId === seminarId && p.nim === nim);
        if (isAlreadyRegistered) {
            document.getElementById('err-nim').innerText = "NIM ini sudah terdaftar di seminar ini";
            elNim.classList.add('input-error');
            isValid = false;
        }
    }

    // Jika ada satu saja yang tidak valid, hentikan proses (jangan simpan)
    if (!isValid) return;

    // JIKA LOLOS SEMUA VALIDASI
    const s = seminars.find(x => x.id === seminarId);
    
    const pendaftar = {
        id: Date.now(),
        seminarId: seminarId,
        judulSeminar: s.judul,
        nama: nama,
        nim: nim,
        email: email,
        prodi: prodi,
        jenisKelamin: jkInput.value,
        waktuDaftar: new Date().toLocaleString('id-ID')
    };

    savedData.push(pendaftar);
    localStorage.setItem('dataPendaftar', JSON.stringify(savedData));

    // Bersihkan form & tampilkan modal sukses
    closeModal();
    showNotificationModal("Pendaftaran berhasil, tiket Anda siap dicetak.", "success", () => {
        showConfirmation(pendaftar);
    });
}

// =========================================
// KONFIRMASI (Tiket Ditambahkan Info Jenis Kelamin)
// =========================================
function showConfirmation(data) {
    const content = document.getElementById('ticket-content');
    content.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
            <h2 style="color: var(--success);">Pendaftaran Berhasil!</h2>
            <div style="text-align: left; background: #f8fafc; padding: 1.5rem; border-radius: 15px; margin: 1.5rem 0; border: 1px dashed #cbd5e1;">
                <p><strong>ID Tiket:</strong> TIX-${data.id}</p>
                <p><strong>Nama:</strong> ${data.nama}</p>
                <p><strong>NIM:</strong> ${data.nim}</p>
                <p><strong>Jenis Kelamin:</strong> ${data.jenisKelamin}</p>
                <p><strong>Prodi:</strong> ${data.prodi}</p>
                <p><strong>Seminar:</strong> ${data.judulSeminar}</p>
                <p><strong>Waktu Daftar:</strong> ${data.waktuDaftar}</p>
            </div>
            <button class="btn btn-outline full-width" onclick="window.print()">🖨 Cetak Tiket</button>
        </div>
    `;
    navigate('confirmation');
}

// =========================================
// FITUR NOTIFIKASI MODAL (Berdiri Sendiri)
// =========================================
function showNotificationModal(message, type, onOkCallback) {
    // Buat elemen overlay baru khusus untuk notifikasi agar tidak merusak form asli
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.zIndex = '10005'; // Pastikan posisinya paling atas
    
    // Atur konten berdasarkan tipe
    const icon = type === 'success' ? '✅' : '❌';
    const titleLarge = type === 'success' ? 'Woohoo!' : 'Uh oh!';
    const titleColorClass = type === 'success' ? 'success' : 'error';
    const btnText = type === 'success' ? 'Oke, Cetak Tiket' : 'Oke, Perbaiki Form';
    const btnColor = type === 'success' ? 'var(--primary)' : 'var(--danger)';
    
    // Masukkan HTML notifikasi ke dalam overlay baru
    overlay.innerHTML = `
        <div class="modal-content notification-modal">
            <div class="modal-icon-circle ${type}">${icon}</div>
            <div class="modal-title-large ${titleColorClass}">${titleLarge}</div>
            <div class="modal-desc-muted">${message}</div>
            <button class="modal-btn-large" style="background-color: ${btnColor}">${btnText}</button>
        </div>
    `;
    
    // Tambahkan notifikasi ke dalam layar (body)
    document.body.appendChild(overlay);
    
    // Fungsi ketika tombol Oke diklik
    const btn = overlay.querySelector('.modal-btn-large');
    btn.addEventListener('click', () => {
        // Hapus elemen notifikasi dari memori HTML agar bersih
        overlay.remove(); 
        
        // Jalankan fungsi lanjutan (misalnya pindah ke tiket)
        if (typeof onOkCallback === 'function') {
            onOkCallback();
        }
    });
}