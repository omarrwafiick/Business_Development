const strip = require('strip')(process.env.STRIP_PRIVATE_KEY);

const paymentViaStrip = async (req) => {
    return await strip.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: req.body.services.map(service => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: service.name
                    },
                    unit_amount: service.amount
                },
                quantity: 1
            }
        }),
        success_url: process.env.SUCCESS_PAYMENT_URL,
        cancel_url: process.env.CANCEL_PAYMENT_URL
    }); 
};

module.exports = paymentViaStrip;
