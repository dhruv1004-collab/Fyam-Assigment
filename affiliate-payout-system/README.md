#Affiliate payout system

Node.js + Express + MongoDB backend system that manages affiliate sales, advance payouts, withdrawals, and final payout reconciliation.

## Features

- Create Affiliate users
- Record affiliate sales
- process 10% advance payouts
- Track withdrawable balance
- Withdraw earning
- Reconcile final payouts
- Store payout history

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Nodemon

---

## Project Structure

```
affiliate-payout-system/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## Installation

```bash
git clone <repository-url>

cd affiliate-payout-system

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

## API Endpoints

### User

| Method | Endpoint |
|---------|----------|
| POST | /api/users |
| GET | /api/users/:id/balance |

### Sales

| Method | Endpoint |
|---------|----------|
| POST | /api/sales |
| GET | /api/sales |

### Payout

| Method | Endpoint |
|---------|----------|
| POST | /api/payouts/advance |
| POST | /api/payouts/reconcile |
| GET | /api/payouts |

### Withdrawal

| Method | Endpoint |
|---------|----------|
| POST | /api/withdrawals |

---

## Business Rules

### Advance Payout

- Only pending sales are eligible.
- Advance payout is 10% of sale earnings.
- Advance can only be processed once.

### Withdrawal

- Users can withdraw only available balance.
- Withdrawal reduces withdrawable balance.

### Reconciliation

- Remaining payout is calculated after deducting advance payout.
- Sale is marked as final processed.

---

## Database Collections

- Users
- Sales
- Payouts
- Withdrawals

---

## Future Improvements

- Authentication & Authorization
- Scheduled payout jobs
- Admin Dashboard
- Unit Testing
- Docker Support

---

## Author

Dhruv Kumar