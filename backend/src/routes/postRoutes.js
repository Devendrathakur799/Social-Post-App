const express =require("express");

const router =express.Router();

const protect =require("../middleware/authMiddleware");

const upload =require("../middleware/uploadMiddleware");

const {

createPost,

getPosts,

likePost,

addComment

}
=
require("../controllers/postController");

router.get("/",getPosts);

router.post(
"/",
protect,
upload.single("image"),
createPost
); 

router.put(
"/like/:id",
protect,
likePost
);

router.post(
"/comment/:id",
protect,
addComment
);

module.exports = router;