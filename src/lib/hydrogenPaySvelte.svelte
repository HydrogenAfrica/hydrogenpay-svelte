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
	export let transactionRef;
	export let metaData;

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
				...(transactionRef ? { transactionRef } : {}),
				...(metaData ? { metaData } : {})
			},
			apiKey,
			(e) => {
				onClose && onClose(e);
				clearInterval(checkStatus);
			}
		);


		//get payment reference
		const getTransactionRef = await getRef;

		if (getTransactionRef && getTransactionRef !== 'Error in initiating payment') {
			checkStatus = setInterval(async function () {
				const checkPaymentStatus = await window.handlePaymentStatus(
					getTransactionRef,
					apiKey
				);

				if (checkPaymentStatus.status === 'Paid') {
					onSuccess &&
						onSuccess(checkPaymentStatus, () =>
							window.closeModal({ getTransactionRef })
						);
					clearInterval(checkStatus);
				}
			}, 2000);
		} else {
			console.error(`ERROR: ${getTransactionRef}`);
		}
	}
</script>

<svelte:head>
	<title>HydrogenPay</title>
	<script
		src="https://js.hydrogenpay.com/inline.js"
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
