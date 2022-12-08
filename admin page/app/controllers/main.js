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
                
                <img width ="50px" height ="50px"  src="${product.img}"/>
                
                </td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td>
                <button id="editProBtn" class="btn btn-warning" onclick="" data-toggle ="modal" data-target="#myModal">Edit</button>
                <br>
                <button id="deleteProBtn" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
            `;
        });
        getEle("tblDanhSachSanPham").innerHTML = content;
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
function deleteProduct(id){
    productServices.callApi(`products/${id}`,"DELETE",null)
    .then(() => {
        getListProduct();
    })
    .catch((error) => {
        console.log(error);
    })
}
window.deleteProduct =deleteProduct;

getEle("btnThemSanPham").addEventListener("click", () =>{
    getEle("modalTitle").innerHTML = "Thêm sản phẩm";
    getEle("btnCapNhat").style.display ="none";
    getEle("btnThem").style.display ="block";
});

const getInfoSanPham = () => { 
    
    const tenSP = getEle("Ten").value;
    const giaSP = getEle("Gia").value;
    const manHinh = getEle("Manhinh").value;
    const cameraSau = getEle("CameraSau").value;
    const cameraTruoc = getEle("CameraTruoc").value;
    const hinhAnh = getEle("HinhAnh").value;
    const moTa = getEle("MoTa").value;
    const loaiSP = getEle("MoTa").value;
}