const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");


router.post("/", basketController.addOrUpdate); 
router.get("/", basketController.getAll);
router.put("/add", basketController.addOne);
router.put("/delete", basketController.deleteOne);
router.delete('/clear/:basket_id', basketController.clearBasket);

module.exports = router;