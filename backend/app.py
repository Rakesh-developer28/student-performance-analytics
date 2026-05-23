from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
# Enable CORS globally across all routes with explicit configuration
CORS(app, resources={r"/api/*": {"origins": "*"}})

DB_PATH = os.path.join(os.path.dirname(__file__), 'db.sqlite3')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def auto_init_database():
    """ Automatically initializes the SQLite database if it does not exist """
    db_exists = os.path.exists(DB_PATH)
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create Tables
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS student_profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            attendance INTEGER NOT NULL,
            attendance_status TEXT NOT NULL,
            current_cgpa REAL NOT NULL,
            performance_status TEXT NOT NULL,
            pending_leaves INTEGER NOT NULL,
            date_string TEXT NOT NULL
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cgpa_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_email TEXT,
            semester TEXT NOT NULL,
            gpa REAL NOT NULL,
            FOREIGN KEY(student_email) REFERENCES student_profile(email)
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS subject_performance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_email TEXT,
            subject TEXT NOT NULL,
            marks TEXT NOT NULL,
            grade TEXT NOT NULL,
            FOREIGN KEY(student_email) REFERENCES student_profile(email)
        )
    ''')
    
    # Seed data if tables are empty
    if not db_exists or cursor.execute('SELECT COUNT(*) FROM student_profile').fetchone()[0] == 0:
        try:
            cursor.execute('''
                INSERT INTO student_profile (email, password, name, role, attendance, attendance_status, current_cgpa, performance_status, pending_leaves, date_string)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', ("arun.kumar@student.edu", "password123", "Arun Kumar", "Student", 92, "Excellent", 8.46, "Good Performance", 2, "May 22, 2026"))
            
            history_data = [
                ("arun.kumar@student.edu", "Semester 1", 6.72),
                ("arun.kumar@student.edu", "Semester 2", 7.14),
                ("arun.kumar@student.edu", "Semester 3", 7.65),
                ("arun.kumar@student.edu", "Semester 4", 8.12),
                ("arun.kumar@student.edu", "Semester 5", 8.46),
            ]
            cursor.executemany('INSERT INTO cgpa_history (student_email, semester, gpa) VALUES (?, ?, ?)', history_data)

            subjects_data = [
                ("arun.kumar@student.edu", "Data Structures", "87/100", "A"),
                ("arun.kumar@student.edu", "Database Management", "90/100", "A+"),
                ("arun.kumar@student.edu", "Operating Systems", "85/100", "A"),
                ("arun.kumar@student.edu", "Computer Networks", "78/100", "B+"),
                ("arun.kumar@student.edu", "Software Engineering", "82/100", "A")
            ]
            cursor.executemany('INSERT INTO subject_performance (student_email, subject, marks, grade) VALUES (?, ?, ?, ?)', subjects_data)
            conn.commit()
            print("Database auto-initialized and seeded successfully.")
        except Exception as e:
            print(f"Seeding notice: {e}")
            
    conn.close()

def execute_ml_prediction(history_records):
    if not history_records or len(history_records) < 2:
        return 8.00
    X = np.array([[i + 1] for i in range(len(history_records))])
    y = np.array([row['gpa'] for row in history_records])
    
    model = LinearRegression()
    model.fit(X, y)
    
    next_semester = len(history_records) + 1
    predicted_val = model.predict([[next_semester]])[0]
    return round(max(0.00, min(10.00, float(predicted_val))), 2)

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json or {}
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM student_profile WHERE email = ? AND password = ?', (email, password)).fetchone()
    conn.close()

    if user:
        return jsonify({"success": True, "email": user['email'], "name": user['name']})
    return jsonify({"success": False, "message": "Invalid password or email validation combo."}), 401

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_metrics():
    email = request.args.get('email', 'arun.kumar@student.edu')
    
    conn = get_db_connection()
    profile = conn.execute('SELECT * FROM student_profile WHERE email = ?', (email,)).fetchone()
    
    if not profile:
        conn.close()
        return jsonify({"error": "Profile matching parameters not located"}), 404
        
    history = conn.execute('SELECT semester, gpa FROM cgpa_history WHERE student_email = ?', (email,)).fetchall()
    subjects = conn.execute('SELECT subject, marks, grade FROM subject_performance WHERE student_email = ?', (email,)).fetchall()
    conn.close()

    history_list = [{"semester": row['semester'], "gpa": row['gpa']} for row in history]
    subject_list = [{"subject": row['subject'], "marks": row['marks'], "grade": row['grade']} for row in subjects]
    
    predicted_cgpa = execute_ml_prediction(history_list)

    return jsonify({
        "name": profile['name'],
        "role": profile['role'],
        "date": profile['date_string'],
        "attendance": profile['attendance'],
        "attendance_status": profile['attendance_status'],
        "current_cgpa": profile['current_cgpa'],
        "performance_status": profile['performance_status'],
        "pending_leaves": profile['pending_leaves'],
        "cgpa_history": history_list,
        "subject_performance": subject_list,
        "predicted_cgpa": predicted_cgpa,
        "prediction_status": "High Chance",
        "performance_overview": [
            {"name": "Excellent (8.0 - 10)", "value": 65, "color": "#22c55e"},
            {"name": "Good (6.5 - 7.99)", "value": 25, "color": "#3b82f6"},
            {"name": "Average (5.0 - 6.49)", "value": 8, "color": "#f97316"},
            {"name": "Poor (< 5.0)", "value": 2, "color": "#ef4444"}
        ],
        "attendance_trend": [
            {"month": "Jan", "percentage": 90},
            {"month": "Feb", "percentage": 92},
            {"month": "Mar", "percentage": 88},
            {"month": "Apr", "percentage": 93},
            {"month": "May", "percentage": 91}
        ]
    })

@app.route('/api/student/add_marks', methods=['POST'])
def add_student_marks():
    data = request.json or {}
    email = data.get('email')
    subject = data.get('subject')
    marks = data.get('marks')
    grade = data.get('grade')

    if not all([email, subject, marks, grade]):
        return jsonify({"success": False, "message": "Missing required form payload fields."}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO subject_performance (student_email, subject, marks, grade)
        VALUES (?, ?, ?, ?)
    ''', (email, subject, marks, grade))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Data written to relational tables safely."})


if __name__ == '__main__':
    auto_init_database()
    app.run(debug=True, host='127.0.0.1', port=5001)