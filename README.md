# Retail Billing System with GST

A comprehensive retail billing solution with GST compliance, built with React Native (Expo) for the frontend and Spring Boot for the backend.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Setup & Installation](#-setup--installation)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Running the Application](#-running-the-application)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features
- User authentication and authorization
- Product catalog management
- GST-compliant billing
- Invoice generation
- Sales reporting and analytics
- Responsive design for various devices

## 🛠 Tech Stack

### Frontend (BillingApp)
- React Native with Expo
- TypeScript
- React Navigation
- Redux for state management
- UI Components: React Native Paper

### Backend (RetailBillingSystem)
- Java 17
- Spring Boot 3.x
- Spring Security with JWT
- Spring Data JPA
- Hibernate
- H2 Database (Development)
- MySQL (Production)
- Maven

## 📋 Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Java 17 JDK
- Maven
- MySQL (for production)
- Expo CLI (for mobile development)
- Android Studio / Xcode (for mobile development)

## 🚀 Setup & Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd ThynktechRB/RetailBillingSystem
   ```

2. Configure the database in `application.properties`

3. Build and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../BillingApp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

## 📁 Project Structure

### Backend
```
RetailBillingSystem/
├── src/
│   ├── main/java/com/example/gstapp/
│   │   ├── config/         # Configuration classes
│   │   ├── controller/     # REST controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── exception/      # Exception handling
│   │   ├── model/          # Entity classes
│   │   ├── repository/     # Data access layer
│   │   ├── service/        # Business logic
│   │   └── util/           # Utility classes
│   └── resources/          # Application properties and static resources
```

### Frontend
```
BillingApp/
├── app/                   # Main app navigation and screens
├── components/            # Reusable UI components
├── constants/             # App constants
├── hooks/                 # Custom React hooks
├── services/              # API services
└── utils/                 # Utility functions
```

## 📚 API Documentation
API documentation is available at `/swagger-ui.html` when the backend is running locally.

## 🏃 Running the Application

### Backend
```bash
cd RetailBillingSystem
mvn spring-boot:run
```
The application will be available at `http://localhost:8080`

### Frontend
```bash
cd BillingApp
expo start
```
Scan the QR code with the Expo Go app or run on an emulator.

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
