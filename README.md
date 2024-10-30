<p align="center">
<img width="400" valign="top" src="https://hydrogenpay.com/wp-content/uploads/2023/05/logo.png" data-canonical-src="https://hydrogenpay.com/wp-content/uploads/2023/05/logo.png" style="max-width:100%; ">
</p>
<br/>

# Hydrogen Svelte SDK

Hydrogen Svelte SDK allows you to accept payment using in your svelte application

## Installation

Register for a merchant account on [Hydrogen Merchant Dashboard](https://dashboard.hydrogenpay.com) to get started.

```bash
npm install --save hydrogenpay-svelte
```

```bash
yarn add hydrogenpay-svelte
```

```bash
pnpm add hydrogenpay-svelte
```

## Support

If you have any problems, questions or suggestions, create an issue here or send your inquiry to support@hydrogenpay.com

## Implementation

You should already have your api key, If not, go to [Profile & Settings](https://dashboard.hydrogenpay.com).

### Usage 

```jsx
<script>
	import HydrogenPay from 'hydrogenpay-svelte';
</script>

<main>
	<HydrogenPay
		amount={500}
		email="test@mail.com"
		customerName="John Doe"
		meta="ewr34we4w"
		apiKey="PK_TEST_cca53e0b3bc7847aff94502b8a585f84"
		description="Test description"
		currency="NGN"
		frequency={1}
		isRecurring={false}
		endDate="2025-10-02"
		buttonText="Pay With Hydrogen"
		onSuccess={(response, closeModal) => {
			console.log(response);

			setTimeout(() => closeModal(), 3000);
		}}
		onClose={(close) => {
			console.log(close);
		}}
		buttonStyle={{
			style:
				'padding-top: 10px; padding-bottom: 10px; width: 50%; border-radius: 8px; color: #000; font-size: 10px',
		}}
	/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
</style>
```

## Options Type

| Name         | Type       | Required | Desc                                                                        |
| ------------ | ---------- | -------- | --------------------------------------------------------------------------- |
| currency     | `String`   | Required | The currency for the transaction e.g NGN, USD                               |
| email        | `String`   | Required | The email of the user to be charged                                         |
| description  | `String`   | Optional | The transaction description                                                 |
| customerName | `String`   | Required | The fullname of the user to be charged                                      |
| amount       | `Number`   | Required | The transaction amount                                                      |
| apiKey       | `String`   | Required | Your LIVE or TEST apiKey or see above step to get yours                                   |
| onSuccess    | `Function` | Optional | Callback when transaction is successful                                     |
| onClose      | `Function` | Optional | Callback when transaction is closed of cancel                               |
| buttonText   | `String`   | Optional | Payment Button Text. Default: Hydrogen Pay                                  |
| buttonStyle  | `Object`   | Optional | Styling Object                                                   |
| isRecurring  | `boolean`  | Optional | Recurring Payment                                                           |
| frequency    | `String`   | Optional | Recurring Payment frequency                                                 |
| endDate      | `String`   | Optional | Recurring Payment End Date. OPTIONAL but (REQUIRED when isRecurring = true) |