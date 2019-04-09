from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from back.models.base import Base


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    name = Column(String(64), nullable=False)
    image_url = Column(String(512), nullable=True)

    folders = relationship("Folder", back_populates="category")
