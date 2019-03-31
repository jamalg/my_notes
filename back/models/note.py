from sqlalchemy import Column, String, ForeignKey, Integer, ARRAY, Text
from sqlalchemy.orm import relationship

from back.models.base import Base


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True)
    title = Column(String(128), nullable=False)
    tags = Column(ARRAY(String), nullable=True)
    body = Column(Text, nullable=True)
    folder_id = Column(Integer, ForeignKey("folders.id"), nullable=False)

    folder = relationship("Folder", back_populates="notes")
