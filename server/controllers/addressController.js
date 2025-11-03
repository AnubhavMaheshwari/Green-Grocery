// Add address   /api/address/add

import Address from "../models/Address.js"

export const addAddress = async (req, res) => {
    try {
        const userId = req.userId; // <-- fix here
        const { address } = req.body  // we only get address

        await Address.create({ ...address, userId })

        res.json({ success: true, message: "Address added successfully" })
    } catch (error) {
        console.error("Address error:", error.message)
        res.json({ success: false, message: "Something went wrong" })
    }
}


// get address   /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.userId; // <-- fix here
        const addresses = await Address.find({ userId })
        res.json({ success: true, addresses })
    } catch (error) {
        console.error("Addresses error:", error.message)
        res.json({ success: false, message: "Something went wrong" })
    }
}
