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
