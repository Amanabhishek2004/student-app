import jwt
from django.conf import settings        
        
def user_details(request):
        auth_header = request.headers.get('Authorization')
        # Extract the token (remove the 'Bearer ' prefix)
        token = auth_header.split(' ')[1]
        user = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        
        return user