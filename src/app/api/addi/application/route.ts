import axios from "axios";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

const ADDI_API_TEST_URL = "https://api.addi-staging.com";

export async function POST(request: Request, res: NextApiResponse) {
  const body = await request.json();

  const { totalAmount, orderId } = body;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/addi/token`
    );
    const { access_token } = response.data.data as any;

    // change todo
    // const body = {
    //   orderId,
    //   totalAmount: "100000",
    //   shippingAmount: "500",
    //   currency: "COP", // only supported COP
    //   items: [
    //     {
    //       sku: "PD-122354",
    //       name: "product name",
    //       quantity: "5",
    //       unitPrice: 9950,
    //       tax: 9950,
    //       pictureUrl: "https://picture.example.com/?img=test",
    //       category: "technology",
    //       brand: "adidas",
    //     },
    //   ],
    //   client: {
    //     idType: "CC",
    //     idNumber: "354125896",
    //     firstName: "marcela griselda",
    //     lastName: "Lopez Lopez",
    //     email: "addi-client@online.com",
    //     cellphone: "3211236584",
    //     cellphoneCountryCode: "+57",
    //     address: {
    //       lineOne: "cr 48 156 25 25",
    //       city: "Bogotá D.C",
    //       country: "CO",
    //     },
    //   },
    //   allyUrlRedirection: {
    //     logoUrl:
    //       "https://st4.depositphotos.com/6375600/27351/i/950/depositphotos_273512584-stock-photo-watercolor-painting-of-a-white.jpg",
    //     useCallbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/addi/callback`,
    //     redirectionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    //   },
    // };

    const body = {
      orderId: "8ujf387a5-ecc6-4324-8b78-ac27c952c737",
      totalAmount: "255000.0",
      shippingAmount: "50000.0",
      totalTaxesAmount: "100000.0",
      currency: "COP",
      items: [
        {
          sku: "PD-122354",
          name: "product name",
          quantity: "5",
          unitPrice: "9950",
          tax: "9950",
          pictureUrl: "https://picture.example.com/?img=test",
          category: "technology",
          brand: "adidas",
        },
      ],
      client: {
        idType: "CC",
        idNumber: "354125896",
        firstName: "Paulo",
        lastName: "cano",
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
        logoUrl: "https://picture.example.com/?img=test",
        callbackUrl: "https://ally.callback.url/callback/example",
        redirectionUrl: "https://redirection.example.com/",
      },
    };

    if (!access_token) return;

    let location = null;
    await axios
      .post(`${ADDI_API_TEST_URL}/v1/online-applications`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        maxRedirects: 0,
      })
      .then((response) => {
        return NextResponse.json({});
      })
      .catch((err) => {
        const { response } = err;
        const { headers } = response;

        location = headers.location;
      });

    return NextResponse.json({ location });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
