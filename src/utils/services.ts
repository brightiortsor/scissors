// import axios from "axios";

// const Base_Url = process.env.NEXT_PUBLIC_BITLY_URL;
// const Access_Token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

// // Function to shorten a URL using Bitly API
// export async function shortenUrl(longUrl: string): Promise<string> {
//   try {
//     const response = await axios.post(
//       `${Base_Url}`,
//       {
//         long_url: longUrl,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${Access_Token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Extract the shortened URL from the response
//     const shortUrl = response.data.link;

//     return shortUrl;
//   } catch (error) {
//     console.error("URL shortening error:", error);
//     // Handle error gracefully
//     throw error;
//   }
// }
import axios from "axios";

const BASE_URL = "https://api-ssl.bitly.com/v4";
const ACCESS_TOKEN = "44ec1badb674cf7364e1317ab3db5884d4a9d397";

// Function to shorten a URL using Bitly API
export async function shortenUrl(longUrl: string): Promise<string> {
  try {
    const response = await axios.post(
      `${BASE_URL}/shorten`,
      {
        long_url: longUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the shortened URL from the response
    const shortUrl = response.data.link;

    return shortUrl;
  } catch (error) {
    console.error("URL shortening error:", error);
    // Handle error gracefully
    throw error;
  }
}
