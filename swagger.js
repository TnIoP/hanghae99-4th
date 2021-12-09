const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Together",
    description: "- mini project API overview",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./app.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);