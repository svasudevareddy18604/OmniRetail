import {

  assignProductToStore as assignProductToStoreService,

  getStoreInventory as getStoreInventoryService,

  getAllInventory as getAllInventoryService,

  updateInventoryQuantity as updateInventoryQuantityService,

} from "../services/storeInventory.service.js";

/* =========================================
   ASSIGN PRODUCT TO STORE
========================================= */

export const assignProductToStore =

  async (req, res) => {

    try {

      /* =====================================
         BODY
      ===================================== */

      const {

        store,
        product,
        quantity,
        lowStockLimit,

      } = req.body;

      /* =====================================
         VALIDATION
      ===================================== */

      if (

        !store ||

        !product

      ) {

        return res.status(400).json({

          success: false,

          message:

            "Store and product are required",

        });

      }

      /* =====================================
         SERVICE
      ===================================== */

      const inventory =

        await assignProductToStoreService({

          store,
          product,
          quantity,
          lowStockLimit,

        });

      /* =====================================
         SUCCESS
      ===================================== */

      return res.status(201).json({

        success: true,

        message:
          "Product assigned successfully",

        inventory,

      });

    }

    catch (err) {

      console.log(

        "ASSIGN PRODUCT CONTROLLER ERROR:",

        err

      );

      return res.status(500).json({

        success: false,

        message:

          err.message ||

          "Failed to assign product",

      });

    }

  };

/* =========================================
   GET SINGLE STORE INVENTORY
========================================= */

export const getStoreInventory =

  async (req, res) => {

    try {

      /* =====================================
         PARAMS
      ===================================== */

      const { storeId } =
        req.params;

      /* =====================================
         VALIDATION
      ===================================== */

      if (!storeId) {

        return res.status(400).json({

          success: false,

          message:
            "Store ID is required",

        });

      }

      /* =====================================
         SERVICE
      ===================================== */

      const inventory =

        await getStoreInventoryService(

          storeId

        );

      /* =====================================
         SUCCESS
      ===================================== */

      return res.status(200).json({

        success: true,

        count:
          inventory.length,

        inventory,

      });

    }

    catch (err) {

      console.log(

        "GET STORE INVENTORY CONTROLLER ERROR:",

        err

      );

      return res.status(500).json({

        success: false,

        message:

          err.message ||

          "Failed to fetch store inventory",

      });

    }

  };

/* =========================================
   GET ALL INVENTORY
========================================= */

export const getAllInventory =

  async (req, res) => {

    try {

      /* =====================================
         SERVICE
      ===================================== */

      const inventory =

        await getAllInventoryService();

      /* =====================================
         SUCCESS
      ===================================== */

      return res.status(200).json({

        success: true,

        count:
          inventory.length,

        inventory,

      });

    }

    catch (err) {

      console.log(

        "GET ALL INVENTORY CONTROLLER ERROR:",

        err

      );

      return res.status(500).json({

        success: false,

        message:

          err.message ||

          "Failed to fetch all inventory",

      });

    }

  };

/* =========================================
   UPDATE INVENTORY QUANTITY
========================================= */

export const updateInventoryQuantity =

  async (req, res) => {

    try {

      /* =====================================
         PARAMS + BODY
      ===================================== */

      const { inventoryId } =
        req.params;

      const { quantity } =
        req.body;

      /* =====================================
         VALIDATION
      ===================================== */

      if (!inventoryId) {

        return res.status(400).json({

          success: false,

          message:
            "Inventory ID is required",

        });

      }

      if (

        quantity === undefined ||

        quantity === null

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Quantity is required",

        });

      }

      /* =====================================
         SERVICE
      ===================================== */

      const inventory =

        await updateInventoryQuantityService(

          inventoryId,

          quantity

        );

      /* =====================================
         SUCCESS
      ===================================== */

      return res.status(200).json({

        success: true,

        message:
          "Inventory updated successfully",

        inventory,

      });

    }

    catch (err) {

      console.log(

        "UPDATE INVENTORY CONTROLLER ERROR:",

        err

      );

      return res.status(500).json({

        success: false,

        message:

          err.message ||

          "Failed to update inventory",

      });

    }

  };