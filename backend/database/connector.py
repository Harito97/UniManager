import mysql.connector

host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

try:
    conn = mysql.connector.connect(
        host = host,
        user = user,
        password = "",
        database = database
    )
    
    # if conn.is_connected():
    #     print("Connected successfully")
    
    cursor = conn.cursor()
except Exception as e:
    print(f"Error: {e}")