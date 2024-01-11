import mysql.connector

class ConnectDatabase:
    def __init__(self, host:str='localhost', user:str='root', database:str='uni_manager'):
        self.db_status = False
        SECURITY_ALGORITHM, SECRET_KEY = "HS256", "super-secret-key"
        try:
            self.conn = mysql.connector.connect(host=host, user=user, database=database)
            self.cursor = self.conn.cursor(dictionary=True)
            self.db_status = True
        except Exception as e:
            print("Error: ", e)
    
    def some_other_utils():
        pass 

