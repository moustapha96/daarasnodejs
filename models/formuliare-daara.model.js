const mongoose = require("mongoose");
const { isEmail } = require("validator");

const subSchemaMenu = new mongoose.Schema({
  title: String,
  routerLink: String,
  href: String,
  icon: String,
  target: String,
  enable: String,
  hasSubMenu: Boolean,
  parentId: String,
});

const subSchemaOption = new mongoose.Schema({
  min_date: {
    type: Date,
  },
  max_date: {
    type: Date,
  },
  min_number: Number,
  max_number: Number,
  tables: String,
  datas: [],
  enum_list: [String],
  step: Number,
  checkbox_list: [String],
});

const subSchemaFilterOption = new mongoose.Schema({
  min: {
    type: String,
  },
  max: {
    type: String,
  },
  tableReference: {
    type: String,
  },
  type: {
    type: String,
  },
});
const subSchemaCalculateOption = new mongoose.Schema({
  operateur: {
    type: String,
  },
  champs: {
    type: [String],
  },
  formule: {
    type: String,
  },
});
const subSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  label: {
    type: String,
  },
  key: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  value: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
  pattern: {
    type: String,
    default: "[A-Za-z]{3}",
  },
  filter: {
    type: Boolean,
    default: false,
  },
  optionCaulculate: subSchemaCalculateOption,
  optionFilter: subSchemaFilterOption,
  options: subSchemaOption,
});

const subSchemaModule = new mongoose.Schema({
  title: String,
  fields: [subSchema],
});

const formulaireDaaraSchema = new mongoose.Schema(
  {
    title: String,
    logo: String,
    label: String,
    description: String,
    menu: [subSchemaMenu],
    section: [subSchemaModule],
  },
  { timestamps: true }
);

const FormulaireDaaraModel = mongoose.model(
  "formsdaaras",
  formulaireDaaraSchema
);
module.exports = FormulaireDaaraModel;
