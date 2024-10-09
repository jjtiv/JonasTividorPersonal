from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = '6d1e4f1c5e2a49c8a8b6a2c1e8d1f23a'  # Change this to a random secret key
users = {}

@app.route('/')
def home():
    return render_template('signup_login.html')

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['username']
    password = request.form['password']
    
    if username in users:
        flash('Username already exists!')
        return redirect(url_for('home'))
    
    users[username] = generate_password_hash(password)
    flash('Signup successful! You can now log in.')
    return redirect(url_for('home'))

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    if username not in users or not check_password_hash(users[username], password):
        flash('Invalid username or password!')
        return redirect(url_for('home'))

    session['username'] = username
    flash('Login successful!')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)