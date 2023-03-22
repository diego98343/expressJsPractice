const Product = require('../models/product');
const { search } = require('../routes/products');


const getAllProductsStatic = async (req, res) => {
    

    const products = await Product.find({}).sort('name');
    res.status(200).json({ products, nbHits: products.length });
  
}

//creating a controller with custom querry 
const getAllProducts = async (req, res) => {

    const { featured,company,name,sort,fields } = req.query
    
    const queryObject = {}
    
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
  
    // const products = await Product.find(queryObject);
    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
        
    } else {
        result = result.sort('createAt');
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    const products = await result

    res.status(200).json({ products,nbHits: products.length });
}


module.exports = {
    getAllProducts,
    getAllProductsStatic
}