import Validation from "./../validation/validation.js";
import Product from "./../models/product.js";
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
                <button id="editProBtn" class="btn btn-warning" onclick="editProduct(${product.id})" data-toggle ="modal" data-target="#myModal">Edit</button>
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
window.getListProduct =deleteProduct;
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
    
    const idSP = getEle("id").value;
    const tenSP = getEle("Ten").value;
    const giaSP = getEle("Gia").value;
    const manHinh = getEle("Manhinh").value;
    const cameraSau = getEle("CameraSau").value;
    const cameraTruoc = getEle("CameraTruoc").value;
    // let hinhAnh = "";
    // if(getEle("HinhAnh").files.length > 0) {
    //     hinhAnh = getEle("HinhAnh").files[0].name;
    // }
    const hinhAnh = getEle("HinhAnh").value;
    const moTa = getEle("MoTa").value;
    const loaiDT = getEle("loaiDT").value;

    // let isValid = true;

    // if(isAdd){
    //     isValid =
    //     Validation.kiemTraRong(tenSP, "errorTen", "(*) Vui long nhap tenSP");
    // };

    // if (!isValid) return;

    const product = new Product (idSP,tenSP, giaSP, manHinh, cameraSau, cameraTruoc, hinhAnh, moTa, loaiDT);

    return product;
}
window.getInfoSanPham =getInfoSanPham;
/**Add */
getEle("btnThem").addEventListener("click", () => {

    const product = getInfoSanPham();
    if (product){
        productServices.callApi(`products`, "POST", product)
      .then(() => {
        getListProduct();
        document.getElementsByClassName("close")[0].click();
      })
      .catch((error) => {
        console.log(error);
      });
    }  
  });

  /**Edit */

const editProduct = (id) => {
  getEle("modalTitle").innerHTML = "Sửa sản phẩm";
  getEle("btnThem").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  productServices.callApi(`products/${id}`, "GET", null)
    .then((result) => {
      const product = result.data;
      console.log(product);
    //   getEle("foodID").value = food.id;
      getEle("id").value = product.id;
      getEle("Ten").value = product.name;
      getEle("Gia").value = product.price;
      getEle("Manhinh").value = product.screen;
      getEle("CameraSau").value = product.backCamera;
      getEle("CameraTruoc").value = product.frontCamera;
      getEle("HinhAnh").value = product.img;
      getEle("MoTa").value = product.desc;
      getEle("loaiDT").value = product.type;
      return product;
    })
    .catch((err) => {
        console.log(err);
    });
};
  
window.editProduct = editProduct;


/**Update */
getEle("btnCapNhat").addEventListener("click", () => {

  const product = getInfoSanPham();
  console.log(product);
  productServices.callApi(`products/${product.id}`, "PUT", product)
    .then(() => {
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    }); 
});


const refresh = () => {
      getEle("Ten").value = '';
      getEle("Gia").value = '';
      getEle("Manhinh").value = '';
      getEle("CameraSau").value = '';
      getEle("CameraTruoc").value = '';
      getEle("HinhAnh").value = '';
      getEle("MoTa").value =  '';
      getEle("loaiDT").value = 'Chọn loại điện thoại';
}

window.refresh = refresh;

