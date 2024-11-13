import { Router } from "express";



import { UserController } from "./controller/UserController";
import { SaleController } from "./controller/SaleController";
import { ProductController } from "./controller/ProductController";
import { ClientController } from "./controller/ClientController";
import { CategoryController } from "./controller/CategoryController";
const router = Router();

// Importando as controllers
const userController = new UserController();
const saleController = new SaleController();
const clientController = new ClientController();
const productController = new ProductController();
const categoryController = new CategoryController();

//const autenticateUserController  = new AuthenticateUserController();
//router.post("/login", autenticateUserController.authenticateUser);
//router.use((req, res, next) => {
    //console.log('Time:', Date.now())
  //  ensureAuthenticated(req, res, next)
//})



//Rotas para users
router.get("/users", userController.listUsers);
router.put("/users/:id", userController.updateUser);
router.post("/users", userController.createUser);
router.delete("/users/:id", userController.deleteUser);

//Rotas para client
router.get("/clients", clientController.listClients);
router.put("/clients/:id", clientController.updateClient);
router.post("/clients", clientController.createClient);
router.delete("/clients/:id", clientController.deleteClient);

//Rotas para product
router.get("/products", productController.listProducts)
router.put("/products/:id", productController.updateProduct)
router.post("/products", productController.createProduct)
router.delete("/products/:id", productController.deleteProduct)


// Rotas para category
router.get("/categories", categoryController.listCategories)
router.put("/categories/:id", categoryController.updateCategory)
router.post("/categories", categoryController.createCategory)
router.delete("/categories/:id", categoryController.deleteCategory)


// Rotas para sale
router.get("/sales", saleController.listSales)
router.put("/sales/:id", saleController.updateSale)
router.post("/sales", saleController.createSale)
router.delete("/sales/:id", saleController.deleteSale)



// router.use(ensureAuthenticated(req))

export {router} 