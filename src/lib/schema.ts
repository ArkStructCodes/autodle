import {
  Array,
  Literal,
  Integer,
  Object,
  String,
  Union,
  type Static,
} from "@sinclair/typebox";

const carSchema = Object({
  country: String(),
  make: String(),
  year: Integer(),
  name: String(),
  drivetrain: Union([Literal("FWD"), Literal("RWD"), Literal("AWD")]),
  power: Integer(),
  weight: Integer(),
});

export type Car = Static<typeof carSchema>;

export const carsSchema = Array(carSchema);
