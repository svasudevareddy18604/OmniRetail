import Store from "../models/store.model.js";

/* =========================================
   GET ALL STORES
========================================= */

export const getAllStores =

  async () => {

    try {

      const stores =

        await Store.find()

        .sort({

          createdAt: -1

        });

      return stores;

    }

    catch (err) {

      console.log(

        "GET ALL STORES SERVICE ERROR:",

        err

      );

      throw err;

    }

  };

/* =========================================
   GET STORE BY ID
========================================= */

export const getStoreById =

  async (id) => {

    try {

      /* =====================================
         VALIDATION
      ===================================== */

      if (!id) {

        throw new Error(

          "Store ID is required"

        );

      }

      /* =====================================
         FIND STORE
      ===================================== */

      const store =

        await Store.findById(id);

      /* =====================================
         NOT FOUND
      ===================================== */

      if (!store) {

        throw new Error(

          "Store not found"

        );

      }

      return store;

    }

    catch (err) {

      console.log(

        "GET STORE BY ID ERROR:",

        err

      );

      throw err;

    }

  };

/* =========================================
   GENERATE STORE CODE
========================================= */

const generateStoreCode =

  async () => {

    try {

      /* =====================================
         LAST STORE
      ===================================== */

      const lastStore =

        await Store.findOne()

        .sort({

          createdAt: -1

        });

      let nextNumber = 1;

      /* =====================================
         EXTRACT NUMBER
      ===================================== */

      if (

        lastStore &&

        lastStore.store_code

      ) {

        const number = parseInt(

          lastStore.store_code
            .replace("STR", "")

        );

        if (!isNaN(number)) {

          nextNumber = number + 1;

        }

      }

      /* =====================================
         RETURN CODE
      ===================================== */

      return `STR${String(

        nextNumber

      ).padStart(3, "0")}`;

    }

    catch (err) {

      console.log(

        "GENERATE STORE CODE ERROR:",

        err

      );

      throw err;

    }

  };

/* =========================================
   CREATE STORE
========================================= */

export const createStore =

  async (data) => {

    try {

      /* =====================================
         VALIDATION
      ===================================== */

      if (

        !data.name ||

        !data.location ||

        !data.address ||

        !data.pincode

      ) {

        throw new Error(

          "All required fields must be filled"

        );

      }

      /* =====================================
         GENERATE CODE
      ===================================== */

      const store_code =

        await generateStoreCode();

      /* =====================================
         CREATE STORE
      ===================================== */

      const store =

        await Store.create({

          store_code,

          name:
            data.name,

          location:
            data.location,

          address:
            data.address,

          pincode:
            data.pincode,

          state:
            data.state ||

            "",

          isActive:
            true,

        });

      return store;

    }

    catch (err) {

      console.log(

        "CREATE STORE SERVICE ERROR:",

        err

      );

      throw err;

    }

  };

/* =========================================
   UPDATE STORE
========================================= */

export const updateStoreById =

  async (id, data) => {

    try {

      /* =====================================
         VALIDATION
      ===================================== */

      if (!id) {

        throw new Error(

          "Store ID is required"

        );

      }

      /* =====================================
         UPDATE
      ===================================== */

      const updatedStore =

        await Store.findByIdAndUpdate(

          id,

          {

            name:
              data.name,

            location:
              data.location,

            address:
              data.address,

            pincode:
              data.pincode,

            state:
              data.state,

            isActive:
              data.isActive,

          },

          {

            new: true,

            runValidators: true,

          }

        );

      /* =====================================
         NOT FOUND
      ===================================== */

      if (!updatedStore) {

        throw new Error(

          "Store not found"

        );

      }

      return updatedStore;

    }

    catch (err) {

      console.log(

        "UPDATE STORE SERVICE ERROR:",

        err

      );

      throw err;

    }

  };

/* =========================================
   DELETE STORE
========================================= */

export const deleteStoreById =

  async (id) => {

    try {

      /* =====================================
         VALIDATION
      ===================================== */

      if (!id) {

        throw new Error(

          "Store ID is required"

        );

      }

      /* =====================================
         DELETE
      ===================================== */

      const deletedStore =

        await Store.findByIdAndDelete(

          id

        );

      /* =====================================
         NOT FOUND
      ===================================== */

      if (!deletedStore) {

        throw new Error(

          "Store not found"

        );

      }

      return {

        success: true,

        message:
          "Store deleted successfully",

      };

    }

    catch (err) {

      console.log(

        "DELETE STORE SERVICE ERROR:",

        err

      );

      throw err;

    }

  };