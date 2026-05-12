import mongoose from "mongoose";

/* =========================================
   ORDER ITEM SCHEMA
========================================= */

const orderItemSchema = new mongoose.Schema({

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  inventoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoreInventory",
  },

  name: {
    type: String,
    required: true,
  },

  sku: {
    type: String,
    default: "",
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  subtotal: {
    type: Number,
    required: true,
  },

});

/* =========================================
   ORDER SCHEMA
========================================= */

const orderSchema = new mongoose.Schema(

  {

    /* =====================================
       ORDER NUMBER
    ===================================== */

    orderNumber: {
      type: String,
      unique: true,
    },

    /* =====================================
       ITEMS
    ===================================== */

    items: [orderItemSchema],

    itemsCount: {
      type: Number,
      default: 0,
    },

    /* =====================================
       BILLING
    ===================================== */

    subtotal: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    /* =====================================
       PAYMENT
    ===================================== */

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Online", "Other"],
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Failed", "Refunded"],
      default: "Paid",
    },

    /* =====================================
       ORDER STATUS  <-- WAS MISSING
    ===================================== */

    orderStatus: {
      type: String,
      enum: ["Completed", "Pending", "Cancelled", "Refunded"],
      default: "Completed",
    },

    /* =====================================
       CASHIER  <-- cashierId WAS MISSING
    ===================================== */

    cashierName: {
      type: String,
      default: "Cashier",
    },

    cashierId: {
      type: String,
      default: "N/A",
    },

    /* =====================================
       STORE  <-- BOTH WERE MISSING
    ===================================== */

    storeId: {
      type: String,
      default: "",
    },

    storeName: {
      type: String,
      default: "Main Store",
    },

    /* =====================================
       NOTES
    ===================================== */

    notes: {
      type: String,
      default: "",
    },

  },

  {
    timestamps: true,
  }

);

/* =========================================
   AUTO-GENERATE ORDER NUMBER
========================================= */

orderSchema.pre("save", async function (next) {

  if (!this.orderNumber) {

    const random = Math.floor(
      100000 + Math.random() * 900000
    );

    this.orderNumber = "ORD-" + random;

  }

  next();

});

/* =========================================
   EXPORT
========================================= */

const Order = mongoose.model("Order", orderSchema);

export default Order;