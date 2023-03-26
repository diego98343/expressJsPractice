const Product = require('../models/product');
const { search } = require('../routes/products');


const getAllProductsStatic = async (req, res) => {
    

    const products = await Product.find({price:{$gt: 100}})
        .sort('name')
        .select('name price')
        .limit(10)
        .skip(1)
    
    res.status(200).json({ products, nbHits: products.length });
  
}

//creating a controller with custom querry 
const getAllProducts = async (req, res) => {

    const { featured,company,name,sort,fields, numericFilters } = req.query
    
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

    if (numericFilters) {

        //we are converting numericFilter querry in mangos way to filter
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g

        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`);
        
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result

    res.status(200).json({ products,nbHits: products.length });
}


module.exports = {
    getAllProducts,
    getAllProductsStatic
}