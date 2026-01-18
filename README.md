# CronJob — URL Monitoring & Scheduler

CronJob is a web-based cron-job scheduler that periodically sends **requests** to user-defined URLs to keep services alive, monitor uptime, and track response performance. Built with **Next.js** and **Appwrite**.

> [!NOTE]
> Project is in development

## 🚀 Features

- 🔁 Schedule periodic **HTTP GET, POST, PUT, DELETE requests**
- 👤 Multi-user support (each user has their own jobs and logs)
- ⏰ Flexible cron expressions (every X minutes / hours)
- 📡 URL uptime & response monitoring
- 📊 Job execution logs (status, response time)
- ▶️ Manual test run for jobs
- 🔐 Secure authentication (OAuth & Credentials)
- ☁️ Serverless scheduler (Appwrite Functions)

## 🏗️ Tech Stack

### Frontend

- Next.js (App Router)
- Tailwind CSS + CSS Modules
- React Hooks
- React ContextAPI

### Backend

- **Appwrite (BaaS)**
  - Authentication
  - Database
  - Functions (Scheduler)

- Node.js (Appwrite Functions runtime)

<!--
## 🛠️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Vishnu19091/cron-job.git && cd cron-job
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Appwrite

- Create a project in Appwrite
- Setup:
  - Auth (Email / OAuth)
  - Database & collections
  - Scheduled function (every 1 min / 5 min)

### 4️⃣ Run locally

```bash
npm run dev
```

## ⚙️ Environment Variables For Application

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=<YOUR_API_KEY>
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID>
APPWRITE_API_KEY=<ENDPOINT>
APPWRITE_DATABASE_ID=<DB_ID>
APPWRITE_JOBS_COLLECTION_ID=<YOUR_CUSTOM_ID>
APPWRITE_LOGS_COLLECTION_ID=<YOUR_CUSTOM_ID>
```

## ⚙️ Environment Variables For Appwrite Function

```env
APPWRITE_API_KEY=<YOUR_API_KEY>
APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID>
APPWRITE_ENDPOINT=<ENDPOINT>
DATABASE_ID=<DB_ID>
JOBS_COLLECTION_ID=<APPWRITE_JOBS_COLLECTION_ID>
LOGS_COLLECTION_ID=<APPWRITE_LOGS_COLLECTION_ID>

# Function Endpoints/API_PATHS
INSERT_LOG=/PATH
UPDATE_META_DATA=/PATH
REQUEST_URL=/PATH
```

## 📌 Limitations (Current)

- No alerting (email) yet (FUTURE ENHANCEMENT)
- No retries on failure

## Contributing

Contributions are welcome!

To contribute do the following:

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a PR -->
