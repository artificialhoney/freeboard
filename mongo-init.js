db.createUser(
    {
        user: "freeboard",
        pwd: "unsecure",
        roles: [
            {
                role: "readWrite",
                db: "freeboard"
            }
        ]
    }
);