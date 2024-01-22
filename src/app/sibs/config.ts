export const SibsPaymentUrl =
  "https://api.qly.sibspayments.com/sibs/spg/v2/payments";

export type PaymentMethod = "CARD" | "MBWAY" | "REFERENCE";

export type SibsFormData = {
  value: number;
  orderId: string;
  paymentMethods: PaymentMethod[];
};
