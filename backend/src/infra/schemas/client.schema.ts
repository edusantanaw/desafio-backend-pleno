import { Model } from "mongoose";
import { Client } from "../../domain/entities/client.entity";
import mongoose from "../../main/config/db";

const { Schema } = mongoose!;

const Client = new Schema<Client, Model<Client>>({
  id: {
    type: "String",
    required: true,
    unique: true,
    _id: true,
    immutable: true,
  },
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  phone: {
    type: "String",
    required: true,
  },
  deleted: {
    type: Number,
    required: false,
    default: 0,
  },
  address: {
    cep: {
      type: "String",
      required: true,
      maxlength: 8,
    },
    state: {
      type: "String",
      required: true,
      maxlength: 2,
    },
    city: {
      type: "String",
      maxlength: 255,
    },
    neighborhood: {
      type: "String",
      maxlength: 255,
    },
    street: {
      type: "String",
      maxlength: 255,
    },
  },
});

export default mongoose!.model("Client", Client);
