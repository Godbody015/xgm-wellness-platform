# XGM WELLNESS DATABASE SCHEMA

## PRODUCTS

| Field | Type |
|--------|------|
| id | UUID |
| name | Text |
| category | Text |
| description | Text |
| ingredients | Text |
| directions | Text |
| price | Decimal |
| image | Text |
| stock | Integer |
| created_at | Timestamp |

---

## CATEGORIES

| Field | Type |
|--------|------|
| id | UUID |
| name | Text |
| description | Text |

---

## CUSTOMERS

| Field | Type |
|--------|------|
| id | UUID |
| full_name | Text |
| email | Text |
| phone | Text |
| address | Text |
| created_at | Timestamp |

---

## RESELLERS

| Field | Type |
|--------|------|
| id | UUID |
| business_name | Text |
| owner_name | Text |
| email | Text |
| phone | Text |
| status | Text |
| created_at | Timestamp |

---

## ORDERS

| Field | Type |
|--------|------|
| id | UUID |
| customer_id | UUID |
| total | Decimal |
| status | Text |
| payment_method | Text |
| created_at | Timestamp |

---

## ORDER ITEMS

| Field | Type |
|--------|------|
| id | UUID |
| order_id | UUID |
| product_id | UUID |
| quantity | Integer |
| price | Decimal |

---

## ADMIN USERS

| Field | Type |
|--------|------|
| id | UUID |
| name | Text |
| email | Text |
| role | Text |
| created_at | Timestamp |
