let customerList = JSON.parse(localStorage.getItem('userList'));
// Hàm hiển thị thông tin khách hàng trong bảng
function displayCustomerTable() {
    const tableBody = document.getElementById('customerTableBody');
    tableBody.innerHTML = ''; // Xóa bảng trước khi thêm dữ liệu mới

    customerList.forEach((customer, index) => {
        const row = document.createElement('tr');

        // Thêm các ô dữ liệu cho từng trường thông tin
        row.innerHTML = `
            <td>${customer.fullName || "Không có dữ liệu"}</td>
            <td>${customer.userName || "Không có dữ liệu"}</td>
            <td>${customer.email || "Không có dữ liệu"}</td>
            <td class="text-end">${customer.phoneNum || "Không có dữ liệu"}</td>
            <td>${customer.gender || "Không có dữ liệu"}</td>
            <td>${customer.address || "Không có dữ liệu"}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteCustomer(${index})">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Hàm xóa khách hàng theo chỉ số trong mảng
function deleteCustomer(index) {
    if(localStorage.getItem('currentUser')==index) localStorage.setItem('currentUser', "-1");
    else if(localStorage.getItem('currentUser') > index) localStorage.setItem('currentUser', `${parseInt(localStorage.getItem('currentUser'))-1}`);
    customerList.splice(index, 1); // Xóa phần tử tại vị trí index
    localStorage.setItem('userList', JSON.stringify(customerList));
    displayCustomerTable(); // Cập nhật lại bảng
}

// Hiển thị dữ liệu khi tải trang
displayCustomerTable();
