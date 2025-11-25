export FLASK_APP=server.py
flask run

or without export, by adding to py file
if __name__ == "__main__":
    app.run(debug=True)