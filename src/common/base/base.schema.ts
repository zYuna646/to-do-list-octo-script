import { Schema } from 'mongoose';
export class BaseSchema extends Schema {
  constructor(schemaDefinition: object, populateDefinition: any = {}) {
    const baseSchemaDefinition = {
      ...schemaDefinition,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    };
    const schemaOptions = {
      timestamps: true, // Enables createdAt and updatedAt fields automatically
      toObject: { virtuals: true },
      toJSON: { virtuals: true },
    };
    super(baseSchemaDefinition, schemaOptions);

    this.methods.toJSON = function () {
      const obj = this.toObject();
      delete obj.__v;
      return obj;
    };

    this.pre('findOne', function (next) {
      if (Object.keys(populateDefinition).length > 0) {
        this.populate(populateDefinition);
      }
      next();
    });
    this.pre('save', function (next) {
      this.updatedAt = new Date();

      next();
    });
  }
}
