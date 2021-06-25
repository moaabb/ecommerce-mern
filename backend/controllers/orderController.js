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

// @desc Get logged in users orders
// @Route GET /api/orders/myorders
// @access Private

export const getUserOrders = async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
}

// @desc Get all Orders
// @Route PUT /api/orders/myorders
// @access Private/admin

export const listOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
}

// @desc Update order to delivered
// @Route PUT /api/orders/:id/deliver
// @access Private/admin

export const updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404).json({error: 'Order not found'})
    }
}

