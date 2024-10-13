import requests


headers = {
 "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NzgwMTIyLCJpYXQiOjE3MjQ3Nzk4MjIsImp0aSI6ImIyNGQ0YzgwYjVlMjRiZmViYzkwMjQ0MWE0ODBiZDUxIiwidXNlcl9pZCI6NCwiVVNFUk5BTUUiOiJhbWFuIiwiU1RBRkZfU1RBVFVTIjpmYWxzZSwiSUQiOjR9.Lh2HSYo97iN5nurvnLewCu1SxxPk8J2KtDD670xEimk"
}
response = requests.get("http://127.0.0.1:8000/api/students/" , headers=headers)
print(response.json())