from chalice import Chalice
import json
import pg8000.native

app = Chalice(app_name='category')

@app.route('/', cors=True)
def index():
    data = {'name': 'groceries','id': 1},{'name': 'utilities','id': 2},{'name': 'mortgage','id': 3 }
    return json.dumps(data)

@app.route('/', cors=True, methods=['POST'],content_types=['application/json'])
def insert_data():
    host = 'database-1.cfaaq6emepmc.us-east-2.rds.amazonaws.com'
    user = '****'
    password = '*****'
    port = 5432
    database = 'postgres'

    user_as_json = app.current_request.raw_body


    # Connect to the RDS database
    connection = pg8000.native.Connection(user=user,
                                  password=password,
                                  host=host,
                                  port=port,
                                  database=database)

    try:
            print(user_as_json)
            data = json.loads(user_as_json)
            print(data)
            # Iterate over the data in user_as_json and insert each record
            for record in data['category']:
                name = record['name']
                id = record['id']
                print(name)
                print(id)
                connection.run("INSERT INTO category(id, name) VALUES (:id, :name)", id=id, name=name)

            #connection.close()
            return {'user': data}
    except Exception as e:
        print(e)
       # connection.rollback()
        raise
    finally:
        # Close the database connection
        connection.close()


#@app.route('/', cors=True, methods=['POST'])
#def index():
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
##
#
#     
#     return {'user': user_as_json}


# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @app.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#
