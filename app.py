from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory, jsonify
from flask_mail import Mail, Message
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
app.secret_key = 'your_secret_key_here_change_in_production'  # Change this to a random secret in production

# Mail configuration (use your own email credentials or environment variables)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'your_email@gmail.com')  # Set in your environment
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', 'your_app_password')  # Set in your environment
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_USERNAME', 'your_email@gmail.com')

mail = Mail(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    """Serve static files (CSS, JS, images)"""
    return send_from_directory('static', filename)


@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest' or request.accept_mimetypes['application/json'] > 0
    if not name or not email or not message:
        if is_ajax:
            return jsonify(success=False, error='All fields are required!'), 400
        flash('All fields are required!', 'danger')
        return redirect(url_for('home') + '#contact')
    
    try:
        msg = Message(
            subject=f"Portfolio Contact from {name}",
            recipients=['tanzilmohiuddinm@gmail.com'],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        )
        mail.send(msg)
        if is_ajax:
            return jsonify(success=True)
        flash('Thank you for reaching out! I will get back to you soon.', 'success')
    except Exception as e:
        print(f"Email error: {e}")  # For debugging
        if is_ajax:
            return jsonify(success=False, error='Sorry, there was an error sending your message. Please try again later.'), 500
        flash('Sorry, there was an error sending your message. Please try again later.', 'danger')
    
    return redirect(url_for('home') + '#contact')

@app.route('/download-resume')
def download_resume():
    """Route to download resume"""
    try:
        return send_from_directory('static', 'Tanzil-new_CV(1)', as_attachment=True)
    except:
        flash('Resume not found', 'danger')
        return redirect(url_for('home'))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)