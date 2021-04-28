import Order from '../models/orderModel.js'


// @desc Create a new Order
// @Route POST /api/orders
// @access Private

export const addOrderItems = async (req, res) => {
    const { 
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
     } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        res.json({error: "erro parça"})
        return
    } else {
        
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
}

// @desc Get order by ID endpoint
// @Route GET /api/orders/:id
// @access Private

export const getOrderByID = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')


    if (order) {
        res.json(order)
    } else {
        res.status(404).json({error: 'Order not found'})
    }

}

// @desc Update order to paid
// @Route PUT /api/orders/:id/pay
// @access Private

export const updateOrderToPaid = async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.params.id,
            status: req.params.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404).json({error: 'Order not found'})
    }

}
