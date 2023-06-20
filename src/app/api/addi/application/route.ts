import axios from "axios";
import { NextResponse } from "next/server";

const ADDI_API_TEST_URL = "https://api.addi-staging.com";

export async function POST(request: Request) {
  const body = await request.json();

  const { totalAmount, orderId } = body;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/addi/token`
    );
    const { access_token } = response.data.data as any;

    // change todo
    const body = {
      orderId,
      totalAmount,
      shippingAmount: 0,
      currency: "COP", // only supported COP
      items: [
        {
          sku: "PD-122354",
          name: "product name",
          quantity: "5",
          unitPrice: 9950,
          tax: 9950,
          pictureUrl: "https://picture.example.com/?img=test",
          category: "technology",
          brand: "adidas",
        },
      ],
      suppliers: [
        {
          supplierName: "Mundial",
          slugName: "mundial-pamii",
          shippingAmount: "1000",
          totalAmount: "25200",
          fee: "200",
          tax: "9950",
          items: [
            {
              sku: "PD-122354",
              name: "product name",
              quantity: "5",
              unitPrice: 9950,
              tax: 9950,
              pictureUrl: "https://picture.example.com/?img=test",
              category: "technology",
              brand: "adidas",
            },
          ],
        },
      ],
      client: {
        idType: "CC",
        idNumber: "354125896",
        firstName: "marcela griselda",
        lastName: "Lopez Lopez",
        email: "addi-client@online.com",
        cellphone: "3211236584",
        cellphoneCountryCode: "+57",
        address: {
          lineOne: "cr 48 156 25 25",
          city: "Bogotá D.C",
          country: "CO",
        },
      },
      allyUrlRedirection: {
        logoUrl:
          "https://st4.depositphotos.com/6375600/27351/i/950/depositphotos_273512584-stock-photo-watercolor-painting-of-a-white.jpg",
        useCallbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/addi/callback`,
        redirectionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      },
      // optional
      // totalTaxesAmount: 0,
      // shippingAddress: {},
      // billingAddress: {},
      // pickUpAddress: {},
      // geoLocation: {}
    };

    if (!access_token) return;

    try {
      const { data } = await axios.post(
        `${ADDI_API_TEST_URL}/v2/online-applications`,
        {
          body,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return NextResponse.json({});
    } catch (error) {
      if (error) return NextResponse.json({ error });
    }
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
