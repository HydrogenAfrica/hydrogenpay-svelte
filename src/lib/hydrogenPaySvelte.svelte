<script>
	export let apiKey;
	export let currency;
	export let amount;
	export let email;
	export let description;
	export let customerName;
	export let onSuccess;
	export let onClose;
	export let frequency;
	export let meta;
	export let isRecurring;
	export let buttonText;
	export let buttonStyle;
	export let endDate;

	async function hydrogenPay() {
		let checkStatus;
		const getRef = handlePgData(
			{
				currency,
				amount,
				email,
				description,
				customerName,
				meta,
				frequency,
				isAPI: false,
				...(isRecurring && endDate ? { endDate } : {}),
			},
			apiKey,
			(e) => {
				onClose && onClose(e);
				clearInterval(checkStatus);
			}
		);


		//get payment reference
		const transactionRef = await getRef;

		if (transactionRef && transactionRef !== 'Error in initiating payment') {
			checkStatus = setInterval(async function () {
				const checkPaymentStatus = await window.handlePaymentStatus(
					transactionRef,
					apiKey
				);

				if (checkPaymentStatus.status === 'Paid') {
					onSuccess &&
						onSuccess(checkPaymentStatus, () =>
							window.closeModal({ transactionRef })
						);
					clearInterval(checkStatus);
				}
			}, 2000);
		} else {
			console.error(`ERROR: ${transactionRef}`);
		}
	}
</script>

<svelte:head>
	<title>HydrogenPay</title>
	<script
		src="https://hydrogenshared.blob.core.windows.net/paymentgateway/paymentGatewayIntegration_v1PROD.js"
	></script>
</svelte:head>

<body>
	<button class="btn-hydrogen" {...buttonStyle} on:click={hydrogenPay}
		>{buttonText}</button
	>
</body>

<style>
	.btn-hydrogen {
		cursor: pointer;
		transition: background-color 0.3s ease;
	}
</style>
