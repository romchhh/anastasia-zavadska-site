/**
 * Клієнтський POST на сторінку оплати WayForPay (як у вашій робочій схемі).
 */

export type WayForPayFormData = {
  merchantAccount: string;
  merchantAuthType: string;
  merchantDomainName: string;
  merchantSignature: string;
  orderReference: string;
  orderDate: number;
  amount: string;
  currency: string;
  productName: string[];
  productCount: number[];
  productPrice: string[];
  language: string;
  returnUrl: string;
  serviceUrl: string;
  clientFirstName?: string;
  clientLastName?: string;
  clientPhone?: string;
  clientEmail?: string;
};

const PAY_URL = 'https://secure.wayforpay.com/pay';

function appendHidden(form: HTMLFormElement, name: string, value: string) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

export function submitWayForPayForm(data: WayForPayFormData): void {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = PAY_URL;
  form.acceptCharset = 'UTF-8';

  appendHidden(form, 'merchantAccount', data.merchantAccount);
  appendHidden(form, 'merchantAuthType', data.merchantAuthType);
  appendHidden(form, 'merchantDomainName', data.merchantDomainName);
  appendHidden(form, 'merchantSignature', data.merchantSignature);
  appendHidden(form, 'orderReference', data.orderReference);
  appendHidden(form, 'orderDate', String(data.orderDate));
  appendHidden(form, 'amount', data.amount);
  appendHidden(form, 'currency', data.currency);
  appendHidden(form, 'language', data.language);
  appendHidden(form, 'returnUrl', data.returnUrl);
  appendHidden(form, 'serviceUrl', data.serviceUrl);

  data.productName.forEach((v) => appendHidden(form, 'productName[]', v));
  data.productCount.forEach((v) => appendHidden(form, 'productCount[]', String(v)));
  data.productPrice.forEach((v) => appendHidden(form, 'productPrice[]', v));

  if (data.clientFirstName) appendHidden(form, 'clientFirstName', data.clientFirstName);
  if (data.clientLastName) appendHidden(form, 'clientLastName', data.clientLastName);
  if (data.clientPhone) appendHidden(form, 'clientPhone', data.clientPhone);
  if (data.clientEmail) appendHidden(form, 'clientEmail', data.clientEmail);

  document.body.appendChild(form);
  form.submit();
}
