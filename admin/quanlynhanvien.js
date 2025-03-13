let dsnhanvien = JSON.parse(localStorage.getItem('dsnhanvien')) || [];
if (!dsnhanvien.length) {
    localStorage.removeItem('dsnhanvien');
    dsnhanvien = [
        {
            manhanvien: "NV001",
            tennhanvien: "Nguyễn Văn Tèo",
            ngaysinh: "2005-01-19",
            luong: 200000,
            bophan: "help",
            ngaynghi: 0,
        },
        {
            manhanvien: "NV002",
            tennhanvien: "Trần Thị Nở",
            ngaysinh: "2000-03-20",
            luong: 300000,
            bophan: "sell",
            ngaynghi: 2,
        }
    ];
    localStorage.setItem('dsnhanvien', JSON.stringify(dsnhanvien));
}
// Hàm tạo MSNV tự động và đảm bảo không trùng
function generateMSNV() {
    let newId = 'NV' + (dsnhanvien.length + 1).toString().padStart(3, '0');
    while (dsnhanvien.some(nv => nv.manhanvien === newId)) {
        newId = 'NV' + (parseInt(newId.slice(2)) + 1).toString().padStart(3, '0');
    }
    return newId;
}

// Hàm hiển thị danh sách nhân viên
function showdsnv(nv, i) {
    let clone = document.querySelector('#nhanvienmoimau').cloneNode(true);
    clone.id = "";
    clone.classList.remove('d-none');

    let manhanvienmau = clone.querySelector('input[type="text"]');
    manhanvienmau.value = nv['manhanvien'];

    let tennhanvienmau = clone.querySelectorAll('input[type="text"]')[1];
    tennhanvienmau.value = nv['tennhanvien'];

    let ngaysinhmau = clone.querySelectorAll('input[type="date"]')[0];
    ngaysinhmau.value = nv['ngaysinh'];

    let luongmau = clone.querySelectorAll('input[type="number"]')[0];
    luongmau.value = nv['luong'];

    let bophanmau = clone.querySelector('select');
    bophanmau.value = nv['bophan'];

    let ngaynghimau = clone.querySelectorAll('input[type="number"]')[1];
    ngaynghimau.value = nv['ngaynghi'];

    let thaotac = clone.querySelector('.btn-danger');
    thaotac.onclick = function () {
        document.getElementById('showNV').removeChild(clone);
        dsnhanvien.splice(i, 1);
        localStorage.setItem('dsnhanvien', JSON.stringify(dsnhanvien));
    }

    let editButton = clone.querySelector('.btn-warning');
    let count = 0;
    editButton.onclick = function () {
        count = (count + 1) & 1;
        if (count === 1) {
            editEmployee(clone, false);
        } else {
            editEmployee(clone, true);
            let inputs = clone.querySelectorAll('input, select');
            nv.tennhanvien = inputs[1].value;
            nv.ngaysinh = inputs[2].value;
            nv.luong = inputs[3].value;
            nv.bophan = inputs[4].value;

            localStorage.setItem('dsnhanvien', JSON.stringify(dsnhanvien));
        }
    };

    document.getElementById('showNV').appendChild(clone);
}

// Hàm chỉnh sửa nhân viên
function editEmployee(row, check) {
    let inputs = row.querySelectorAll('input, select');
    for (let i = 1; i < inputs.length - 1; ++i) {
        inputs[i].disabled = check;
    }
}

// Hàm chuyển đổi giữa bảng và form
document.getElementById('toggleView').onclick = function () {
    let tableView = document.getElementById('tableView');
    let formView = document.getElementById('formView');
    if (tableView.classList.contains('d-none')) {
        tableView.classList.remove('d-none');
        formView.classList.add('d-none');
        this.textContent = 'Thêm nhân viên';
    } else {
        tableView.classList.add('d-none');
        formView.classList.remove('d-none');
        this.textContent = 'Quản lý nhân viên';
    }
}

// Hàm thêm nhân viên mới
document.getElementById('them').onclick = function () {
    let form = document.getElementById('formAddEmployee');
    let manhanvien = document.getElementById('manhanvien');
    manhanvien.value = generateMSNV(); // Tạo mã nhân viên mới

    if (form.checkValidity()) {
        let tennhanvien = form.querySelector('[name="tennhanvien"]').value;
        let ngaysinh = form.querySelector('[name="ngaysinh"]').value;
        let luong = form.querySelector('[name="luong"]').value;
        let bophan = form.querySelector('[name="bophan"]').value;
        // let ngaynghi = form.querySelector('[name="ngaynghi"]').value;

        dsnhanvien.push({
            manhanvien: manhanvien.value,
            tennhanvien: tennhanvien,
            ngaysinh: ngaysinh,
            luong: luong,
            bophan: bophan,
            ngaynghi: 0
        });

        localStorage.setItem('dsnhanvien', JSON.stringify(dsnhanvien));
        showdsnv(dsnhanvien[dsnhanvien.length - 1], dsnhanvien.length - 1);
        form.reset(); // Reset form
        form.classList.remove('was-validated');
    } else {
        form.classList.add('was-validated');
    }
};

// Hiển thị danh sách nhân viên ban đầu
for (let i = 0; i < dsnhanvien.length; i++) {
    showdsnv(dsnhanvien[i], i);
}

