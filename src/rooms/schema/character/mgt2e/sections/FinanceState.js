import { Schema } from '@colyseus/schema';
import * as schema from "@colyseus/schema";

class Finances extends Schema {
  constructor() {
    super();
    this.MonthlyShipPayments = 0;
    this.ShipDebt = 0;
    this.OtherDebt = 0;
    this.MonthlyPension = 0;
    this.CashOnHand = 0;
    this.MonthlyLivingCost = 0;
  }
}

schema.defineTypes(Finances, {
  MonthlyShipPayments: "number",
  ShipDebt: "number",
  OtherDebt: "number",
  MonthlyPension: "number",
  CashOnHand: "number",
  MonthlyLivingCost: "number",
});

export { Finances };
