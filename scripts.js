// اتصال به کیف پول و دریافت آدرس
document.getElementById("connect-wallet").addEventListener("click", async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        const walletAddress = window.tronWeb.defaultAddress.base58;
        document.getElementById("wallet").innerText = walletAddress;

        // فعال کردن دکمه پرداخت
        document.getElementById("pay-20-trx").disabled = false;

        // دریافت موجودی TRX
        const balance = await window.tronWeb.trx.getBalance(walletAddress);
        document.getElementById("balance-value").innerText = (balance / 1e6).toFixed(2);
    } else {
        alert("لطفاً افزونه TronLink را نصب و کیف پول خود را متصل کنید.");
    }
});

// پرداخت 20 TRX
document.getElementById("pay-20-trx").addEventListener("click", async () => {
    const recipient = "آدرس_کیف_پول_شما"; // آدرس کیف پول خودتان
    const amount = 20 * 1e6; // تبدیل TRX به Sun (واحد کوچک ترون)

    try {
        const transaction = await window.tronWeb.trx.sendTransaction(recipient, amount);
        alert(`تراکنش با موفقیت انجام شد!\nTransaction ID: ${transaction.txid}`);
    } catch (error) {
        alert(`خطا در تراکنش: ${error.message}`);
    }
});
