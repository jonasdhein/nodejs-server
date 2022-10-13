const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
})

app.get("/", (req, res) => {
    return res.json({
        message: 'initial route'
    })
});

app.get("/products", (req, res) => {
    return res.json(products);
});

app.get("/products/:id", (req, res) => {

    const { id } = req.params;
    const product = products.find(product => product.id == id);

    return res.json(product);
});

app.post("/products", (req, res) => {

    const { name, price } = req.body;

    const product = {
        id: randomUUID(),
        name,
        price
    };

    products.push(product);

    //gravar também no arquivo
    updateProductsFile();

    return res.json(product);

})


app.put("/products/:id", (req, res) => {

    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex], //rest operator
        name,
        price
    };

    updateProductsFile();

    return res.json({ message: "Product updated" });
});

app.delete("/products/:id", (req, res) => {

    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex >= 0) {
        const ret = products.splice(productIndex, 1);

        console.log(ret);

        updateProductsFile();

        return res.json({ message: "Product deleted" });

    } else {
        res.status(404);
        return res.json({ message: "Product not found" });
    }

});

function updateProductsFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Product inserted");
        }
    })
}

app.listen(8080, () => console.log("Server running on 8080"));