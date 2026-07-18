# Vehicle Rental System

A full-stack vehicle rental management system built with a modern web frontend and Vercel serverless API backend.

## Features

- **Fleet Management** — 10 vehicles (Cars, Bikes, Trucks) with real-time availability tracking
- **Smart Pricing** — Car: 10% discount on 7+ day rentals | Bike: flat rate | Truck: +load fee
- **Rent & Return** — Customer details, payment method, receipt generation
- **Print Receipt** — Browser-printable rental receipts
- **Search & Filter** — Find vehicles by plate, model, or type
- **Add Vehicles** — Expand your fleet from the dashboard
- **Rental History** — Track all past and active rentals with revenue stats
- **Cloud + Local** — Works online (Vercel API) and offline (localStorage fallback)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js (Vercel Serverless Functions) |
| Storage | In-memory API + localStorage fallback |

## Project Structure

```
├── index.html          # Single-page application (UI + logic)
├── api/
│   └── server.js       # Vercel serverless API
└── vercel.json         # Vercel routing configuration
```

## Deploy on Vercel

1. Fork or clone this repository
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**
3. Import this repository
4. Framework: **Other** → Deploy

## OOP Concepts (from original C++ design)

- **Abstraction** — Vehicle base class with pure virtual functions
- **Inheritance** — Car, Bike, Truck extend Vehicle
- **Polymorphism** — Each vehicle type has its own pricing logic
- **Encapsulation** — Private state with controlled access
