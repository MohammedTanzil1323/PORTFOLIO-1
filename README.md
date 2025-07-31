# Tanzil's Portfolio Website

A modern, responsive portfolio website built with Flask, featuring interactive elements, animations, and a professional design.

## Features

- Responsive design with modern UI/UX
- Dark/Light mode toggle
- Interactive project gallery with filters
- AJAX-powered contact form
- Live GitHub integration
- Skills visualization with radar charts
- Typewriter effect animations
- Custom cursor and glassmorphism effects

## Local Development

1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Set environment variables for email functionality (optional)
6. Run the application: `python app.py`
7. Open http://localhost:5000 in your browser

## Deployment

This project is configured for deployment on Render.com (free tier).

### Environment Variables (Optional)

For email functionality, set these environment variables:
- `MAIL_USERNAME`: Your Gmail address
- `MAIL_PASSWORD`: Your Gmail app password

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with animations and responsive design
- **Charts**: Chart.js for skills visualization
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## License

This project is open source and available under the MIT License. 