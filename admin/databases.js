// nhận và đọc data có sẵn
var productInfoList = [];
import { addDatasp } from "./Data/datasp.js";
// productInfoList = addDatasp();
if(typeof localStorage["productList"] === "undefined") productInfoList = addDatasp();
else productInfoList =  JSON.parse(localStorage.getItem('productList'));

// kiểm tra mảng
localStorage.setItem('productList', JSON.stringify(productInfoList));

// set giá trị cho lần đầu tiên nhập id ở phần thêm sản phẩm
if (parseInt(productInfoList[productInfoList.length - 1].id.slice(2, 5)) < 9) document.getElementById('addId').value = "SP00" + (parseInt(productInfoList[productInfoList.length - 1].id.slice(2, 5)) + 1);
else document.getElementById('addId').value = "SP" + (parseInt(productInfoList[productInfoList.length - 1].id.slice(2, 5)) > 98 ? (parseInt(productInfoList[productInfoList.length - 1].id.slice(2, 5)) + 1) : ("0" + (parseInt(productInfoList[productInfoList.length - 1].id.slice(2, 5)) + 1)));
// hàm thêm dữ liệu vào bảng
function addDatatoTable(product) {
    // PHẦN THÊM DỮ LIỆU VÀO BẢNG TRÊN HỆ THỐNG ADMIN

    var tableProduct = document.getElementById('listProduct');
    var showProduct = document.createElement('tr');
    for (let key of Object.keys(product)) {
        if(key === 'state') continue;
        let info = document.createElement('td');
        info.innerText = product[key];
        showProduct.appendChild(info);
    }
    // thêm nút sửa/xóa
    let info = document.createElement('td');
    info.innerHTML = '<div><input type="button" value="Ẩn" name="ers"></div><input type="button" value="khôi phục" name="undo" class="d-none"><div></div><div><input type="button" value="sửa" name="chg"></div>';
    // set onclick cho nút xóa
    let deleteButton = info.querySelector('input[name="ers"]');
    deleteButton.id = 'ers_' + product.id;
    let changeButton = info.querySelector('input[name="chg"]');
    changeButton.id = 'chg_' + product.id;

    let undoButton = info.querySelector('input[name="undo"]');
    undoButton.id = 'undo_' + product.id;

    if(product.state === '0'){
        deleteButton.classList.add('d-none');
        changeButton.classList.add('d-none');
        undoButton.classList.remove('d-none');
    }

    deleteButton.onclick = function (e) {
        e.stopPropagation();
        for (let i = 0; i < productInfoList.length; i++) {
            if (deleteButton.id == 'ers_' + productInfoList[i].id) {
                productInfoList[i].state = "0";
                deleteButton.classList.add('d-none');
                changeButton.classList.add('d-none');
                undoButton.classList.remove('d-none');
                localStorage.setItem('productList', JSON.stringify(productInfoList));
                break;
            }
        }
    }


    undoButton.onclick = function (e) {
        e.stopPropagation();
        for (let i = 0; i < productInfoList.length; i++) {
            if (undoButton.id == 'undo_' + productInfoList[i].id) {
                productInfoList[i].state = "1";
                deleteButton.classList.remove('d-none');
                changeButton.classList.remove('d-none');
                undoButton.classList.add('d-none');
                localStorage.setItem('productList', JSON.stringify(productInfoList));
                break;
            }
        }
    }


    // set onclick cho nút sửa

    let countingPressChange = 0;
    changeButton.onclick = function (e) {
        e.stopPropagation();
        // 1 là sửa 
        // 0 là xong
        countingPressChange = (countingPressChange + 1) & 1;
        if (countingPressChange) {
            for (let i = 0; i < productInfoList.length; i++) {
                if (changeButton.id == 'chg_' + productInfoList[i].id) {
                    let item = showProduct.querySelectorAll('td');
                    for (let j = 0; j < item.length - 1; j++) {
                        // biến các thẻ trở thành thẻ có thể edit
                        if (j == 6) {
                            let val = item[j].innerText;
                            if (val === "Trong nhà")
                                item[j].innerHTML = '<select class="cell-table" style="width: 100%;"><option value="none" disabled style="text-align: center;">---Chọn---</option><option value="Trong nhà" selected style="text-align: center;">Trong nhà</option><option value="Ngoài trời" style="text-align: center;">Ngoài trời</option></select>';
                            else
                                item[j].innerHTML = '<select class="cell-table" style="width: 100%;"><option value="none" disabled style="text-align: center;">---Chọn---</option><option value="Trong nhà" style="text-align: center;">Trong nhà</option><option value="Ngoài trời" selected style="text-align: center;">Ngoài trời</option></select>';
                        }
                        else if (j == 3) {
                            let val = item[j].innerText;
                            if (val === "Đèn Pha")
                                item[j].innerHTML = '<select style="width: 100%;" class="cell-table"><option value="none" disabled style="text-align: center;">---Chọn---</option><option value="Đèn Pha" selected>Đèn Pha</option><option value="Đèn LED">Đèn LED</option><option value="Đèn UFO">Đèn UFO</option><option value="Đèn ốp trần">Đèn ốp trần</option>';
                            else if (val == "Đèn LED")
                                item[j].innerHTML = '<select style="width: 100%;" class="cell-table"><option value="none" disabled style="text-align: center;">---Chọn---</option><option value="Đèn Pha">Đèn Pha</option><option value="Đèn LED" selected>Đèn LED</option><option value="Đèn UFO">Đèn UFO</option><option value="Đèn ốp trần">Đèn ốp trần</option>';
                            else if (val == "Đèn UFO")
                                item[j].innerHTML = '<select style="width: 100%;" class="cell-table"><option value="none" disabled style="text-align: center;">---Chọn---</option><option value="Đèn Pha">Đèn Pha</option><option value="Đèn LED">Đèn LED</option><option value="Đèn UFO" selected>Đèn UFO</option><option value="Đèn ốp trần">Đèn ốp trần</option>';
                            else if (val == "Đèn ốp trần")
                                item[j].innerHTML = '<select style="width: 100%;" class="cell-table"><option value="none" disabled style="text-align: center;">---Chọn---</option><option value="Đèn Pha">Đèn Pha</option><option value="Đèn LED">Đèn LED</option><option value="Đèn UFO">Đèn UFO</option><option value="Đèn ốp trần" selected>Đèn ốp trần</option>';
                        }
                        else {
                            let val = item[j].innerText;
                            item[j].innerHTML = '<input type="text" style="width: 100%;" class="cell-table">';
                            if (j == 0) item[j].querySelector('input').disabled = true;
                            item[j].querySelector('input').value = val;

                        }
                    }
                    changeButton.value = "xong";
                    break;
                }
            }
        }
        else {
            for (let i = 0; i < productInfoList.length; i++) {
                if (changeButton.id == 'chg_' + productInfoList[i].id) {

                    let items = showProduct.querySelectorAll('td');

                    //kiểm tra xem sau khi sửa có đúng quy tắc không
                    for (let item = 0; item < items.length; ++item) {
                        // bỏ qua những thẻ select vì đã được chọn mặc định
                        let checkInputTag = items[item].querySelector('input');
                        if (!checkInputTag) continue;
                        let itemValue = checkInputTag.value;
                        let itemValue0 = items[0].querySelector('input').value;
                        // kiểm tra những thẻ input có trống hay không
                        if (itemValue == "" || itemValue0.length < 2 || itemValue0.slice(0, 2) != "SP") {
                            countingPressChange = 1;
                            alert("vui lòng điền những thông tin còn thiếu");
                            return;
                        }
                        // kiểm tra xem những thẻ thứ 2 4 5 có được nhập số hay không 
                        if (item == 2 || item == 4 || item == 5) {
                            for (let d = 0; d < itemValue.length; d++) {
                                if (itemValue[d] < '0' || itemValue[d] > '9') {
                                    countingPressChange = 1;
                                    alert("thông tin không hợp lệ bạn phải điền số vào các ô giá - số lượng - công suất");
                                    return;
                                }
                            }
                        }
                    }
                    let j = 0;
                    // phần đọc dữ liệu sau khi kiểm tra 
                    for (let key of Object.keys(productInfoList[i])) {
                        // đọc dữ liệu từ bảng chỉnh sửa
                        if(key==='state') continue;
                        let inputElement = items[j].querySelector('input');
                        let selectElement = items[j].querySelector('select');

                        if (selectElement) {
                            // Nếu là thẻ select
                            productInfoList[i][key] = selectElement.value;
                            items[j].innerHTML = selectElement.value;
                        } else if (inputElement) {
                            // Nếu là thẻ input
                            productInfoList[i][key] = inputElement.value;
                            items[j].innerHTML = inputElement.value;
                        }
                        ++j;
                    }

                    localStorage.setItem('productList', JSON.stringify(productInfoList));
                    changeButton.value = "sửa";
                    break;
                }
            }

        }
    }
    // thông tin sau kiểm tra đã đúng quy tắt thêm thông tin vào 1 hàng
    showProduct.appendChild(info);
    // thêm dữ liệu vào bảng
    tableProduct.appendChild(showProduct);

}
// hàm in data vào bảng
function printDataFromOriginalArray(filteredProducts) {
    const tableProduct = document.getElementById('listProduct');
    tableProduct.innerHTML=""
    for (let i = 0; i < filteredProducts.length; ++i) {
        let product = filteredProducts[i];
        addDatatoTable(product);
    }
}
printDataFromOriginalArray(productInfoList);
const searchSP = document.querySelector("#searchSP");
searchSP.addEventListener("input", () => filterProducts(searchSP.value));
const filterProducts = (searchTerm) => {

    const filteredProducts = productInfoList.filter(product => {
        const matchesSearchTerm = product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())||product.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearchTerm;
    });
    printDataFromOriginalArray(filteredProducts);
};
// hàm đọc dữ liệu từ bảng 
function readData() {
    const product = {
        id: document.getElementById('addId').value,
        nameProduct: document.getElementById('addName').value,
        price: document.getElementById('addPrice').value,
        type: document.getElementById('addType').value,
        quantity: document.getElementById('addQuantity').value,
        capacity: document.getElementById('addCapacity').value,
        view: document.getElementById('addView').value,
        detail: document.getElementById('addDetail').value,
        state: "1"
    };
    return product;
}
let crudProduct = document.getElementsByName('crud');

crudProduct[0].onclick = function () {
    document.getElementById('addList').classList.add('d-none');
    document.getElementById('submitAdd').classList.add('d-none');
}
crudProduct[1].onclick = function () {
    document.getElementById('addList').classList.remove('d-none');
    var submitAdd = document.getElementById('submitAdd');
    submitAdd.classList.remove('d-none');
    submitAdd.onclick = function (e) {
        e.stopPropagation();
        // đọc dữ liệu từ bảng
        let product = readData();
        // kiểm tra xem tất cả các ô có được nhập chưa
        for (let key of Object.keys(product)) {
            if (product[key] == "" || product.id.length < 2 || product.id.slice(0, 2) != "SP") {
                alert("vui lòng điền những thông tin còn thiếu");
                return;
            }
            if (key == "view") {
                if (product[key] == "none") {
                    alert("vui lòng chọn vị trí lắp đặt");
                    return;
                }
            }
            else if (key == "type") {
                if (product[key] == "none") {
                    alert("vui lòng chọn loại sản phẩm");
                    return;
                }
            }
            else if (key == "price" || key == "quantity" || key == "capacity") {
                for (let d = 0; d < product[key].length; d++) {
                    if (product[key][d] < '0' || '9' < product[key][d]) {
                        alert("thông tin không hợp lệ bạn phải điền số vào các ô giá - số lượng - công suất");
                        return;
                    }
                }
            }
        }
        // thêm dữ liệu vào mảng
        productInfoList.push(product);
        // thêm dữ liệu vào bảng
        addDatatoTable(product);
        //thêm dữ liệu vào sever
        localStorage.setItem('productList', JSON.stringify(productInfoList));
        // xóa phần đã nhập
        if (parseInt(productInfoList[productInfoList.length - 1].id.slice(2, 5)) < 9) document.getElementById('addId').value = "SP00" + (parseInt(productInfoList[productInfoList.length - 1].id.slice(2, 5)) + 1);
        else document.getElementById('addId').value = "SP" + (parseInt(productInfoList[productInfoList.length - 1].id.slice(2, 5)) > 98 ? (parseInt(productInfoList[productInfoList.length - 1].id.slice(2, 5)) + 1) : ("0" + (parseInt(productInfoList[productInfoList.length - 1].id.slice(2, 5)) + 1)));
        document.getElementById('addId').placeholder = "SP";
        document.getElementById('addName').value = "";
        document.getElementById('addPrice').value = "";
        document.getElementById('addType').value = "none";
        document.getElementById('addQuantity').value = "";
        document.getElementById('addCapacity').value = "";
        document.getElementById('addView').value = "none";
        document.getElementById('addDetail').value = "";


    };
}
