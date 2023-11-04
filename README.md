# Social Media - FE

Project Description: (Briefly describe your project)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Technologies Used

- [Next.js](https://nextjs.org/) - A React framework for building web applications.
- [dayjs](https://day.js.org/) - A minimalist JavaScript library for parsing, formatting, and manipulating dates.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for making requests.
- [Cookies](https://github.com/js-cookie/js-cookie) - A JavaScript API for working with cookies.
- [Socket.io](https://socket.io/) - A real-time, bidirectional communication library.
- [Edgestore](https://edgestore.app/) - A database for the decentralized web.

## Requirements

Before getting started, make sure you have the following installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/) >= 16.x.x
- npm (Node Package Manager): Comes with Node.js
- Git: [Download and Install Git](https://git-scm.com/downloads)

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository:**

```bash
   git clone git@github.com:GabrielFeBe/Social-media-fe.git
   #then
   cd Social-media-fe
```

2. **Install Dependencies:**

```bash
   npm install
```

## Usage

```bash
npm run dev
```

## Configuration

- **Port:** The default port is 3000, but you can change it if you want. You can find the port configuration in the next.config.js file.
- **Docker:** There's not a Dockerfile yet, nor a docker-compose.yml file. But it's in the roadmap.
- **Environment Variables:** There's a .env.example file with all the environment variables needed to run the project. You can create a .env file and copy the variables from the .env.example file and fill them with your own values.
- **Backend:** The backend is not hosted, so you'll need to run it locally. You can find the backend repository [here](https://github.com/GabrielFeBe/Social-media)

## Edgestore

- **Edgestore:** This project uses Edgestore as a database. You can find the documentation [here](https://docs.edgestore.app/). You can create a free account and use it for development purposes. You'll need to create a database and a collection. Then you'll need to create a .env file and add the following variables:
- The keys are the same as the ones in the .env.example file, but you'll need to add your own values.

## License

This project is licensed under no license =/.
