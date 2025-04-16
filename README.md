# Currency Converter

A simple React application that allows users to convert currencies. It fetches the latest exchange rates from an API and displays the converted amount.

## Features

- Converts between different currencies.
- Real-time exchange rates.
- User-friendly interface.
- Uses React Query for efficient data fetching and caching.

## Technologies Used

- React
- React Query (@tanstack/react-query)
- Axios
- Tailwind CSS

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up API Key:**
    - You need an API key from [ExchangeRate-API](https://www.exchangerate-api.com/). Sign up for a free account to get your API key.
    - Create a `.env.local` file in the root of your project.
    - Add your API key to the `.env.local` file:
      ```
      REACT_APP_API_KEY=YOUR_API_KEY
      ```
    - Make sure to update the `constant.js` file to use this environment variable:
      ```javascript
      // src/constant.js
      export const API_KEY = process.env.REACT_APP_API_KEY;
      ```

4.  **Start the application:**
    ```bash
    npm start
    # or
    yarn start
    ```

    This will start the development server, and you can view the application in your browser at `http://localhost:3000`.

## Usage

1.  Enter the amount you want to convert in the input field.
2.  Select the "from" currency from the first dropdown.
3.  Select the "to" currency from the second dropdown.
4.  The converted amount will be displayed below the dropdowns.

## Explanation of the Code

-   **`fetchRates` Function:**
    -   This asynchronous function takes a `fromCurrency` as input.
    -   It constructs the API URL using the provided `API_KEY` and `fromCurrency`.
    -   It uses `axios.get()` to fetch the latest exchange rates from the API.
    -   It returns the `conversion_rates` from the API response.

-   **`CurrencyConverter` Component:**
    -   **`useState`:**
        -   `amount`: Stores the amount to be converted (initialized to 1).
        -   `fromCurrency`: Stores the selected "from" currency (initialized to "USD").
        -   `toCurrency`: Stores the selected "to" currency (initialized to "INR").
    -   **`useQuery`:**
        -   This hook from `@tanstack/react-query` is used to fetch and manage the exchange rates.
        -   `queryKey`: `["exchangeRates", fromCurrency]` - A unique key for caching the query results. The cache will be invalidated and refetched when `fromCurrency` changes.
        -   `queryFn`: `() => fetchRates(fromCurrency)` - The function that performs the API call to fetch the exchange rates.
        -   `staleTime`: `1000 * 60 * 10` - Specifies that the cached data is considered fresh for 10 minutes. After this time, React Query will fetch new data in the background.
        -   `data: rates`: This line renames the `data` property returned by `useQuery` to `rates`. This makes it easier to refer to the exchange rates in the component. **If you don't destructure it as `{ data: rates }`, the exchange rates would be available under the `data` property.**
    -   **Loading and Error Handling:**
        -   `isLoading`: A boolean that is `true` while the data is being fetched.
        -   `error`: An error object if the API call fails.
        -   The component displays "Loading..." while `isLoading` is true and an error message if `error` is not null.
    -   **`convertedAmount`:**
        -   Calculates the converted amount by multiplying the `amount` with the exchange rate of the `toCurrency` from the `rates` object.
        -   `.toFixed(2)` is used to format the converted amount to two decimal places.
        -   If `rates` is not yet available (e.g., during the initial load), it defaults to "N/A".
    -   **JSX:**
        -   Renders the UI with an input field for the amount, two dropdowns for selecting the currencies, and displays the converted amount.
        -   The `Object.keys(rates).map(...)` is used to dynamically generate the options for the currency select dropdowns based on the available exchange rates.

## Notes

-   Ensure that your API key is correctly set up in the `.env.local` file.
-   The `staleTime` can be adjusted based on how frequently you want to fetch new exchange rates.
-   Basic styling using Tailwind CSS has been applied. You can further customize the appearance as needed.
