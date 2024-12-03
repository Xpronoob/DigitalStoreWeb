import { CartItemsModel } from '@/models/cart-items.model';
import { useCartStore } from '@/states/cartStore.states';
import {
  PayPalScriptProvider,
  usePayPalCardFields,
  PayPalCardFieldsProvider,
  PayPalButtons,
  PayPalCardFieldsForm,
  ReactPayPalScriptOptions
} from '@paypal/react-paypal-js';
import { useState } from 'react';

const Checkout = () => {
  const { items } = useCartStore.getState();
  const [isPaying, setIsPaying] = useState(false);
  const [message, setMessage] = useState('');
  const initialOptions: ReactPayPalScriptOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    // enableFunding: 'venmo',
    // buyerCountry: 'US',
    // currency: 'USD',
    components: 'card-fields,buttons'
  };

  const [billingAddress, setBillingAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    adminArea1: '',
    adminArea2: '',
    countryCode: '',
    postalCode: ''
  });

  function handleBillingAddressChange(field: string, value: string | number) {
    setBillingAddress((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  const cartItems = items.map((item) => ({
    id: item.product_details_id,
    quantity: item.quantity,
    price: item.product_details?.price
  }));

  async function createOrder() {
    try {
      const response = await fetch(
        'http://localhost:3030/api/payments/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // use the "body" param to optionally pass additional order information
          // like product ids and quantities

          body: JSON.stringify({
            cart: cartItems
          })
        }
      );

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      return `Could not initiate PayPal Checkout...${error}`;
    }
  }

  async function onApprove(data: any, actions?: any) {
    try {
      const response = await fetch(
        `http://localhost:3030/api/payments/orders/${data.orderID}/capture`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const transaction =
        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
      const errorDetail = orderData?.details?.[0];

      if (errorDetail || !transaction || transaction.status === 'DECLINED') {
        // (2) Other non-recoverable errors -> Show a failure message
        let errorMessage;
        if (transaction) {
          errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
        } else if (errorDetail) {
          errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
        } else {
          errorMessage = JSON.stringify(orderData);
        }

        throw new Error(errorMessage);
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        console.log(
          'Capture result',
          orderData,
          JSON.stringify(orderData, null, 2)
        );
        return `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`;
      }
    } catch (error) {
      return `Sorry, your transaction could not be processed...${error}`;
    }
  }

  function onError(error: any) {
    // Do something with the error from the SDK
  }

  return (
    <div className='md:flex w-full md:justify-center h-full bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-200'>
      <div className='w-full md:w-1/2'>
        <h4 className='text-2xl flex p-2 items-center justify-center text-yellow-400'>
          Items for purchase
        </h4>
        {items.length > 0 ? (
          items.map((item: CartItemsModel) => (
            <div
              key={item.product_details_id}
              className='p-2 flex items-center justify-evenly'
            >
              <img src={item.product_details?.img} alt='' className='h-24' />
              <p className='px-2'>x{item.quantity}</p>
              <div>
                <p className='px-2'>{item.product_details?.details_name}</p>
                <p className='px-2'>
                  ${item.product_details?.price! * item.quantity}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='p-2 min-w-60'>No items in the cart</div>
        )}
      </div>
      <div className='w-full md:w-1/2 z-0'>
        <div className='bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-200'>
          <div className='w-3/4 mx-auto'>
            <h4 className='text-2xl text-yellow-400 flex justify-center p-2'>
              Payment
            </h4>
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                createOrder={createOrder}
                onApprove={async (data) => setMessage(await onApprove(data))}
                onError={onError}
                style={{
                  shape: 'rect',
                  layout: 'vertical',
                  color: 'gold',
                  label: 'paypal'
                }}
              />

              <PayPalCardFieldsProvider
                createOrder={createOrder}
                onApprove={async (data) => setMessage(await onApprove(data))}
                onError={onError}
              >
                <PayPalCardFieldsForm />
                <input
                  type='text'
                  id='card-billing-address-line-1'
                  name='card-billing-address-line-1'
                  placeholder='Address line 1'
                  onChange={(e) =>
                    handleBillingAddressChange('addressLine1', e.target.value)
                  }
                />
                <input
                  type='text'
                  id='card-billing-address-line-2'
                  name='card-billing-address-line-2'
                  placeholder='Address line 2'
                  onChange={(e) =>
                    handleBillingAddressChange('addressLine2', e.target.value)
                  }
                />
                <input
                  type='text'
                  id='card-billing-address-admin-area-line-1'
                  name='card-billing-address-admin-area-line-1'
                  placeholder='Admin area line 1'
                  onChange={(e) =>
                    handleBillingAddressChange('adminArea1', e.target.value)
                  }
                />
                <input
                  type='text'
                  id='card-billing-address-admin-area-line-2'
                  name='card-billing-address-admin-area-line-2'
                  placeholder='Admin area line 2'
                  onChange={(e) =>
                    handleBillingAddressChange('adminArea2', e.target.value)
                  }
                />
                <input
                  type='text'
                  id='card-billing-address-country-code'
                  name='card-billing-address-country-code'
                  placeholder='Country code'
                  onChange={(e) =>
                    handleBillingAddressChange('countryCode', e.target.value)
                  }
                />
                <input
                  type='text'
                  id='card-billing-address-postal-code'
                  name='card-billing-address-postal-code'
                  placeholder='Postal/zip code'
                  onChange={(e) =>
                    handleBillingAddressChange('postalCode', e.target.value)
                  }
                />
                {/* Custom client component to handle card fields submission */}
                <SubmitPayment
                  isPaying={isPaying}
                  setIsPaying={setIsPaying}
                  billingAddress={billingAddress}
                />
              </PayPalCardFieldsProvider>
            </PayPalScriptProvider>
          </div>
        </div>
        <Message content={message} />
      </div>
    </div>
  );
};

const SubmitPayment = ({ isPaying, setIsPaying, billingAddress }: any) => {
  const { cardFieldsForm, fields } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        'Unable to find any child components in the <PayPalCardFieldsProvider />';

      throw new Error(childErrorMessage);
    }
    const formState = await cardFieldsForm.getState();

    if (!formState.isFormValid) {
      return alert('The payment form is invalid');
    }
    setIsPaying(true);

    // cardFieldsForm.submit({ billingAddress }).finally((err) => {
    //   setIsPaying(false);
    // });

    cardFieldsForm.submit().finally(() => {
      setIsPaying(false);
    });
  };

  return (
    <button
      className={isPaying ? 'btn' : 'btn btn-primary'}
      onClick={handleClick}
    >
      {isPaying ? <div className='spinner tiny' /> : 'Pay'}
    </button>
  );
};

const Message = ({ content }: any) => {
  return <p>{content}</p>;
};

export default Checkout;
