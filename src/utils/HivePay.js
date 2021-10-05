export default class HivePay {
  constructor(merchant) {
    this.merchant = merchant;
  }

  setItemName(name) {
    this.itemName = name;
    return this;
  }

  setItemDescription(description) {
    this.itemDescription = description;
    return this;
  }

  setNotifyUrl(url) {
    this.notifyUrl = url;
    return this;
  }

  setReturnUrl(url) {
    this.returnUrl = url;
    return this;
  }

  setAmount(amount) {
    this.amount = amount;
    return this;
  }

  setBaseCurrency(currency = "USD") {
    this.baseCurrency = currency;
    return this;
  }

  setMerchant_email(merchant_email) {
    this.merchant_email = merchant_email;
    return this;
  }

  setPayCurrencies(currencies) {
    this.payCurrency = Array.isArray(currencies)
      ? currencies.join(",")
      : currencies;
    return this;
  }

  submit() {
    const form = document.createElement("form");
    form.style.display = "none";
    form.method = "POST";
    form.action = "https://hivepay.io/purchase/";

    const merchant = document.createElement("input");
    merchant.type = "hidden";
    merchant.name = "merchant";
    merchant.value = this.merchant;
    form.appendChild(merchant);

    const itemName = document.createElement("input");
    itemName.type = "hidden";
    itemName.name = "item_name";
    itemName.value = this.itemName;
    form.appendChild(itemName);

    const itemDescription = document.createElement("input");
    itemDescription.type = "hidden";
    itemDescription.name = "description";
    itemDescription.value = this.itemDescription;
    form.appendChild(itemDescription);

    const notifyUrl = document.createElement("input");
    notifyUrl.type = "hidden";
    notifyUrl.name = "notify_url";
    notifyUrl.value = this.notifyUrl;
    form.appendChild(notifyUrl);

    const returnUrl = document.createElement("input");
    returnUrl.type = "hidden";
    returnUrl.name = "return_url";
    returnUrl.value = this.returnUrl;
    form.appendChild(returnUrl);

    const amount = document.createElement("input");
    amount.type = "hidden";
    amount.name = "amount";
    amount.value = this.amount;
    form.appendChild(amount);

    const baseCurrency = document.createElement("input");
    baseCurrency.type = "hidden";
    baseCurrency.name = "base_currency";
    baseCurrency.value = this.baseCurrency;
    form.appendChild(baseCurrency);

    const payCurrencies = document.createElement("input");
    payCurrencies.type = "hidden";
    payCurrencies.name = "pay_currency";
    payCurrencies.value = this.payCurrency;
    form.appendChild(payCurrencies);

    const merchant_email = document.createElement("input");
    merchant_email.type = "hidden";
    merchant_email.name = "merchant_email";
    merchant_email.value = this.merchant_email;
    form.appendChild(merchant_email);

    document.children[0].appendChild(form);
    form.submit();
  }
}
