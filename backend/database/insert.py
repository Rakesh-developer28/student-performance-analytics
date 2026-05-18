import sqlite3

connection = sqlite3.connect('db.sqlite3')

cursor = connection.cursor()

cursor.execute("""
INSERT INTO students
(name, email, password, department, semester, cgpa, attendance)

VALUES (?, ?, ?, ?, ?, ?, ?)
""", (
    'Kevin',
    'kevin@gmail.com',
    '123456',
    'Data Science',
    5,
    8.5,
    92
))

connection.commit()
connection.close()

print("Student inserted successfully!")