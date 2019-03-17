var product = [
    {article: '000001', name: 'Mango People T-shirt', price: 52.00},
    {article: '000002', name: 'Mango People Blouse', price: 68.00},
    {article: '000003', name: 'Mango People Jacket', price: 48},
    {article: '000004', name: 'Mango People Dress', price: 37},
    {article: '000005', name: 'Mango People Dress', price: 67},
    {article: '000006', name: 'Mango People Blazer', price: 62},
    {article: '000007', name: 'Mango People Pants', price: 75},
    {article: '000008', name: 'Mango People Sweatshirt', price: 45}
]


var createProductItem = (article, name, price) => {return `<figure class="productItem"><img src="img/product/${article}.jpg" alt="productFoto"><div class="shadowHover"><button class="addToCart">&ensp;Add to Cart</button></div><figcaption>${name}<p>$ ${price}</p></figcaption></figure>`}


var createProductList = list =>{
    var productList = list.map(item => createProductItem(item.article, item.name, item.price))
    document.getElementById('product').innerHTML = productList.join('')
} 


   
function init () {
    createProductList(product)

} 


window.addEventListener('load', init)