from flask_marshmallow import Marshmallow 
from .models import Product,Order,Category,User

marshmallow = Marshmallow()

class ProductSchema(marshmallow.SQLAlchemyAutoSchema):
    model = Product