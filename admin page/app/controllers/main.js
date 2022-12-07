import productService from "./../services/productService.js";

const productServices = new productService();

const getEle  = (id) => document.getElementById(id);

const renderHTML = (data) => {
    let content = "";
    if(data && data.length > 0) {
        data.forEach((product)=> {
            content += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>
                <td>
                
                <img width ="50px" height ="50px"  src="${product.img}"
                
                </td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td>
                <button class="btn btn-warning" onClick=()>Edit</button>
                <br>
                <button class="btn btn-danger" onClick=()>Delete</button>
                </td>
            </tr>
            `;
        });
        getEle("tblDanhSachNguoiDung").innerHTML = content;
    }
}

const getListProduct = () => {
    productServices.getListProductApi()
    .then((result) => {
        if(result.statusText === "OK")
        console.log(result.data);
        renderHTML(result.data);
    })
    .catch((error) => {
        console.log(error);
    })
};

getListProduct();