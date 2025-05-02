# Calendar Application

A responsive calendar application built with React, Redux, and Tailwind CSS that allows users to manage events and tasks.

## Features

- 📅 Interactive calendar view
- ✨ Event management
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- 🔄 State management with Redux

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   - The application will be available at `http://localhost:5173` (or another port if 5173 is in use)
   - Open your browser and navigate to the URL shown in your terminal

## Project Structure

```
src/
├── components/     # React components
├── store/         # Redux store configuration
├── helper/        # Utility functions
├── data/          # Static data
└── assets/        # Images and other static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Technologies Used

- React
- Redux Toolkit
- Tailwind CSS
- date-fns
- Vite

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.

Calendar:-
      1.User can add event but user can note add event on past date
      2.User can see the event and also delete event 


NOTE:-
    Sidebar in site is static there is no live links its for good look same for navbar only main is calender.
