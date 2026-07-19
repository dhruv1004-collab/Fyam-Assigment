# Low Level Design (LLD)

## Overview

The Affiliate Payout System manages affiliate earnings through sales, advance payouts, withdrawals, and final reconciliation.

---

# Architecture

```
Client
   │
Express Routes
   │
Controllers
   │
Business Logic
   │
Mongoose Models
   │
MongoDB Atlas
```

---

# Database Design

## User

```
username
withdrawableBalance
lastWithdrawalAt
```

---

## Sale

```
userId
brand
earning
status
advancePaid
advanceAmount
finalProcessed
```

---

## Payout

```
userId
saleId
type
amount
status
```

---

## Withdrawal

```
userId
amount
status
```

---

# API Flow

## Create User

```
Request

↓

Create User

↓

Return User
```

---

## Create Sale

```
Request

↓

Save Sale

↓

Return Sale
```

---

## Advance Payout

```
Pending Sales

↓

Calculate 10%

↓

Create Payout

↓

Update User Balance

↓

Mark Sale
```

---

## Withdrawal

```
User

↓

Check Balance

↓

Deduct Amount

↓

Create Withdrawal

↓

Return Response
```

---

## Final Reconciliation

```
Eligible Sales

↓

Calculate Remaining Amount

↓

Update Balance

↓

Create Final Payout

↓

Mark Sale Completed
```

---

# Folder Structure

```
src/

config/

controllers/

middlewares/

models/

routes/

services/

utils/
```

---

# Assumptions

- One advance payout per sale.
- Withdrawals cannot exceed available balance.
- Final reconciliation runs once per sale.
- MongoDB Atlas is used as the database.

---

# Future Scope

- JWT Authentication
- Scheduler (Cron Jobs)
- Notifications
- Admin Dashboard
- Unit Testing