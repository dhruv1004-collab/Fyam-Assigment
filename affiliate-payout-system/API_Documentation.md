# API Documentation

## Base URL

```
http://localhost:5000
```

---

# 1. Create User

Creates a new affiliate user.

**Method**

```
POST
```

**Endpoint**

```
/api/users
```

### Request Body

```json
{
    "username": "john_doe"
}
```

### Success Response

```json
{
    "success": true,
    "data": {
        "_id": "USER_ID",
        "username": "john_doe",
        "withdrawableBalance": 0
    }
}
```

---

# 2. Get User Balance

Returns the current withdrawable balance of a user.

**Method**

```
GET
```

**Endpoint**

```
/api/users/:id/balance
```

### Example

```
GET /api/users/USER_ID/balance
```

### Success Response

```json
{
    "success": true,
    "withdrawableBalance": 0
}
```

---

# 3. Create Sale

Creates a new affiliate sale.

**Method**

```
POST
```

**Endpoint**

```
/api/sales
```

### Request Body

```json
{
    "userId": "USER_ID",
    "brand": "Amazon",
    "earning": 500
}
```

### Success Response

```json
{
    "success": true,
    "data": {
        "_id": "SALE_ID",
        "brand": "Amazon",
        "earning": 500,
        "status": "pending"
    }
}
```

---

# 4. Get All Sales

Returns all recorded sales.

**Method**

```
GET
```

**Endpoint**

```
/api/sales
```

---

# 5. Run Advance Payout

Processes advance payouts (10% of eligible sales).

**Method**

```
POST
```

**Endpoint**

```
/api/payouts/advance
```

### Request Body

No request body required.

### Success Response

```json
{
    "success": true,
    "processedSales": 2
}
```

---

# 6. Get Payout History

Returns all payout records.

**Method**

```
GET
```

**Endpoint**

```
/api/payouts
```

---

# 7. Run Final Reconciliation

Processes the remaining payout after advance payout.

**Method**

```
POST
```

**Endpoint**

```
/api/payouts/reconcile
```

### Request Body

No request body required.

### Success Response

```json
{
    "success": true,
    "processedSales": 2
}
```

---

# 8. Withdraw Earnings

Allows a user to withdraw from their available balance.

**Method**

```
POST
```

**Endpoint**

```
/api/withdrawals
```

### Request Body

```json
{
    "userId": "USER_ID",
    "amount": 100
}
```

### Success Response

```json
{
    "success": true,
    "message": "Withdrawal successful",
    "balance": 100
}
```

---

# API Testing Flow

Follow this sequence to test the application.

1. Create User
2. Get User Balance
3. Create Sale
4. Get Sales
5. Run Advance Payout
6. Get User Balance
7. Withdraw Earnings
8. Run Final Reconciliation
9. Get User Balance
10. Get All Payouts
11. Get All Sales



# Notes

- Advance payout is processed only once for each sale.
- Withdrawals cannot exceed the available balance.
- Final reconciliation is processed only once per sale.
- MongoDB Atlas is used as the database.