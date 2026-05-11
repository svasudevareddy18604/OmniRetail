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

      const inventory =

        await assignProductToStoreService(
          req.body
        );

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

      const { storeId } =
        req.params;

      const inventory =

        await getStoreInventoryService(
          storeId
        );

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

      const inventory =

        await getAllInventoryService();

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

      const { inventoryId } =
        req.params;

      const { quantity } =
        req.body;

      const inventory =

        await updateInventoryQuantityService(

          inventoryId,

          quantity

        );

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