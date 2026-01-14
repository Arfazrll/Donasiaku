
<div align="center">

  # DONASIAKU 🤝
  
  **Bridging Kindness, Connecting Needs.**
  <br>
  A modern web platform connecting donors with beneficiaries to facilitate transparent and efficient goods donation.

  ![Laravel](https://img.shields.io/badge/Backend-Laravel_11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
  ![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
  ![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

  <br>
  
  [View Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>



<br>

## 📖 Table of Contents
1. [About The Project](#-about-the-project)
2. [Tech Stack](#-tech-stack)
3. [Key Features](#-key-features)
4. [Getting Started](#-getting-started)
5. [API Reference](#-api-reference)
6. [Roadmap](#-roadmap)
7. [License](#-license)


## 💡 About The Project

**Donasiaku** is designed to solve the problem of unused goods piling up while many people are in need. We provide a seamless platform where:
* **Donors** can easily list items they wish to give away.
* **Beneficiaries** can browse available items and request them directly.
* Both parties can communicate securely via an integrated chat system to arrange delivery.

Built with a Monorepo architecture, combining the robustness of **Laravel** (API) and the interactivity of **React** (UI).



## 🛠 Tech Stack

### Backend (Server)
* **Framework:** Laravel 11
* **Language:** PHP 8.2+
* **Auth:** Laravel Sanctum (Token based)
* **Database:** MySQL

### Frontend (Client)
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS + PostCSS
* **State Management:** React Hooks
* **HTTP Client:** Axios
* **Routing:** React Router DOM



## 🚀 Key Features

### 🐯 For Donors
- [x] **Manage Donations:** Create, update, and delete donation listings easily.
- [x] **Request Approval:** Review incoming requests from beneficiaries.
- [x] **Live Chat:** Chat directly with potential recipients to discuss logistics.

### 🙋‍♂️ For Beneficiaries (Penerima)
- [x] **Browse Catalog:** Filter available donations by category or recency.
- [x] **Request Items:** One-click request mechanism.
- [x] **Request History:** Track the status of your applications (Pending/Approved/Rejected).

### 🔐 Security & Core
- [x] **Secure Authentication:** Registration and Login flows for different roles.
- [x] **Real-time Validation:** Form inputs are validated on both client and server.
- [x] **Responsive Design:** Optimized for Desktop, Tablet, and Mobile.



## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v18+)
* Composer
* PHP (v8.2+)
* MySQL Server

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/donasiaku.git](https://github.com/your-username/donasiaku.git)
cd donasiaku

```

### 2. Backend Setup (Laravel)

```bash
cd backend

# Install PHP dependencies
composer install

# Setup Environment
cp .env.example .env
# NOTE: Open .env and configure your DB_DATABASE, DB_USERNAME, DB_PASSWORD

# Generate Key & Migrate
php artisan key:generate
php artisan migrate

# Start Server
php artisan serve

```

### 3. Frontend Setup (React)

Open a new terminal terminal window:

```bash
cd frontend

# Install JS dependencies
npm install

# Start Client
npm run dev

```

> The App should now be running at `http://localhost:5173` and the API at `http://localhost:8000`.



## 🔌 API Reference

Here are the main endpoints available in the backend:

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/register` | Register new user | ❌ |
| `POST` | `/api/login` | Login user & get token | ❌ |
| `GET` | `/api/donations` | Get all available donations | ✅ |
| `POST` | `/api/donations` | Create a new donation | ✅ |
| `GET` | `/api/donations/{id}` | Get donation details | ✅ |
| `POST` | `/api/chat/send` | Send a message | ✅ |
| `GET` | `/api/user` | Get current user profile | ✅ |


## 🗺 Roadmap

We have exciting plans for the future of **Donasiaku**:

* [ ] **Notification System:** Email and Push notifications for new requests.
* [ ] **Map Integration:** View donation locations on Google Maps.
* [ ] **Rating System:** Allow users to rate their experience.
* [ ] **Delivery Integration:** Partner with logistics APIs (e.g., GoSend/GrabExpress).
* [ ] **Dark Mode:** Enhanced UI theming.



## 📂 Project Structure

```bash
donasiaku/
├── backend/            # Laravel API
│   ├── app/
│   ├── database/
│   └── routes/api.php  # API Routes defined here
├── frontend/           # React Application
│   ├── src/
│   │   ├── features/   # Feature-based folder structure (Auth, Donatur, Penerima)
│   │   ├── components/ # Shared UI components (Button, Card, Inputs)
│   │   └── services/   # API Service logic (Axios setup)
└── README.md

```


## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
