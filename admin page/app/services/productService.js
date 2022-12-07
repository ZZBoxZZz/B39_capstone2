class productService{
    getListProductApi(){
        return axios({
            url: `https://637b69a76f4024eac20ce2d3.mockapi.io/api/products`,
            method: "GET",
        });
    }
}

export default productService;