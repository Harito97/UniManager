import mysql.connector

host = "localhost"
user = "root"
database = "csdl_web"

try:
    conn = mysql.connector.connect(
        host = host,
        user = user,
        password = "ikari1001",
        database = database
    )
    
    # if conn.is_connected():
    #     print("Connected successfully")
    
    cursor = conn.cursor()
except Exception as e:
    print(f"Error: {e}")