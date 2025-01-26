# Health Check API

## Description
A lightweight Node.js application designed to monitor the health of a backend service instance. This application checks database connectivity and validates downstream API availability. It is implemented following cloud-native application requirements.

The `/healthz` endpoint allows monitoring and alerts for service health by:
- Inserting a record into the `HealthCheck` table.
- Verifying downstream API availability.
- Returning appropriate HTTP status codes based on the health check results.

## Features
- Supports only `GET` requests on `/healthz`.
- Returns `200 OK` if the service is healthy.
- Returns `503 Service Unavailable` if the health check fails.
- Ensures no request or response payload is cached.
- Rejects requests with payloads or unsupported HTTP methods.
- Implements Sequelize ORM for database interactions.
- Includes basic downstream API health monitoring.

## Technologies Used
- **Node.js**: Backend runtime.
- **Express.js**: Web framework for building the REST API.
- **Sequelize**: ORM for managing database interactions.
- **MySQL**: Relational database for storing health check records.
- **Axios**: For downstream API monitoring.

## Prerequisites
Before running the application, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MySQL](https://www.mysql.com/) (running locally or remotely)

