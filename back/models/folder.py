import enum

from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship

from back.models.base import Base


class FolderType(enum.Enum):
    Book = 1
    Documentation = 2
    Other = 3


class Folder(Base):
    __tablename__ = "folders"

    id = Column(Integer, primary_key=True)
    name = Column(String(64), nullable=False)
    type = Column(Enum(FolderType), nullable=False)
    image_url = Column(String(512), nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"))

    category = relationship("Category", back_populates="folders")
    notes = relationship("Note", back_populates="folder")
