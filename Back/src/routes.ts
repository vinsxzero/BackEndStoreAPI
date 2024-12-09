import { Router } from "express";

import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { ensureAuthenticated} from "./middleware/ensureAuthenticated";

// Importando as controllers
import { UserController } from "./controller/UserController";
import { SaleController } from "./controller/SaleController";
import { ProductController } from "./controller/ProductController";
import { ClientController } from "./controller/ClientController";
import { CategoryController } from "./controller/CategoryController";
import { ProfileController } from "./controller/ProfileController";
import { VendorController } from "./controller/VendorController";
const router = Router();

const userController = new UserController();
const saleController = new SaleController();
const clientController = new ClientController();
const productController = new ProductController();
const categoryController = new CategoryController();
const profileController = new ProfileController();
const vendorController = new VendorController();
const autenticateUserController  = new AuthenticateUserController();

// Rota para cadastrar e autenticar usuário
router.post("/users", userController.createUser);
router.post("/login", autenticateUserController.authenticateUser);

router.use((req, res, next) => {
    ensureAuthenticated(req, res, next)
})

//Rotas para users
router.get("/users", userController.listUsers);
router.put("/users/:id", userController.updateUser);
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


//Rotas para profile
router.get("/profiles", profileController.listProfile)
router.post("/profiles", profileController.createProfile)
export {router}

//Rotas para Vendor
router.post("/vendors", vendorController.createVendor)
router.get("/vendors", vendorController.listVendors)
router.delete("/vendors/:id", vendorController.deleteVendor)
router.put("/vendors/:id", vendorController.updateVendor)