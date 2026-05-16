const express = require("express");
const router = express.Router();
const multer = require("multer");

const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, validateListing } = require("../middleware");
const listings = require("../controllers/listing");
const { storage } = require("../cloudConfig");

const upload = multer({ storage });



router
  .route("/")
  .get(wrapAsync(listings.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listings.createListing)
  );

router.get("/new", isLoggedIn, listings.renderNewForm);

router.get("/:id/show", wrapAsync(listings.showListing));

router.get("/:id/edit", isLoggedIn, wrapAsync(listings.renderEditForm));

router
  .route("/:id")
  .put(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listings.updateListing)
  )
  .delete(
    isLoggedIn,
    wrapAsync(listings.deleteListing)
  );

module.exports = router;