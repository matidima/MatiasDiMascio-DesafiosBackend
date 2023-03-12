import { buildSchema } from "graphql";

export const schemaProduct = buildSchema(`
    type Products {
        _id: ID!,
        title: String,
        description: String,
        code: Int, 
        thumbnail: String,
        price: Int,
        stock: Int,
    }
    input InputCreateProduct {
        title: String,
        description: String,
        code: Int, 
        stock: Int,
        thumbnail: String,
        price: Int,
    }
    type Query {
        getProductById(_id: ID!): Products
        getAllProducts: [Products]
    }
    type Mutation {
        createProduct(datos: InputCreateProduct): Products
        deleteProductById(_id: ID!): Products
        updateProductById(_id: ID!, datos: InputCreateProduct): Products
    }
`)