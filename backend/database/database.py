import sqlite3
import os

def init_db():
    db_path = os.path.join(os.path.dirname(__file__), 'db.sqlite3')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # 1. Create Academic Master Table
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

    # 2. Create Historical GPA Sequences Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cgpa_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_email TEXT,
            semester TEXT NOT NULL,
            gpa REAL NOT NULL,
            FOREIGN KEY(student_email) REFERENCES student_profile(email)
        )
    ''')

    # 3. Create Subject Assessment Table
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

    # Seeding Mock Student Data
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
        print("Database initialized and values seeded successfully!")
    except sqlite3.IntegrityError:
        print("Database structure verified. Records already exist.")
    
    conn.close()

if __name__ == '__main__':
    init_db()