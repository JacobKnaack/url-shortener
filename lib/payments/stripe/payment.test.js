const { createPayment } = require('./stripe');

// beforeAll(() => {
  
// })

describe('Stripe payment API', () => {
  xtest('Should be able to create payment to stripe account', async () => {
    let intent = await createPayment(1000);
    expect(intent.amount).toEqual(1000);
  });
});