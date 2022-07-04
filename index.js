class Product {
    constructor(Id, Name, Price, Color) {
        this.Id = Id;
        this.Name = Name;
        this.Price = Price;
        this.Color = Color;
    }
}
var products = [];
function init() {
    if (localStorage.getItem("product_data") == null) {
        products = [
            new Product(1, "Nike", 1200000, "Đen"),
            new Product(2, "Adidas", 1500000, "xanh"),
            new Product(3, "Puma", 2000000, "Đỏ"),
            new Product(4, "NB", 2100000, "Trắng")
        ]
    }
}
function renderProducts(data) {
    let tbProduct = document.querySelector('.table>tbody');
    let htmls = data.map(function (pro) {
        return `<tr id="tr_${pro.Id}">
                    <td>${pro.Name}</td>
                    <td>${formatCurrency(pro.Price)}</td>
                    <td>${pro.Color}</td>
                <td id="action_${pro.Id}">
                    <button onclick="edit(${pro.Id})" class="button"> Edit </button>
                    <button class="btn button d-none" onclick="update(${pro.Id})">update</button>
                    <button class="btn button d-none" onclick="resetRow(${pro.Id})">resetRow</button>
                    <button onclick="erase(${pro.Id})" class="button">Remove</button>
                </td>
            </tr>`;
    });
    tbProduct.innerHTML = htmls.join("");

}
function add() {
    let name = document.querySelector("#productName").value;
    if (!vali(name)) {
        alert("chưa có dữ liệu")
        return;
    }
    let price = Number(document.querySelector("#productPrice").value);
    if (price <= 0) {
        alert("giá không được bé hơn hoặc bằng không")
        return;
    }
    let color = document.querySelector("#productColor").value;
    if (!vali(color)) {
        alert("chưa có dữ liệu")
        return;
    }
    let productId = getId() + 1;
    let newProduct = new Product(productId, name, price, color);
    products.push(newProduct);
    renderProducts(products);
    resetFrom();
}
function getId() {
    let producttemp = [...products];
    let maxId = producttemp.sort(function (dms1, dms2) {
        return dms2.productId = dms1.productId
    })[0].productId
    return maxId;
}
function search(){
    let keywork = document.querySelector('#keyword').value;
    // console.log(keywork);
    let result =  products.filter(function(product, index){
        return product.Name.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    console.log(result);
    renderProducts(result);
}
function resetFrom() {
    document.querySelector("#productName").value = "";
    document.querySelector("#productPrice").value = "";
    document.querySelector("#productColor").value = "";
}
function vali(field) {
    return field != null && field.trim() != '';
}
function erase(Id) {
    let confirmed = window.confirm("xóa nha?");
    if (confirmed) {
        let position = products.findIndex(function (pdt) {
            return pdt.productId == Id;
        })
        products.splice(position, 1);
        renderProducts(products);
    }

}
function edit(id) {
    let trTag = document.getElementById(`tr_${id}`);
    let product = getProductById(id);
    trTag.children[0].innerHTML=`<input type="text" class="input" value="${product.Name}"/>`;
    trTag.children[1].innerHTML=`<input type="number" class="input" value="${product.Price}" />`;
    trTag.children[2].innerHTML=`<input type="text" class="input" value="${product.Color}" />`;
    let action = document.getElementById(`action_${id}`);
    action.children[0].classList.add('d-none');
    action.children[1].classList.remove('d-none');
    action.children[2].classList.remove('d-none');
    action.children[3].classList.add('d-none');
}

function update(id) {
    let tr = document.getElementById(`tr_${id}`);
    let product = getProductById(id);
    let newProductName = tr.children[0].children[0].value;
    let newPrice = Number(tr.children[1].children[0].value);
    let newColor = tr.children[2].children[0].value;
    product.Name = newProductName;
    product.Price = newPrice;
    product.Color = newColor;
    resetRow(id);
}

function getProductById(pdtId) {
    return products.find(function (pdt) {
        return pdt.Id == pdtId;
    })
}
function resetRow(id) {
    let tr = document.getElementById(`tr_${id}`);
    let product = getProductById(id);
    tr.children[0].innerHTML = product.Name;
    tr.children[1].innerHTML =formatCurrency(product.Price);
    tr.children[2].innerHTML = product.Color;
    let action = document.getElementById(`action_${id}`);
    action.children[0].classList.remove('d-none');
    action.children[1].classList.add('d-none');
    action.children[2].classList.add('d-none');
    action.children[3].classList.remove('d-none');
}

function formatCurrency(number) {
    return number.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

function ready() {
    init();
    renderProducts(products);
}
ready();
