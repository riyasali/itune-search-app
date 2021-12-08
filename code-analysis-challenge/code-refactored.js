
export const inviteUser = async (req, res) => {
    const invitationBody = req.body;
    const shopId = req.params.shopId;
    const authUrl = "https://url.to.auth.system.com/invitation";
    try {
        const invitationResponse = await superagent
            .post(authUrl)
            .send(invitationBody);
        if (invitationResponse.status === 200) {
            res.status(400).json({
                error: true,
                message: 'User already invited to this shop'
            });
            return;
        } else if (invitationResponse.status === 201) {
            const createdUser = await createUser(invitationResponse);
            if (!createdUser) {
                return res.status(500).send({ message: 'User not created' });
            }
            const shop = await findShop(createdUser, shopId, res);
        }
        res.json(invitationResponse);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." })
    }
};

const createUser = async (invitationResponse) => {
    try {
        return await User.findOneAndUpdate({
            authId: invitationResponse.body.authId
        }, {
            $set: {
                authId: invitationResponse.body.authId,
                email: invitationBody.email
            }
        }, {
            upsert: true,
            new: true
        });
    } catch (error) {
        throw new Error(error);
    }
};
const findShop = async (createdUser, shopId, res) => {
    try {
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(500).send(err || { message: 'No shop found' });
        }
        if (shop.invitations.indexOf(invitationResponse.body.invitationId) !== -1) {
            shop.invitations.push(invitationResponse.body.invitationId);
        }
        if (shop.users.indexOf(createdUser._id) === -1) {
            shop.users.push(createdUser);
        }
        const updateShop = await shop.save();
        return updateShop;
    } catch (error) {
        throw new Error(error);
    }
}
