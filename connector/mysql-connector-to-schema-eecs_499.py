import mysql.connector
import json

try:
	cnx = mysql.connector.connect(
		user='root',
		password='root',
		host='localhost',
		database='eecs_499'
		)
except mysql.connector.Error as err:
	if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
		print("Something is wrong with your user name or password")
	elif err.errno == errorcode.ER_BAD_DB_ERROR:
		print("Database does not exist")
	else:
		print(err)
else:
	print("Good connection")
	cursor = cnx.cursor()
	cursor.execute('Select * From GRE_Query Where Gre_verbal > 160 and Gre_quan > 100')
	result = []
	for i in cursor.fetchall():
		result += i
	onFormat = json.dumps(result)
	print onFormat
	cursor.close()
	cnx.close()
	return "onFormat"