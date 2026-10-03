from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class OtherMaster(Base):
    __tablename__ = "other_master"

    other_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    other_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )