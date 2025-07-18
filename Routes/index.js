const express=require('express');
const router=express.Router();

const userRoutes=require('../User/userRoutes');
const notesRoutes=require('../Notes/NotesRoutes');

router.use('/user',userRoutes);
router.use('/notes',notesRoutes);

module.exports=router;