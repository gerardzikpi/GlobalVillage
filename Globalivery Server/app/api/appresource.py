from flask_restful import Resource,reqparse
from ..models import User, Product, Order, Category
from flask import request, abort
from ..models import db
from sqlalchemy.exc import SQLAlchemyError


def _serialize(obj):
    # Prefer an explicit to_dict method on models, otherwise use SQLAlchemy table metadata
    if hasattr(obj, "to_dict"):
        return obj.to_dict()
    if hasattr(obj, "__table__"):
        return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}
    # Fallback for simple objects
    return obj.__dict__

class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get(user_id)
            if not user:
                abort(404, description="User not found")
            return _serialize(user), 200
        users = User.query.all()
        return [_serialize(u) for u in users], 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True, help="username is required")
        parser.add_argument("email", required=True, help="email is required")
        parser.add_argument("password", required=True, help="password is required")
        args = parser.parse_args()
        user = User(username=args["username"], email=args["email"])
        # If your model expects hashed password, handle hashing in the model or here
        if hasattr(user, "set_password"):
            user.set_password(args["password"])
        else:
            user.password = args["password"]
        try:
            db.session.add(user)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return _serialize(user), 201

    def put(self, user_id):
        user = User.query.get(user_id)
        if not user:
            abort(404, description="User not found")
        data = request.get_json(force=True, silent=True) or {}
        for key in ("username", "email"):
            if key in data:
                setattr(user, key, data[key])
        if "password" in data:
            if hasattr(user, "set_password"):
                user.set_password(data["password"])
            else:
                user.password = data["password"]
        try:
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return _serialize(user), 200

    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            abort(404, description="User not found")
        try:
            db.session.delete(user)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return {}, 204


class ProductResource(Resource):
    def get(self, product_id=None):
        if product_id:
            product = Product.query.get(product_id)
            if not product:
                abort(404, description="Product not found")
            return _serialize(product), 200
        products = Product.query.all()
        return [_serialize(p) for p in products], 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", required=True)
        parser.add_argument("price", type=float, required=True)
        parser.add_argument("category_id", type=int, required=False)
        args = parser.parse_args()
        product = Product(name=args["name"], price=args["price"], category_id=args.get("category_id"))
        try:
            db.session.add(product)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return _serialize(product), 201

    def put(self, product_id):
        product = Product.query.get(product_id)
        if not product:
            abort(404, description="Product not found")
        data = request.get_json(force=True, silent=True) or {}
        for key in ("name", "price", "category_id"):
            if key in data:
                setattr(product, key, data[key])
        try:
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return _serialize(product), 200

    def delete(self, product_id):
        product = Product.query.get(product_id)
        if not product:
            abort(404, description="Product not found")
        try:
            db.session.delete(product)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return {}, 204


class CategoryResource(Resource):
    def get(self, category_id=None):
        if category_id:
            category = Category.query.get(category_id)
            if not category:
                abort(404, description="Category not found")
            return _serialize(category), 200
        categories = Category.query.all()
        return [_serialize(c) for c in categories], 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", required=True)
        args = parser.parse_args()
        category = Category(name=args["name"])
        try:
            db.session.add(category)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return _serialize(category), 201

    def put(self, category_id):
        category = Category.query.get(category_id)
        if not category:
            abort(404, description="Category not found")
        data = request.get_json(force=True, silent=True) or {}
        if "name" in data:
            category.name = data["name"]
        try:
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return _serialize(category), 200

    def delete(self, category_id):
        category = Category.query.get(category_id)
        if not category:
            abort(404, description="Category not found")
        try:
            db.session.delete(category)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return {}, 204


class OrderResource(Resource):
    def get(self, order_id=None):
        if order_id:
            order = Order.query.get(order_id)
            if not order:
                abort(404, description="Order not found")
            return _serialize(order), 200
        orders = Order.query.all()
        return [_serialize(o) for o in orders], 200

    def post(self):
        # Expecting JSON like: {"user_id": 1, "product_ids": [1,2], "notes": "..."}
        data = request.get_json(force=True, silent=True) or {}
        user_id = data.get("user_id")
        product_ids = data.get("product_ids", [])
        if not user_id or not isinstance(product_ids, list):
            abort(400, description="user_id and product_ids are required")
        order = Order(user_id=user_id)
        # If Order model has a relationship to products, attach them appropriately.
        try:
            db.session.add(order)
            db.session.flush()  # ensure order.id if needed for association tables
            if hasattr(order, "products") and product_ids:
                products = Product.query.filter(Product.id.in_(product_ids)).all()
                order.products.extend(products)
            elif hasattr(order, "product_ids"):
                order.product_ids = product_ids
            # optional notes
            if "notes" in data and hasattr(order, "notes"):
                order.notes = data["notes"]
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return _serialize(order), 201

    def put(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            abort(404, description="Order not found")
        data = request.get_json(force=True, silent=True) or {}
        if "product_ids" in data:
            product_ids = data["product_ids"]
            if not isinstance(product_ids, list):
                abort(400, description="product_ids must be a list")
            if hasattr(order, "products"):
                order.products = Product.query.filter(Product.id.in_(product_ids)).all()
            elif hasattr(order, "product_ids"):
                order.product_ids = product_ids
        if "notes" in data and hasattr(order, "notes"):
            order.notes = data["notes"]
        try:
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return _serialize(order), 200

    def delete(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            abort(404, description="Order not found")
        try:
            db.session.delete(order)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            abort(400, description=str(e))
        return {}, 204
