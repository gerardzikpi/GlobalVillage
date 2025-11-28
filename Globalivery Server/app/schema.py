from flask_marshmallow import Marshmallow 
#from flask_marshmallow.sqla import SQLAlchemyAutoSchema
from .models import Product,Order,Category,User

marshmallow = Marshmallow()

class ProductSchema(marshmallow.SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        load_instance = True