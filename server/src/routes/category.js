import {Router} from 'express';
import CategoryController from '../controllers/category';
const categoryRouter = Router();
const categoryController = new CategoryController();
categoryRouter.get('/', categoryController.getAllCategory)
categoryRouter.get('/:id', categoryController.getCategoryById)
categoryRouter.post('/', categoryController.CreatCategory)
categoryRouter.put('/:id', categoryController.EditCategory)
categoryRouter.delete('/:id', categoryController.DeleteCategory)

export default categoryRouter;